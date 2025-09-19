

const BASE_URL = process.env.VITE_API_BASE_URL || process.env.API_BASE_URL || 'http://127.0.0.1:8000';
const BASE_CONAN_URL = process.env.VITE_WIKI_BASE_URL || 'https://www.detectiveconanworld.com';

function fixImageUrl(url) {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return `https://${url}`;
}

function mapSongNameToUrl(songName) {
  let decoded = songName;
  try { decoded = decodeURIComponent(songName); } catch (e) { decoded = songName; }
  const normalized = decoded.replace(/_/g, ' ').trim().replace(/\s+/g, '_');
  return `${BASE_CONAN_URL}/wiki/${normalized}`;
}

export async function load({ url, fetch }) {
  try {
    const link = url.searchParams.get('link');
    const name = url.searchParams.get('name');

    if (!link && !name) {
      return { error: { message: 'Missing song link or name' } };
    }

  let songUrl;
    if (link) {
      // support both '/wiki/Name' and full URL
      if (link.startsWith('/wiki/')) songUrl = `${BASE_CONAN_URL}${link}`;
      else if (link.startsWith('http')) songUrl = link;
      else songUrl = `${BASE_CONAN_URL}/${link.replace(/^\//, '')}`;
    } else {
      songUrl = mapSongNameToUrl(name);
    }
    // Log the resolved wiki URL and the backend request we'll send
  // use encodeURI so only non-ASCII characters are percent-encoded (slashes/colon remain)
  const attemptUrl = `${BASE_URL}/bgm/?url=${encodeURI(songUrl)}`;
    console.log('[song loader] songUrl ->', songUrl);
    console.log('first encoded attemptUrl ->', attemptUrl);
    console.log('second encoded attemptUrl ->', encodeURI(attemptUrl));

    //We need to encode URL again to handle cases where the URL contains characters that need encoding
    const resp = await fetch(encodeURI(attemptUrl));
    const bodyText = await resp.text();
    if (!resp.ok) {
      // include attemptUrl in the error payload to aid debugging
      console.warn('[song loader] backend returned non-OK', resp.status, bodyText.slice(0, 200));
      return { error: { message: 'Song not found', songUrl, attemptUrl, status: resp.status, body: bodyText.slice(0, 1000) } };
    }

    let apiData;
    try {
      apiData = JSON.parse(bodyText);
    } catch (e) {
      console.warn('[song loader] JSON parse failed', e.message);
      return { error: { message: 'Bad API response', songUrl, attemptUrl, parseError: e.message, body: bodyText.slice(0, 1000) } };
    }

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
        japanese: { title: 'Japanese Version', content: apiData.description?.speech?.Japanese || null },
        english: { title: 'English Version', content: apiData.description?.speech?.English || null }
      },
      lyrics: apiData.description?.lyrics?.Japanese || null,
      lyricsRomanji: apiData.description?.lyrics?.Romaji || null,
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

    console.log('[song loader] success for', song.title);
    return { songData: song };
  } catch (err) {
    console.error('[song loader] unexpected error', err && err.message ? err.message : err);
    return { error: { message: err.message || 'Unknown error' } };
  }
}
