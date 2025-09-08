<script>
	import { mockSongData } from '$lib/data/songData.js';
	import CastMember from '$lib/components/ui/cast-member';
	import LyricsToggle from '$lib/components/ui/lyrics-toggle';
	import FlipCard from '$lib/components/ui/flip-card';
	import TrackTable from '$lib/components/ui/track-table';
	import { Music, Users, MessageCircle, FileText, Disc } from '@lucide/svelte';

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
						/>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Cast Section - Full Screen -->
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

	<!-- Conan's Opening Speech - Full Screen -->
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

	<!-- Lyrics Section - Full Screen -->
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

	<!-- CD Info Section - Full Screen -->
	<section class="min-h-screen flex items-center justify-center">
		<div class="w-full" style="background: linear-gradient(292.25deg, #FFFFFF 51.61%, #EBE7FF 89.83%);">
			<div class="min-h-screen flex items-center justify-center p-8">
				<div class="w-full max-w-6xl">
					<div class="flex items-center justify-center mb-8">
						<!-- <Disc class="w-8 h-8 text-blue-600 mr-3" /> -->
						<h2 class="text-4xl md:text-5xl font-bold" style="color: #325FEC;">CD info</h2>
					</div>

					<!-- CD Title -->
					<div class="mb-8">
						<div class="flex items-center">
							<Disc class="w-6 h-6 text-gray-600 mr-2" />
							<h3 class="text-2xl md:text-3xl font-bold" style="color: #171717;">CD1</h3>
						</div>
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
