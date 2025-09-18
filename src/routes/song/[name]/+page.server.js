const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
const BASE_CONAN_URL = import.meta.env.VITE_WIKI_BASE_URL || 'https://www.detectiveconanworld.com';

function fixImageUrl(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `https://${url}`;
}

function mapSongNameToUrl(songName) {
  const decodedName = decodeURIComponent(songName);
  const formattedName = decodedName.replace(/_/g, ' ');
  const urlName = formattedName.replace(/ /g, '_');
  return `${BASE_CONAN_URL}/wiki/${urlName}`;
}

export async function load({ params, fetch }) {
  try {
    const songName = params.name;
    const songUrl = mapSongNameToUrl(songName);
    const res = await fetch(`${BASE_URL}/bgm?url=${encodeURIComponent(songUrl)}`);
    if (!res.ok) {
      return { error: { message: 'Song not found' } };
    }
    const apiData = await res.json();

    const song = {
      title: apiData.metadata?.romanji_title || apiData.metadata?.original_title || 'Unknown Title',
      description: apiData.description?.description || 'No description available',
      albumCover: fixImageUrl(apiData.metadata?.meta_image?.image_url) || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
      artist: apiData.metadata?.artist || 'Unknown Artist',
      cast: (apiData.description?.cast || []).map((member, index) => ({
        name: member.caption || `Cast Member ${index + 1}`,
        character: member.caption || `Character ${index + 1}`,
        image: fixImageUrl(member.image_url) || null
      })),
      openingSpeech: {
        japanese: { title: 'Japanese Version', content: apiData.description?.speech?.Japanese || 'No Japanese speech available' },
        english: { title: 'English Version', content: apiData.description?.speech?.English || 'No English speech available' }
      },
      lyrics: apiData.description?.lyrics?.Japanese || 'No Japanese lyrics available',
      lyricsRomanji: apiData.description?.lyrics?.Romaji || 'No Romanji lyrics available',
      trackList: (() => {
        const cdInfo = apiData.description?.cd_info;
        if (!cdInfo) return [];
        if (cdInfo['CD track listing'] && Array.isArray(cdInfo['CD track listing'])) {
          return cdInfo['CD track listing'].map(track => ({
            number: parseInt(track.number) || 0,
            titleJapanese: track.japanese_title || 'Unknown',
            titleRomanji: track.romanji_title || 'Unknown',
            translation: track.translated_title || 'Unknown',
            length: track.length || '0:00'
          }));
        }
        const allTracks = [];
        Object.entries(cdInfo).forEach(([cdName, tracks]) => {
          if (Array.isArray(tracks)) {
            tracks.forEach(track => {
              allTracks.push({
                cdName,
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
      cdCollection: (() => {
        const cdInfo = apiData.description?.cd_info;
        if (!cdInfo) return null;
        const cdEntries = Object.entries(cdInfo).filter(([key, value]) => key !== 'CD track listing' && Array.isArray(value));
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

    return { songData: song };
  } catch (err) {
    return { error: { message: err.message || 'Unknown error' } };
  }
}