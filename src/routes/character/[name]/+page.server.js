const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
const BASE_CONAN_URL = import.meta.env.VITE_WIKI_BASE_URL || 'https://www.detectiveconanworld.com';

function mapCharacterNameToUrl(characterName) {
  const decodedName = decodeURIComponent(characterName);
  const formattedName = decodedName.replace(/_/g, ' ');
  const urlName = formattedName.replace(/ /g, '_');
  return `${BASE_CONAN_URL}/wiki/${urlName}`;
}

function fixImageUrl(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `https://${url}`;
}

export async function load({ params, fetch }) {
  try {
    const characterName = params.name;
    const characterUrl = mapCharacterNameToUrl(characterName);

    const res = await fetch(`${BASE_URL}/character/?character_page_url=${encodeURIComponent(characterUrl)}`);
    if (!res.ok) {
      return { error: { message: 'Character not found' } };
    }
    const apiData = await res.json();

    const characterData = {
      name: apiData.profile?.name_eng || 'Unknown Character',
      nameJapanese: apiData.profile?.name_jpn || '',
      englishNames: apiData.profile?.names_eng_localised || [],
      profileImage: fixImageUrl(apiData.profile?.profile_picture_url) ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
      profile: {
        nameJapanese: apiData.profile?.name_jpn || '',
        englishNames: apiData.profile?.names_eng_localised || [],
        ages: apiData.profile?.ages || [],
        gender: apiData.profile?.gender || 'Unknown',
        heights: apiData.profile?.heights || [],
        weights: apiData.profile?.weights || [],
        birthday: apiData.profile?.birthday || 'Unknown',
        occupations: apiData.profile?.occupations || [],
        statuses: apiData.profile?.statuses || []
      },
      actors: {
        voicesJapanese: apiData.profile?.actors?.voices_jpn || [],
        voicesEnglish: apiData.profile?.actors?.voices_eng || [],
        dramaActors: apiData.profile?.actors?.drama_actors || []
      },
      summary: apiData.summary || [],
      background: apiData.background || {},
      appearance: apiData.appearance || {},
      personality: apiData.personality || {},
      skills: apiData.skills || {},
      galleryImages: (apiData.image_urls || []).map(url => fixImageUrl(url)).filter(Boolean)
    };

    return { characterData };
  } catch (err) {
    return { error: { message: err.message || 'Unknown error' } };
  }
}