import { fetchCharacterData, mapCharacterNameToUrl, formatCharacterName, API_BASE_URL } from '$lib/utils/api.js';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	try {
		// Get character name from URL parameter
		const characterName = params.name;
		
		// Map character name to Detective Conan World URL
		const characterUrl = mapCharacterNameToUrl(characterName);
		
		// Fetch data from Backend API
		const apiData = await fetchCharacterData(characterUrl);
		
		// Helper function to fix image URLs from API
		const fixImageUrl = (url) => {
			if (!url) return null;
			if (url.startsWith('http')) return url;
			// Add https protocol if missing
			return `https://${url}`;
		};

		// Transform API data to match our component structure
		const characterData = {
			// Basic info
			name: apiData.profile?.name_eng || 'Unknown Character',
			nameJapanese: apiData.profile?.name_jpn || '',
			englishNames: apiData.profile?.names_eng_localised || [],
			profileImage: fixImageUrl(apiData.profile?.profile_picture_url) || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face&auto=format&q=80",
			
			// Profile details - use real API data
			profile: {
				nameJapanese: apiData.profile?.name_jpn || '',
				englishNames: apiData.profile?.names_eng_localised || [],
				ages: apiData.profile?.ages || [],
				gender: apiData.profile?.gender || 'Unknown',
				heights: apiData.profile?.heights || [],
				weights: apiData.profile?.weights || [],
				birthday: apiData.profile?.birthday || 'Unknown',
				occupations: apiData.profile?.occupations || [],
				statuses: apiData.profile?.statuses || [],
			},
			
			// Voice actors and actors
			actors: {
				voicesJapanese: apiData.profile?.actors?.voices_jpn || [],
				voicesEnglish: apiData.profile?.actors?.voices_eng || [],
				dramaActors: apiData.profile?.actors?.drama_actors || []
			},
			
			// Content sections - preserve sub-section keys from the API so the UI can render them dynamically
			summary: apiData.summary || [],
			background: apiData.background || {},
			appearance: apiData.appearance || {},
			personality: apiData.personality || {},
			
			// Skills - pass through raw skills object so we can iterate its keys in the UI
			skills: apiData.skills || {},
			
			// Gallery images
			galleryImages: (apiData.image_urls || []).map(url => fixImageUrl(url)).filter(Boolean)
		};

		return {
			characterData,
			apiBaseUrl: API_BASE_URL,
			characterName,
			characterUrl
		};

	} catch (err) {
		
		// Return error info for user feedback
		throw error(500, {
			message: 'Failed to load character data',
			details: err.message
		});
	}
}