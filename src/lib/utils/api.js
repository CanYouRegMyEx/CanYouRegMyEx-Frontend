import { PUBLIC_API_BASE_URL, PUBLIC_DEFAULT_SONG_URL } from '$env/static/public';

// Get API base URL from environment
export const API_BASE_URL = PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
export const DEFAULT_SONG_URL = PUBLIC_DEFAULT_SONG_URL;

/**
 * Create full API URL with query parameters
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @returns {string} - Full URL with parameters
 */
export function createApiUrl(endpoint, params = {}) {
	const url = new URL(`${API_BASE_URL}${endpoint}`);
	
	// Add query parameters
	Object.entries(params).forEach(([key, value]) => {
		if (value !== null && value !== undefined) {
			url.searchParams.append(key, value);
		}
	});
	
	return url.toString();
}

/**
 * Fetch data from Backend API
 * @param {string} endpoint - API endpoint
 * @param {Object} params - Query parameters
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - API response data
 */
export async function fetchFromApi(endpoint, params = {}, options = {}) {
	const url = createApiUrl(endpoint, params);
	
	try {
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				...options.headers
			},
			...options
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`HTTP ${response.status}: ${errorText}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`API request failed for ${endpoint}:`, error);
		throw error;
	}
}

/**
 * Get song data from Backend BGM API
 * @param {string} songUrl - URL to crawl (optional, uses default if not provided)
 * @returns {Promise<Object>} - Song data from Backend
 */
export async function fetchSongData(songUrl = null) {
	const url = songUrl || DEFAULT_SONG_URL;
	return fetchFromApi('/bgm', { url });
}

/**
 * Map song name from URL to Detective Conan World URL
 * @param {string} songName - Name of the song from URL parameter
 * @returns {string} - Detective Conan World URL for the song
 */
export function mapSongNameToUrl(songName) {
	// URL decode the song name
	const decodedName = decodeURIComponent(songName);
	
	// Replace underscores with spaces and format properly
	const formattedName = decodedName.replace(/_/g, ' ');
	
	// Construct Detective Conan World URL
	// Convert spaces back to underscores for the URL
	const urlName = formattedName.replace(/ /g, '_');
	
	return `https://www.detectiveconanworld.com/wiki/${urlName}`;
}

/**
 * Convert song name from various formats to a clean display name
 * @param {string} songName - Raw song name from URL
 * @returns {string} - Clean song name for display
 */
export function formatSongName(songName) {
	return decodeURIComponent(songName).replace(/_/g, ' ');
}