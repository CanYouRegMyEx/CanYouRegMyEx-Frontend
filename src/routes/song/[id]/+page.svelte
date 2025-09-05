<script>
	import { mockSongData } from '$lib/data/songData.js';
	import CastMember from '$lib/components/CastMember.svelte';
	import LyricsToggle from '$lib/components/LyricsToggle.svelte';
	import FlipCard from '$lib/components/FlipCard.svelte';
	import TrackTable from '$lib/components/TrackTable.svelte';

	// Use imported data instead of inline data
	const songData = mockSongData;
	
	// Reactive variables
	let showRomanji = $state(false);
</script>

<svelte:head>
	<title>{songData.title} - CanYouRegMyEx</title>
</svelte:head>

<div class="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
	
	<!-- Header Section - Full Screen -->
	<section class="min-h-screen flex items-center justify-center">
		<div class="w-full overflow-hidden bg-gradient-to-b from-white via-blue-100 to-blue-500 text-black">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="flex flex-col items-center text-center space-y-6 max-w-4xl">
					<h1 class="text-4xl md:text-6xl font-bold mb-4 text-blue-900">{songData.title}</h1>
					<div class="max-w-3xl">
						<p class="text-lg md:text-xl leading-relaxed mb-8 text-gray-800">
							{songData.description}
						</p>
					</div>
					<div class="flex-shrink-0">
						<img 
							src={songData.albumCover} 
							alt="Album Cover" 
							class="w-64 h-64 md:w-80 md:h-80 rounded-lg shadow-2xl object-cover mx-auto transform hover:scale-105 transition-transform duration-300"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Cast Section - Full Screen -->
	<section class="min-h-screen flex items-center justify-center">
		<div class="w-full bg-gradient-to-br from-pink-100 via-rose-50 to-red-100">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="w-full max-w-4xl">
					<h2 class="text-4xl md:text-5xl font-bold mb-8 text-center text-red-800">Cast</h2>
					<div class="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
						{#each songData.cast as member, index}
							<CastMember {member} {index} />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Conan's Opening Speech - Full Screen -->
	<section class="min-h-screen flex items-center justify-center">
		<div class="w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="w-full max-w-4xl">
					<h2 class="text-4xl md:text-5xl font-bold mb-12 text-center text-purple-800">Opening Speech</h2>
					
					<FlipCard 
						frontContent={songData.openingSpeech.japanese}
						backContent={songData.openingSpeech.english}
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- Lyrics Section - Full Screen -->
	<section class="min-h-screen flex items-center justify-center">
		<div class="w-full bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="w-full max-w-4xl">
					<h2 class="text-4xl md:text-5xl font-bold mb-8 text-center text-green-800">Lyrics</h2>
					
					<LyricsToggle 
						bind:showRomanji={showRomanji}
						lyrics={songData.lyrics}
						lyricsRomanji={songData.lyricsRomanji}
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- CD Info Section - Full Screen -->
	<section class="min-h-screen flex items-center justify-center">
		<div class="w-full bg-gradient-to-br from-blue-100 via-blue-50 to-white">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="w-full max-w-6xl">
					<h2 class="text-4xl md:text-5xl font-bold mb-8 text-blue-800">CD info</h2>
					
					<!-- CD Title -->
					<div class="mb-8">
						<h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-6">CD1</h3>
					</div>
					
					<!-- Track Table Component -->
					<TrackTable trackList={songData.trackList} />
				</div>
			</div>
		</div>
	</section>

</div>

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
