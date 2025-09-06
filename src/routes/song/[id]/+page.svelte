<script>
	import { mockSongData } from '$lib/data/songData.js';
	import CastMember from '$lib/components/ui/cast-member';
	import LyricsToggle from '$lib/components/ui/lyrics-toggle';
	import FlipCard from '$lib/components/ui/flip-card';
	import TrackTable from '$lib/components/ui/track-table';

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
		<div class="w-full overflow-hidden text-white" style="background: radial-gradient(163% 100% at 50% 111.9%, #132952 1.8%, #4DA0FF 31.24%, #CCC4FF 50.9%, #EBF1FF 76.28%);">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="flex flex-col items-center text-center space-y-6 max-w-4xl">
					<h1 class="text-4xl md:text-6xl font-bold mb-4" style="color: #325FEC;">{songData.title}</h1>
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
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Cast Section - Full Screen -->
	<section class="min-h-screen flex items-center justify-center">
		<div class="w-full" style="background: linear-gradient(180deg, #F0ECFF 0%, #FFFFFF 60%);">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="w-full max-w-4xl">
					<h2 class="text-4xl md:text-5xl font-bold mb-8 text-center" style="color: #325FEC;">Cast</h2>
					<div class="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8" style="color: #171717;">
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
		<div class="w-full" style="background: linear-gradient(180deg, #F8F6FF 0%, #FFFFFF 70%);">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="w-full max-w-4xl">
					<h2 class="text-4xl md:text-5xl font-bold mb-12 text-center" style="color: #325FEC;">Opening Speech</h2>
					
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
		<div class="w-full" style="background: linear-gradient(-166deg, #F8F6FF 0%, #FFFFFF 70%);">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="w-full max-w-4xl">
					<h2 class="text-4xl md:text-5xl font-bold mb-8 text-center" style="color: #325FEC;">Lyrics</h2>

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
					<h2 class="text-4xl md:text-5xl font-bold mb-8 text-center" style="color: #325FEC;">CD info</h2>

					<!-- CD Title -->
					<div class="mb-8">
						<h3 class="text-2xl md:text-3xl font-bold" style="color: #171717;">CD1</h3>
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
