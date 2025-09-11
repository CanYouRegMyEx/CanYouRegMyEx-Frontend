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

	const BASE_URL = 'https://www.detectiveconanworld.com';

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
			const fullEpisodeUrl = `${BASE_URL}${episodeLink}`;

			// Use the new episode detail endpoint
			const response = await fetch(
				`http://127.0.0.1:8000/episode/?episode_url=${encodeURIComponent(fullEpisodeUrl)}`
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
		class="w-full h-screen opacity-100 flex flex-col items-center justify-center sm:gap-8 md:gap-12 lg:gap-14 xl:gap-18 2xl:gap-20 py-20 sm:px-7 md:px-14 lg:px-32 xl:px-60 2xl:px-70"
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
			<div class="flex flex-wrap gap-2 mb-4">
				<Badge variant="secondary" class="text-lg">
					📺 Episode {episode.international_episode_number}
				</Badge>
			</div>
			<p class="max-w-4xl text-center">
				{episode.description || 'Episode description not available.'}
			</p>
			<div class="flex gap-4 mt-4">
				<a
					href="{BASE_URL}{new URLSearchParams(window.location.search).get('link')}"
					target="_blank"
					class="inline-flex items-center gap-2 bg-white text-[#325FEC] px-4 py-2 rounded-lg hover:bg-gray-50 font-medium"
				>
					<ExternalLink class="w-4 h-4" />
					View on Detective Conan World
				</a>
			</div>
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
		class="w-full h-fit opacity-100 bg-[linear-gradient(245.33deg,_#EBE7FF_11.69%,_#FFFFFF_54.37%)] flex flex-col items-center py-20 gap-10 sm:px-16 md:px-24 lg:px-26 xl:px-30 2xl:px-36"
	>
		<h1 class="self-start">Cast</h1>
		<div class="flex flex-wrap gap-4">
			{#each episode.main_characters || [] as character}
				<Card.Root
					class="w-[300px] h-fit opacity-100 flex flex-col justify-center items-center gap-4 p-6 rounded-[10px] border border-solid border-gray-200"
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

			<div class="flex gap-4">
				<Carousel.Root class="w-full max-w-xs">
					<Carousel.Content>
						{#each episode.case?.case_card_list || [] as caseCard}
							<Carousel.Item>
								<div class="p-1">
									<Card.Root>
										<Card.Content class="flex aspect-square items-center justify-center p-6">
											<div class="flex flex-col gap-2">
												<div class="flex gap-2">
													<p>Location:</p>
													<p class="text-[#737373]">{caseCard.location}</p>
												</div>
												<div class="flex gap-2">
													<p>Victim:</p>
													<p class="text-[#737373]">{caseCard.victims_name}</p>
												</div>
												<div class="flex gap-2">
													<p>Cause of death:</p>
													<p class="text-[#737373]">{caseCard.cause_of_death}</p>
												</div>
												<div class="flex gap-2">
													<p>Crime Type:</p>
													<p class="text-[#737373]">{caseCard.crime_type}</p>
												</div>
												<p class="text-[#737373]">
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
						<Card.Root
							class="w-[300px] h-fit opacity-100 flex flex-col justify-center items-center gap-4 p-6 rounded-[10px] border border-solid border-gray-200"
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
					{/each}
				</div>
			</div>

			<!-- Resolution -->
			<div
				class="w-[1280px] h-auto self-center opacity-100 flex flex-col items-center justify-center gap-6 p-12 rounded-[20px] bg-[#325FEC]"
			>
				<h1 class="text-white">Resolution</h1>
				<div class="w-[600px] h-auto text-white flex justify-center">
					<Accordion.Root type="single" class="w-full sm:max-w-[70%] text-white" value="item-1">
						<Accordion.Item value="item-1">
							<Accordion.Trigger>Resolution</Accordion.Trigger>
							<Accordion.Content class="flex flex-col gap-4 text-balance">
								<div class="max-h-96 overflow-y-auto">
									{@html episode.resolution || 'Resolution details not available.'}
								</div>
							</Accordion.Content>
						</Accordion.Item>
						{#if episode.gadgets && episode.gadgets.length > 0}
							<Accordion.Item value="item-2">
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
		class="w-full h-fit opacity-100 bg-[linear-gradient(72.44deg,_#FFFFFF_56.67%,_#EBE7FF_102.5%)] flex flex-col p-20 gap-7"
	>
		<h1>BGM listing</h1>
		<div class="h-auto bg-white">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[200px]">Song Title</Table.Head>
						<Table.Head>Romaji</Table.Head>
						<Table.Head>Translation</Table.Head>
						<Table.Head class="text-right">OST</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each episode.bgm_list || [] as bgm}
						<Table.Row>
							<Table.Cell class="font-medium">{bgm['Song Title']}</Table.Cell>
							<Table.Cell>{bgm.Romaji}</Table.Cell>
							<Table.Cell>{bgm.Translation}</Table.Cell>
							<Table.Cell class="text-right">
								<a
									href={bgm.OST_url}
									target="_blank"
									class="text-blue-600 hover:text-blue-800 underline"
								>
									{bgm.OST_name}
								</a>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</div>
{/if}
