<script>
	// Import character profile components
	import { 
		CharacterHero, 
		CharacterProfile,
		CharacterContent,
		CharacterGallery,
		CharacterLoading,
		CharacterError
	} from '$lib/components/ui/character-profile/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowLeft } from 'lucide-svelte';

	/** @type {import('./$types').PageData} */
	let { data } = $props();

	// Get data from server load
	const characterData = data.characterData;
	
	// Collapse/expand states
	let backgroundExpanded = $state(true);
	let personalityExpanded = $state(true);
	let appearanceExpanded = $state(true);
	let skillsExpanded = $state(true);
	
	// Helper functions to check if sections have data
	const hasProfile = $derived(characterData && characterData.profile && 
		Object.keys(characterData.profile || {}).some(key => {
			const value = characterData.profile[key];
			return value && (
				(Array.isArray(value) && value.length > 0) ||
				(typeof value === 'string' && value !== 'Unknown' && value !== '')
			);
		})
	);
	
	const hasActors = $derived(characterData?.actors && 
		(characterData.actors.voicesJapanese?.length > 0 || 
		 characterData.actors.voicesEnglish?.length > 0 || 
		 characterData.actors.dramaActors?.length > 0)
	);
	
	const hasBackground = $derived(characterData?.background && 
		(characterData.background.generic?.length > 0 || characterData.background.conanEdogawa?.length > 0)
	);
	
	const hasAppearance = $derived(characterData?.appearance && characterData.appearance.length > 0);
	
	const hasPersonality = $derived(characterData?.personality && characterData.personality.length > 0);
	
	const hasSkills = $derived(characterData?.skills && Object.values(characterData.skills).some(skill => 
		Array.isArray(skill) && skill.length > 0
	));
	
	const hasGallery = $derived(characterData?.galleryImages && characterData.galleryImages.length > 0);
</script>

<svelte:head>
	<title>{characterData?.name || 'Loading...'} - CanYouRegMyEx</title>
</svelte:head>

<div style="background: linear-gradient(336.19deg, #FFFFFF 56.55%, #EBE7FF 100.92%); min-height: 100vh;" class="relative">
	<!-- Back Button -->
	<div class="absolute top-4 left-4 z-10">
		<Button
			onclick={() => window.history.back()}
			variant="outline"
			class="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/95 transition-all duration-200 shadow-lg hover:shadow-xl"
		>
			<ArrowLeft class="w-4 h-4" />
			Back to Episode
		</Button>
	</div>

	{#if data?.error}
		<!-- Error State -->
		<CharacterError 
			title="Character Not Found"
			message={data.error.message || "We couldn't find the character you're looking for. Please check the character name and try again."}
		/>
	{:else if characterData}
		<!-- Character Hero Section -->
		<CharacterHero character={characterData} />

		<!-- Profile & Voice Actors Section -->
		{#if hasProfile || hasActors}
			<CharacterProfile 
				profile={characterData.profile}
				actors={characterData.actors}
			/>
		{/if}

		<!-- Background Section -->
		{#if hasBackground}
			<div class="py-8 border-t" style="background: rgba(255,255,255,0.7);">
				<div class="container mx-auto px-4 max-w-6xl">
					<button 
						class="flex items-center justify-between w-full text-left mb-6 focus:outline-none"
						onclick={() => backgroundExpanded = !backgroundExpanded}
					>
						<h2 class="text-2xl font-bold text-gray-900" style="color: #325FEC;">
							Backgrounds
						</h2>
						<svg 
							class="w-6 h-6 text-gray-500 transform transition-transform duration-200"
							class:rotate-180={!backgroundExpanded}
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
						</svg>
					</button>
					{#if backgroundExpanded}
						<div class="prose prose-lg max-w-none">
							{#if characterData.background.generic?.length > 0}
								{#each characterData.background.generic as paragraph}
									<p class="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
								{/each}
							{/if}
							{#if characterData.background.conanEdogawa?.length > 0}
								<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">As Conan Edogawa</h3>
								{#each characterData.background.conanEdogawa as paragraph}
									<p class="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
								{/each}
							{/if}
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Personality Section -->
		{#if hasPersonality}
			<div class="py-8 border-t" style="background: rgba(255,255,255,0.7);">
				<div class="container mx-auto px-4 max-w-6xl">
					<button 
						class="flex items-center justify-between w-full text-left mb-6 focus:outline-none"
						onclick={() => personalityExpanded = !personalityExpanded}
					>
						<h2 class="text-2xl font-bold text-gray-900" style="color: #325FEC;">
							Personality
						</h2>
						<svg 
							class="w-6 h-6 text-gray-500 transform transition-transform duration-200"
							class:rotate-180={!personalityExpanded}
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
						</svg>
					</button>
					{#if personalityExpanded}
						<div class="prose prose-lg max-w-none">
							{#each characterData.personality as paragraph}
								<p class="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Appearance Section -->
		{#if hasAppearance}
			<div class="py-8 border-t" style="background: rgba(255,255,255,0.7);">
				<div class="container mx-auto px-4 max-w-6xl">
					<button 
						class="flex items-center justify-between w-full text-left mb-6 focus:outline-none"
						onclick={() => appearanceExpanded = !appearanceExpanded}
					>
						<h2 class="text-2xl font-bold text-gray-900" style="color: #325FEC;">
							Appearance
						</h2>
						<svg 
							class="w-6 h-6 text-gray-500 transform transition-transform duration-200"
							class:rotate-180={!appearanceExpanded}
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
						</svg>
					</button>
					{#if appearanceExpanded}
						<div class="prose prose-lg max-w-none">
							{#each characterData.appearance as paragraph}
								<p class="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Skills Section -->
		{#if hasSkills}
			<div class="py-8 border-t" style="background: rgba(255,255,255,0.7);">
				<div class="container mx-auto px-4 max-w-6xl">
					<button 
						class="flex items-center justify-between w-full text-left mb-6 focus:outline-none"
						onclick={() => skillsExpanded = !skillsExpanded}
					>
						<h2 class="text-2xl font-bold text-gray-900" style="color: #325FEC;">
							Skills & Abilities
						</h2>
						<svg 
							class="w-6 h-6 text-gray-500 transform transition-transform duration-200"
							class:rotate-180={!skillsExpanded}
							fill="none" 
							stroke="currentColor" 
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
						</svg>
					</button>
					{#if skillsExpanded}
						<div class="space-y-6">
							{#if characterData.skills.intelligence?.length > 0}
								<div>
									<h3 class="text-lg font-semibold text-gray-900 mb-3">Intelligence</h3>
									<div class="prose max-w-none">
										{#each characterData.skills.intelligence as paragraph}
											<p class="text-gray-700 leading-relaxed mb-3">{paragraph}</p>
										{/each}
									</div>
								</div>
							{/if}
							
							{#if characterData.skills.athletic?.length > 0}
								<div>
									<h3 class="text-lg font-semibold text-gray-900 mb-3">Athletic Ability</h3>
									<div class="prose max-w-none">
										{#each characterData.skills.athletic as paragraph}
											<p class="text-gray-700 leading-relaxed mb-3">{paragraph}</p>
										{/each}
									</div>
								</div>
							{/if}
							
							{#if characterData.skills.language?.length > 0}
								<div>
									<h3 class="text-lg font-semibold text-gray-900 mb-3">Language Skills</h3>
									<div class="prose max-w-none">
										{#each characterData.skills.language as paragraph}
											<p class="text-gray-700 leading-relaxed mb-3">{paragraph}</p>
										{/each}
									</div>
								</div>
							{/if}
							
							{#if characterData.skills.music?.length > 0}
								<div>
									<h3 class="text-lg font-semibold text-gray-900 mb-3">Musical Ability</h3>
									<div class="prose max-w-none">
										{#each characterData.skills.music as paragraph}
											<p class="text-gray-700 leading-relaxed mb-3">{paragraph}</p>
										{/each}
									</div>
								</div>
							{/if}
							
							{#if characterData.skills.other?.length > 0}
								<div>
									<h3 class="text-lg font-semibold text-gray-900 mb-3">Other Skills</h3>
									<div class="prose max-w-none">
										{#each characterData.skills.other as paragraph}
											<p class="text-gray-700 leading-relaxed mb-3">{paragraph}</p>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Gallery Section -->
		{#if hasGallery}
			<CharacterGallery 
				images={characterData.galleryImages}
				characterName={characterData.name}
			/>
		{/if}
	{:else}
		<!-- Loading State -->
		<CharacterLoading />
	{/if}
</div>

<style>
	/* Global scroll behavior - applied to :global selectors */
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		scroll-snap-type: y proximity;
	}
</style>