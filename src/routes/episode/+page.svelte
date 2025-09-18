<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Search, UserSearch, Backpack, ArrowLeft, ExternalLink } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

	let episode = $state(null);
	let loading = $state(true);
	let error = $state(null);

	const plotEmojiMap = {
		new: '✨',
		char: '📈',
		romance: '❤️',
		bo: '👥',
		fbi: '👮‍♂️',
		mk: '🎩',
		past: '🕰️',
		db: '🕵️‍♂️'
	};

	const BASE_CONAN_URL =
		import.meta.env.VITE_WIKI_BASE_URL || 'https://www.detectiveconanworld.com';

	function formatPlots(plots) {
		if (!plots || plots.length === 0) return [];
		return plots.map((plot) => ({
			name: plot,
			emoji: plotEmojiMap[plot] || '📺',
			label: plot.charAt(0).toUpperCase() + plot.slice(1)
		}));
	}

	async function fetchEpisodeDetails() {
		try {
			loading = true;
			// Get episode link from URL search parameters
			const urlParams = new URLSearchParams(window.location.search);
			const episodeLink = urlParams.get('link');

			if (!episodeLink) {
				throw new Error('No episode specified');
			}

			// Construct the full episode URL
			const fullEpisodeUrl = `${BASE_CONAN_URL}${episodeLink}`;

			// Use the new episode detail endpoint
			const response = await fetch(
				`${BASE_URL}/episode/?episode_url=${encodeURIComponent(fullEpisodeUrl)}`
			);

			if (!response.ok) {
				throw new Error('Episode not found');
			}

			episode = await response.json();
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchEpisodeDetails();
	});
</script>

{#if loading}
	<div class="flex justify-center items-center h-screen">
		<div class="text-lg text-gray-600">Loading episode details...</div>
	</div>
{:else if error}
	<div class="flex justify-center items-center h-screen">
		<div class="bg-red-50 border border-red-200 rounded-lg p-6">
			<h2 class="text-red-800 font-semibold mb-2">Error Loading Episode</h2>
			<p class="text-red-600">{error}</p>
			<Button onclick={() => window.history.back()} class="mt-4">
				<ArrowLeft class="w-4 h-4 mr-2" />
				Go Back
			</Button>
		</div>
	</div>
{:else if episode}
	<!-- Description -->
	<div
		class="w-full h-fit opacity-100 flex flex-col items-center justify-center sm:gap-8 md:gap-12 lg:gap-14 xl:gap-18 2xl:gap-20 sm:py-10 md:py-12 lg:py-16 xl:py-20 2xl:py-20 sm:px-7 md:px-14 lg:px-32 xl:px-60 2xl:px-70"
		style="background: radial-gradient(163% 100% at 50% 111.9%, #132952 1.8%, #4DA0FF 31.24%, #CCC4FF 50.9%, #EBF1FF 76.28%);"
	>
		<div class="absolute top-4 left-4">
			<Button
				onclick={() => window.history.back()}
				variant="outline"
				class="flex items-center gap-2"
			>
				<ArrowLeft class="w-4 h-4" />
				Back to Episodes
			</Button>
		</div>

		<div class="flex flex-col sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-10">
			<h1>{episode.title_eng?.join(' / ') || 'Episode Title'}</h1>
			<div class="flex items-end gap-2">
				<h3>Episode {episode.episode_number} / Season {episode.season}</h3>
				<h4>{episode.airdate?.join(' / ') || 'Air Date'}</h4>
			</div>
			<p class="flex justify-center items-center">
				{episode.description || 'Episode description not available.'}
			</p>
		</div>

		<div class="object-cover rounded-[10px] w-[507px] h-fit rotate-[0deg] opacity-100">
			<img
				src={episode.episode_image_url || 'https://github.com/shadcn.png'}
				alt={episode.title_eng?.join(' / ') || 'Episode Image'}
				class="w-full h-full object-cover"
			/>
		</div>
	</div>

	<!-- Cast -->
	<div
		class="w-full h-fit opacity-100 bg-[linear-gradient(245.33deg,_#EBE7FF_11.69%,_#FFFFFF_54.37%)] flex flex-col items-center sm:py-10 md:py-12 lg:py-16 xl:py-20 2xl:py-20 gap-10 sm:px-16 md:px-24 lg:px-26 xl:px-30 2xl:px-36"
	>
		<h1 class="self-start">Cast</h1>
		<!-- Card list -->
		<div class="flex flex-wrap gap-4">
			{#each episode.main_characters || [] as character}
				<a href={character.character_url} class="no-underline">
					<Card.Root
						class="w-[300px] h-fit opacity-100 flex flex-col justify-center items-center gap-4 p-6 rounded-[10px] border border-solid border-gray-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-blue-300"
					>
						<Card.Header
							class="w-full h-auto instrument-serif-regular text-[28px] tracking-[-0.02em] text-center"
						>
							<Card.Title>{character.name_eng}</Card.Title>
						</Card.Header>
						<Card.Content
							class="bg-gray-300 w-[100px] h-[100px] aspect-square flex justify-center items-center rounded-[100%] px-0 py-0"
						>
							<Avatar.Root class="w-full h-full">
								<Avatar.Image
									src={character.character_image_url || 'https://github.com/shadcn.png'}
									alt={character.name_eng}
								/>
								<Avatar.Fallback>{character.name_eng.slice(0, 2).toUpperCase()}</Avatar.Fallback>
							</Avatar.Root>
						</Card.Content>
						<Card.Footer class="w-auto h-auto flex flex-wrap justify-center items-center gap-2">
							{#each character.character_info || [] as info}
								<Badge variant="outline">{info}</Badge>
							{/each}
						</Card.Footer>
					</Card.Root>
				</a>
			{/each}
		</div>
	</div>

	<!-- Plot -->
	<div
		class="w-full h-fit opacity-100 bg-[linear-gradient(336.19deg,_#FFFFFF_56.55%,_#EBE7FF_100.92%)] flex flex-col sm:py-10 md:py-12 lg:py-16 xl:py-20 lg:gap-6 xl:gap-10 sm:px-16 md:px-24 lg:px-26 xl:px-30 2xl:px-36"
	>
		<h1>Plot</h1>
		<!-- Case 1 -->
		<div class="flex flex-col gap-10">
			<h3 class="text-black">Case</h3>

			<div class="flex gap-4 justify-center items-center">
				<Carousel.Root class="w-full max-w-4xl h-fit p-4">
					<Carousel.Content>
						{#each episode.case?.case_card_list || [] as caseCard}
							<Carousel.Item>
								<div class="p-4">
									<Card.Root class="border border-gray-200 rounded-lg overflow-hidden">
										<Card.Header class="text-center instrument-serif-regular text-3xl">
											<Card.Title class="">{caseCard.crime_type}</Card.Title>
										</Card.Header>
										<Card.Content class="p-4 flex">
											<div class="flex-1 relative rounded-lg overflow-hidden">
												<img
													src={caseCard.case_image_url || 'https://github.com/shadcn.png'}
													alt={caseCard.crime_type}
													class="w-full aspect-square object-cover"
												/>
											</div>
											<div class="flex-1 p-4 space-y-3">
												<div class="space-y-2">
													{#if caseCard.location}
														<div class="flex gap-2">
															<span class="font-semibold text-base">Location:</span>
															<span class="text-[#737373] text-base">{caseCard.location}</span>
														</div>
													{/if}
													{#if caseCard.victims_name}
														<div class="flex gap-2">
															<span class="font-semibold text-base">Victim:</span>
															<span class="text-[#737373] text-base">{caseCard.victims_name}</span>
														</div>
													{/if}
													{#if caseCard.cause_of_death}
														<div class="flex gap-2">
															<span class="font-semibold text-base">Cause of death:</span>
															<span class="text-[#737373] text-base">{caseCard.cause_of_death}</span
															>
														</div>
													{/if}
													{#if caseCard.suspects_name}
														<div class="flex gap-2">
															<span class="font-semibold text-base">Suspects:</span>
															<span class="text-[#737373] text-base">{caseCard.suspects_name}</span>
														</div>
													{/if}
													{#if caseCard.culprit}
														<div class="flex gap-2">
															<span class="font-semibold text-base">Culprit:</span>
															<span class="text-[#737373] text-base">{caseCard.culprit}</span>
														</div>
													{/if}
												</div>
												<p class="text-[#737373] text-base leading-relaxed line-clamp-4">
													{caseCard.crime_description}
												</p>
											</div>
										</Card.Content>
									</Card.Root>
								</div>
							</Carousel.Item>
						{/each}
					</Carousel.Content>
					<Carousel.Previous />
					<Carousel.Next />
				</Carousel.Root>
			</div>

			<!-- People -->
			<div class="flex flex-col gap-10">
				<h3 class="text-black">People</h3>

				<div class="flex flex-wrap gap-4">
					{#each episode.side_characters || [] as person}
						<a href="" class="no-underline">
							<Card.Root
								class="w-[300px] h-fit opacity-100 flex flex-col justify-center items-center gap-4 p-6 rounded-[10px] border border-solid border-gray-200 cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-blue-300"
							>
								<Card.Header
									class="w-full h-auto instrument-serif-regular text-[28px] tracking-[-0.02em] text-center"
								>
									<Card.Title>{person.name_eng}</Card.Title>
								</Card.Header>
								<Card.Content
									class="bg-gray-300 w-[100px] h-[100px] aspect-square flex justify-center items-center rounded-[100%] px-0 py-0"
								>
									<Avatar.Root class="w-full h-full">
										<Avatar.Image
											src={person.character_image_url || 'https://github.com/shadcn.png'}
											alt={person.name_eng}
										/>
										<Avatar.Fallback>{person.name_eng.slice(0, 2).toUpperCase()}</Avatar.Fallback>
									</Avatar.Root>
								</Card.Content>
								<Card.Footer class="w-auto h-auto flex flex-wrap justify-center items-center gap-2">
									{#each person.character_info || [] as info}
										<Badge variant="outline">{info}</Badge>
									{/each}
								</Card.Footer>
							</Card.Root>
						</a>
					{/each}
				</div>
			</div>

			<!-- Resolution -->
			<div
				class="w-[1280px] h-fit self-center opacity-100 flex flex-col items-center justify-center gap-6 p-12 rounded-[20px] bg-[#325FEC]"
			>
				<h1 class="text-white">Resolution</h1>
				<div class="w-full h-auto text-white flex justify-center">
					<Accordion.Root type="single" class="w-full sm:max-w-[70%] text-white">
						{#if episode.resolution && Array.isArray(episode.resolution)}
							{#each episode.resolution as resolutionCase, index}
								{#if resolutionCase.Description}
									<!-- Single case with description only -->
									<Accordion.Item value="case-{index}">
										<Accordion.Trigger>Case {index + 1} Resolution</Accordion.Trigger>
										<Accordion.Content class="flex flex-col gap-4 text-balance">
											<div class="max-h-96 overflow-y-auto">
												{@html resolutionCase.Description}
											</div>
										</Accordion.Content>
									</Accordion.Item>
								{:else}
									<!-- Case with split sections -->
									{#if resolutionCase.Evidence && resolutionCase.Evidence.length > 0}
										<Accordion.Item value="evidence-{index}">
											<Accordion.Trigger>Case {index + 1} - Evidence</Accordion.Trigger>
											<Accordion.Content class="flex flex-col gap-4 text-balance">
												<div class="max-h-96 overflow-y-auto space-y-3">
													{#each resolutionCase.Evidence as evidenceItem}
														<p class="text-sm leading-relaxed">{evidenceItem}</p>
													{/each}
												</div>
											</Accordion.Content>
										</Accordion.Item>
									{/if}
									{#if resolutionCase.Conclusion}
										<Accordion.Item value="conclusion-{index}">
											<Accordion.Trigger>Case {index + 1} - Conclusion</Accordion.Trigger>
											<Accordion.Content class="flex flex-col gap-4 text-balance">
												<div class="max-h-96 overflow-y-auto">
													{@html resolutionCase.Conclusion}
												</div>
											</Accordion.Content>
										</Accordion.Item>
									{/if}
									{#if resolutionCase.Motive}
										<Accordion.Item value="motive-{index}">
											<Accordion.Trigger>Case {index + 1} - Motive</Accordion.Trigger>
											<Accordion.Content class="flex flex-col gap-4 text-balance">
												<div class="max-h-96 overflow-y-auto">
													{@html resolutionCase.Motive}
												</div>
											</Accordion.Content>
										</Accordion.Item>
									{/if}
								{/if}
							{/each}
						{:else}
							<!-- Fallback for old format or missing data -->
							<Accordion.Item value="resolution">
								<Accordion.Trigger>Resolution</Accordion.Trigger>
								<Accordion.Content class="flex flex-col gap-4 text-balance">
									<div class="max-h-96 overflow-y-auto">
										{@html episode.resolution || 'Resolution details not available.'}
									</div>
								</Accordion.Content>
							</Accordion.Item>
						{/if}
						{#if episode.gadgets && episode.gadgets.length > 0}
							<Accordion.Item value="gadgets">
								<Accordion.Trigger>Gadgets Used</Accordion.Trigger>
								<Accordion.Content class="flex flex-col gap-4 text-balance">
									<ul class="list-disc list-inside">
										{#each episode.gadgets as gadget}
											<li>{gadget}</li>
										{/each}
									</ul>
								</Accordion.Content>
							</Accordion.Item>
						{/if}
					</Accordion.Root>
				</div>
			</div>
		</div>
	</div>

	<!-- BGM list -->
	<div
		class="w-full h-fit opacity-100 bg-[linear-gradient(72.44deg,_#FFFFFF_56.67%,_#EBE7FF_102.5%)] flex flex-col sm:p-4 md:p-8 lg:p-12 xl:p-20 gap-7"
	>
		<h1 class="px-4 sm:px-0">BGM listing</h1>
		<div class="h-auto bg-white rounded-lg shadow-sm overflow-hidden">
			<!-- Desktop Table View -->
			<div class="hidden md:block overflow-x-auto">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-[200px] min-w-[150px]">Song Title</Table.Head>
							<Table.Head class="min-w-[150px]">Romaji</Table.Head>
							<Table.Head class="min-w-[150px]">Translation</Table.Head>
							<Table.Head class="text-right min-w-[120px]">OST</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each episode.bgm_list || [] as bgm}
							<Table.Row>
								<Table.Cell class="font-medium">{bgm['Song Title']}</Table.Cell>
								<Table.Cell class="text-gray-600">{bgm.Romaji}</Table.Cell>
								<Table.Cell class="text-gray-600">{bgm.Translation}</Table.Cell>
								<Table.Cell class="text-right">
									<a
										href={`/song/${encodeURIComponent(bgm.OST_name.replace(/\s+/g, '_'))}`}
										class="text-blue-600 hover:text-blue-800 underline text-sm cursor-pointer hover:bg-blue-50 px-2 py-1 rounded transition-colors duration-200"
									>
										{bgm.OST_name}
									</a>
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>

			<!-- Mobile Card View -->
			<div class="md:hidden space-y-4 p-4">
				{#each episode.bgm_list || [] as bgm}
					<div class="bg-gray-50 rounded-lg p-4 space-y-3">
						<div class="font-medium text-lg">{bgm['Song Title']}</div>
						<div class="space-y-2">
							<div class="flex flex-col">
								<span class="text-xs font-medium text-gray-500 uppercase tracking-wide">Romaji</span
								>
								<span class="text-gray-700">{bgm.Romaji}</span>
							</div>
							<div class="flex flex-col">
								<span class="text-xs font-medium text-gray-500 uppercase tracking-wide"
									>Translation</span
								>
								<span class="text-gray-700">{bgm.Translation}</span>
							</div>
							<div class="flex flex-col">
								<span class="text-xs font-medium text-gray-500 uppercase tracking-wide">OST</span>
								<a
									href={`/song/${encodeURIComponent(bgm.OST_name.replace(/\s+/g, '_'))}`}
									class="text-blue-600 hover:text-blue-800 underline text-sm w-fit cursor-pointer hover:bg-blue-50 px-2 py-1 rounded transition-colors duration-200"
								>
									{bgm.OST_name}
								</a>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
