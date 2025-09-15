import { fetchSongData, mapSongNameToUrl, formatSongName, API_BASE_URL } from '$lib/utils/api.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	try {
		// Get song name from URL parameter
		const songName = params.name;
		
		// Map song name to Detective Conan World URL
		const songUrl = mapSongNameToUrl(songName);
		
		// Fetch data from Backend API
		const apiData = await fetchSongData(songUrl);
		
		// Helper function to fix image URLs from API
		const fixImageUrl = (url) => {
			if (!url) return null;
			if (url.startsWith('http')) return url;
			// Add https protocol if missing
			return `https://${url}`;
		};

		// Transform API data to match our component structure
		const songData = {
			title: apiData.metadata?.romanji_title || apiData.metadata?.original_title || 'Unknown Title',
			description: apiData.description?.description || 'No description available',
			// Use actual album cover from API, with fallback
			albumCover: fixImageUrl(apiData.metadata?.meta_image?.image_url) || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center",
			artist: apiData.metadata?.artist || 'Unknown Artist',
			cast: (apiData.description?.cast || []).map((member, index) => {
				// Use high-quality fallback images for cast members with variety
				const fallbackImages = [
					"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
					"https://images.unsplash.com/photo-1494790108755-2616b5c5c5be?w=200&h=200&fit=crop&crop=face&auto=format&q=80", 
					"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
					"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
					"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
					"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
					"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face&auto=format&q=80"
				];
				
				return {
					name: member.caption || `Cast Member ${index + 1}`,
					character: member.caption || `Character ${index + 1}`, // API doesn't have separate character field
					// Use actual cast images from API, with fallback
					image: fixImageUrl(member.image_url) || fallbackImages[index] || fallbackImages[0]
				};
			}),
			openingSpeech: {
				japanese: {
					title: "Japanese Version",
					content: apiData.description?.speech?.Japanese || "No Japanese speech available"
				},
				english: {
					title: "English Version", 
					content: apiData.description?.speech?.English || "No English speech available"
				}
			},
			lyrics: apiData.description?.lyrics?.Japanese || "No Japanese lyrics available",
			lyricsRomanji: apiData.description?.lyrics?.Romaji || "No Romanji lyrics available",
			// Handle both old format (single array) and new format (multiple CDs)
			trackList: (() => {
				const cdInfo = apiData.description?.cd_info;
				if (!cdInfo) return [];
				
				// Check for old format first (CD track listing array)
				if (cdInfo['CD track listing'] && Array.isArray(cdInfo['CD track listing'])) {
					return cdInfo['CD track listing'].map(track => ({
						number: parseInt(track.number) || 0,
						titleJapanese: track.japanese_title || 'Unknown',
						titleRomanji: track.romanji_title || 'Unknown',
						translation: track.translated_title || 'Unknown',
						length: track.length || '0:00'
					}));
				}
				
				// New format: multiple CDs - merge all tracks into one list with CD labels
				const allTracks = [];
				Object.entries(cdInfo).forEach(([cdName, tracks]) => {
					if (Array.isArray(tracks)) {
						tracks.forEach(track => {
							allTracks.push({
								cdName: cdName,
								number: parseInt(track.number) || 0,
								titleJapanese: track.japanese_title || 'Unknown',
								titleRomanji: track.romanji_title || 'Unknown',
								translation: track.translated_title || 'Unknown',
								length: track.length || '0:00'
							});
						});
					}
				});
				return allTracks;
			})(),
			// New field for multiple CDs structure
			cdCollection: (() => {
				const cdInfo = apiData.description?.cd_info;
				if (!cdInfo) return null;
				
				// Only return this for new format (multiple CDs)
				const cdEntries = Object.entries(cdInfo).filter(([key, value]) => 
					key !== 'CD track listing' && Array.isArray(value)
				);
				
				if (cdEntries.length > 0) {
					return cdEntries.map(([cdName, tracks]) => ({
						name: cdName,
						tracks: tracks.map(track => ({
							number: parseInt(track.number) || 0,
							titleJapanese: track.japanese_title || 'Unknown',
							titleRomanji: track.romanji_title || 'Unknown',
							translation: track.translated_title || 'Unknown',
							length: track.length || '0:00'
						}))
					}));
				}
				
				return null;
			})()
		};

		return {
			songData,
			apiBaseUrl: API_BASE_URL,
			songName,
			songUrl
		};

	} catch (err) {
		
		// Fallback to mock data if API fails
		try {
			const { mockSongData } = await import('$lib/data/songData.js');
			return {
				songData: mockSongData,
				apiBaseUrl: API_BASE_URL,
				apiError: err.message,
				songName: params.name
			};
		} catch (mockError) {
			throw error(500, {
				message: 'Failed to load song data',
				details: err.message
			});
		}
	}
}