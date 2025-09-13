<script>
	import { afterNavigate } from '$app/navigation';
	afterNavigate(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
	import CastMember from '$lib/components/ui/cast-member';
	import LyricsToggle from '$lib/components/ui/lyrics-toggle';
	import FlipCard from '$lib/components/ui/flip-card';
	import TrackTable from '$lib/components/ui/track-table';
	import { Music, Users, MessageCircle, FileText, Disc, Wifi, WifiOff, AlertCircle, ArrowLeft } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	/** @type {import('./$types').PageData} */
	let { data } = $props();

	// Get data from server load
	const songData = data.songData;
	const apiBaseUrl = data.apiBaseUrl;
	const apiError = data.apiError;
	
	// Check if data is from API or mock
	const isFromApi = !apiError;
	
	// Debug: log the song data to see what we're getting
	console.log('Song data:', songData);
	console.log('Cast data:', songData?.cast);
	// Debug: Check cast images specifically
	songData?.cast?.forEach((member, index) => {
		console.log(`Cast ${index + 1} - ${member.name}:`, member.image);
	});
	
	// Helper functions to check if sections have data
	const hasCast = $derived(songData?.cast && songData.cast.length > 0);
	const hasOpeningSpeech = $derived(
		songData?.openingSpeech && 
		(songData.openingSpeech.japanese?.content || songData.openingSpeech.english?.content) &&
		(songData.openingSpeech.japanese?.content !== "No Japanese speech available" || 
		 songData.openingSpeech.english?.content !== "No English speech available")
	);
	const hasLyrics = $derived(
		songData?.lyrics && songData.lyrics !== "No Japanese lyrics available" ||
		songData?.lyricsRomanji && songData.lyricsRomanji !== "No Romanji lyrics available"
	);
	const hasTrackList = $derived(
		(songData?.trackList && songData.trackList.length > 0) ||
		(songData?.cdCollection && songData.cdCollection.length > 0)
	);
	
	// Reactive variables
	let showRomanji = $state(false);
</script>

<svelte:head>
	<title>{songData?.title || 'Loading...'} - CanYouRegMyEx</title>
</svelte:head>



{#if songData}
<div class="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
	<div class="absolute top-4 left-4">
		<Button
			onclick={() => window.history.back()}
			variant="outline"
			class="flex items-center gap-2"
		>
			<ArrowLeft class="w-4 h-4" />
			Back to Episode
		</Button>
	</div>
	
	<!-- Header Section - Full Screen -->
	<section class="min-h-screen flex items-center justify-center">
		<div class="w-full overflow-hidden text-white" style="background: radial-gradient(163% 100% at 50% 111.9%, #132952 1.8%, #4DA0FF 31.24%, #CCC4FF 50.9%, #EBF1FF 76.28%);">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="flex flex-col items-center text-center space-y-6 max-w-4xl">
					<div class="flex items-center justify-center mb-4">
						<Music class="w-12 h-12 text-blue-300 mr-4" />
						<h1 class="text-4xl md:text-6xl font-bold mb-4" style="color: #325FEC;">{songData.title}</h1>
					</div>
					<div class="max-w-3xl">
						<p class="text-lg md:text-xl leading-relaxed mb-8" style="color: #081116;">
							{songData.description}
						</p>
					</div>
					<div class="flex-shrink-0">
						<img 
							src={songData.albumCover} 
							alt="Album Cover" 
							class="w-64 h-64 md:w-80 md:h-80 rounded-lg shadow-2xl object-cover mx-auto transform hover:scale-105 transition-transform duration-300"
							onerror={(e) => e.target.src = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center'}
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Cast Section - Full Screen -->
	{#if hasCast}
	<section class="min-h-screen flex items-center justify-center">
		<div class="w-full" style="background: linear-gradient(245.33deg, #EBE7FF 11.69%, #FFFFFF 54.37%);">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="w-full max-w-4xl">
					<div class="flex items-center justify-center mb-8">
						<!-- <Users class="w-8 h-8 text-purple-600 mr-3" /> -->
						<h2 class="text-4xl md:text-5xl font-bold" style="color: #325FEC;">Cast</h2>
					</div>
					<div class="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8" style="color: #171717;">
						{#each songData.cast as member, index}
							<CastMember {member} {index} />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>
	{/if}

	<!-- Conan's Opening Speech - Full Screen -->
	{#if hasOpeningSpeech}
	<section class="min-h-screen flex items-center justify-center">
		<div class="w-full" style="background: linear-gradient(336.19deg, #FFFFFF 56.55%, #EBE7FF 100.92%);">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="w-full max-w-4xl">
					<div class="flex items-center justify-center mb-12">
						<!-- <MessageCircle class="w-8 h-8 text-purple-600 mr-3" /> -->
						<h2 class="text-4xl md:text-5xl font-bold" style="color: #325FEC;">Opening Speech</h2>
					</div>
					
					<FlipCard 
						frontContent={songData.openingSpeech.japanese}
						backContent={songData.openingSpeech.english}
					/>
				</div>
			</div>
		</div>
	</section>
	{/if}

	<!-- Lyrics Section - Full Screen -->
	{#if hasLyrics}
	<section class="min-h-screen flex items-center justify-center">
		<div class="w-full" style="background: linear-gradient(84.56deg, #FFFFFF 56.5%, #EBE7FF 93.91%);">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="w-full max-w-4xl">
					<div class="flex items-center justify-center mb-8">
						<!-- <FileText class="w-8 h-8 text-purple-600 mr-3" /> -->
						<h2 class="text-4xl md:text-5xl font-bold" style="color: #325FEC;">Lyrics</h2>
					</div>

					<LyricsToggle
						bind:showRomanji={showRomanji}
						lyrics={songData.lyrics}
						lyricsRomanji={songData.lyricsRomanji}
					/>
				</div>
			</div>
		</div>
	</section>
	{/if}

	<!-- CD Info Section - Full Screen -->
	{#if hasTrackList}
	<section class="min-h-screen flex items-center justify-center">
		<div class="w-full" style="background: linear-gradient(292.25deg, #FFFFFF 51.61%, #EBE7FF 89.83%);">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="w-full max-w-6xl">
					<div class="flex items-center justify-center mb-8">
						<!-- <Disc class="w-8 h-8 text-blue-600 mr-3" /> -->
						<h2 class="text-4xl md:text-5xl font-bold" style="color: #325FEC;">CD info</h2>
					</div>

					{#if songData.cdCollection}
						<!-- Multiple CDs Format -->
						{#each songData.cdCollection as cd, cdIndex}
							<div class="mb-12">
								<!-- CD Title -->
								<div class="mb-8">
									<div class="flex items-center">
										<Disc class="w-6 h-6 text-gray-600 mr-2" />
										<h3 class="text-2xl md:text-3xl font-bold" style="color: #171717;">{cd.name}</h3>
									</div>
								</div>
								
								<!-- Track Table for this CD -->
								<TrackTable trackList={cd.tracks} />
							</div>
						{/each}
					{:else}
						<!-- Single CD Format (Original) -->
						<div class="mb-8">
							<div class="flex items-center">
								<Disc class="w-6 h-6 text-gray-600 mr-2" />
								<h3 class="text-2xl md:text-3xl font-bold" style="color: #171717;">CD1</h3>
							</div>
						</div>
						
						<!-- Track Table Component -->
						<TrackTable trackList={songData.trackList} />
					{/if}
				</div>
			</div>
		</div>
	</section>
	{/if}

</div>
{:else}
<!-- Loading State -->
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
	<div class="text-center">
		<div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
		<p class="text-xl text-gray-600 dark:text-gray-300">Loading song data...</p>
	</div>
</div>
{/if}

<style>
	/* Global scroll behavior - applied to :global selectors */
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		scroll-snap-type: y proximity;
	}

	/* Section scroll snapping */
	section {
		scroll-snap-align: start;
	}
</style>

```