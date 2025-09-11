<script>
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Search } from 'lucide-svelte';
	import conanIcon from '$lib/assets/Conanicons.jpg';
	import bigConan from '$lib/assets/Bigconan.png';
	import { onMount } from 'svelte';

	let showStatusBar = $state(true);
	let showActivityBar = $state(false);
	let showPanel = $state(false);

	let search = '';
	let selectedSeasons = $state([]);
	let selectedPlots = $state([]);

	let episodes = $state([]);
	let availableSeasons = $state([]);
	let availablePlots = $state([]);

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

	let limit = 25;
	let offset = $state(0);
	let loading = $state(false);
	let error = $state(null);
	let totalCount = $state(0);
	let actualDataLength = $state(0);
	let currentPage = $state(1);

	async function fetchAvailableSeasons() {
		try {
			const allSeasons = new Set();
			let offset = 0;
			const limit = 100;
			let hasMoreData = true;
			let batchCount = 0;

			while (hasMoreData && batchCount < 50) {
				const response = await fetch(
					`http://127.0.0.1:8000/episodes/?limit=${limit}&offset=${offset}`
				);

				if (response.ok) {
					const data = await response.json();
					data.forEach((episode) => allSeasons.add(episode.season));

					if (data.length < limit) {
						hasMoreData = false;
					} else {
						offset += limit;
					}
					batchCount++;
				} else {
					hasMoreData = false;
				}
			}

			availableSeasons = Array.from(allSeasons).sort((a, b) => a - b);
		} catch (e) {
			availableSeasons = Array.from({ length: 30 }, (_, i) => i + 1);
		}
	}

	async function fetchAvailablePlots() {
		try {
			const allPlots = new Set();
			let offset = 0;
			const limit = 100;
			let hasMoreData = true;
			let batchCount = 0;

			while (hasMoreData && batchCount < 50) {
				const response = await fetch(
					`http://127.0.0.1:8000/episodes/?limit=${limit}&offset=${offset}`
				);

				if (response.ok) {
					const data = await response.json();

					data.forEach((episode) => {
						if (episode.plots && Array.isArray(episode.plots)) {
							episode.plots.forEach((plot) => {
								allPlots.add(plot);
							});
						}
					});

					if (data.length < limit) {
						hasMoreData = false;
					} else {
						offset += limit;
					}
					batchCount++;
				} else {
					hasMoreData = false;
				}
			}

			const plotNames = {
				new: 'New Character',
				char: 'Character Development',
				romance: 'Romance',
				bo: 'Black Organization',
				fbi: 'FBI',
				mk: 'Magic Kaito',
				past: 'Character Past',
				db: 'Detective Boys'
			};

			const plots = Array.from(allPlots)
				.sort()
				.map((plot) => ({
					value: plot,
					label: `${plotEmojiMap[plot] || '📺'} ${plotNames[plot] || plot.charAt(0).toUpperCase() + plot.slice(1)}`,
					emoji: plotEmojiMap[plot] || '📺'
				}));

			availablePlots = plots;
		} catch (e) {
			availablePlots = [
				{ value: 'new', label: '✨ New Character', emoji: '✨' },
				{ value: 'char', label: '📈 Character Development', emoji: '📈' },
				{ value: 'romance', label: '❤️ Romance', emoji: '❤️' },
				{ value: 'bo', label: '👥 Black Organization', emoji: '👥' },
				{ value: 'fbi', label: '👮‍♂️ FBI', emoji: '👮‍♂️' },
				{ value: 'mk', label: '🎩 Magic Kaito', emoji: '🎩' },
				{ value: 'past', label: '🕰️ Character Past', emoji: '🕰️' },
				{ value: 'db', label: '🕵️‍♂️ Detective Boys', emoji: '🕵️‍♂️' }
			];
		}
	}

	async function fetchEpisodes() {
		loading = true;
		error = null;

		const hasPlotFilter = selectedPlots.length > 0;

		if (hasPlotFilter) {
			await fetchEpisodesWithPlotSearch();
		} else {
			await fetchEpisodesNormal();
		}
	}

	async function fetchEpisodesNormal() {
		const params = new URLSearchParams();

		if (search) {
			params.append('filter', search);
			params.append('limit', 100);
		} else {
			params.append('limit', limit);
		}

		if (selectedSeasons && selectedSeasons.length > 0) {
			selectedSeasons.forEach((s) => params.append('season', parseInt(s)));
		}

		params.append('offset', offset);

		const finalUrl = `http://127.0.0.1:8000/episodes/?${params.toString()}`;

		try {
			const res = await fetch(finalUrl);
			if (!res.ok) throw new Error('Failed to fetch episodes');
			const data = await res.json();

			currentPage = Math.floor(offset / limit) + 1;
			actualDataLength = data.length;
			episodes = data;

			if (search) {
				totalCount = data.length;
			} else {
				totalCount = data.length === limit ? offset + limit + 1 : offset + data.length;
			}
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	async function fetchEpisodesWithPlotSearch() {
		const allResults = [];
		const targetResultsNeeded = limit;
		const currentPageStart = offset;
		let searchOffset = 0;
		const maxSearchRange = 1500;

		try {
			while (
				allResults.length < targetResultsNeeded + currentPageStart &&
				searchOffset < maxSearchRange
			) {
				const params = new URLSearchParams();

				if (search) {
					params.append('filter', search);
				}
				if (selectedSeasons.length > 0) {
					selectedSeasons.forEach((s) => params.append('season', parseInt(s)));
				}
				if (selectedPlots.length > 0) {
					selectedPlots.forEach((p) => params.append('plot', p));
				}

				params.append('limit', 100);
				params.append('offset', searchOffset);

				const searchUrl = `http://127.0.0.1:8000/episodes/?${params.toString()}`;

				const res = await fetch(searchUrl);
				if (res.ok) {
					const data = await res.json();
					allResults.push(...data);

					if (data.length < 100) {
						break;
					}
				} else {
					break;
				}

				searchOffset += 100;
			}

			currentPage = Math.floor(offset / limit) + 1;
			const startIndex = currentPageStart;
			const endIndex = startIndex + limit;
			episodes = allResults.slice(startIndex, endIndex);
			actualDataLength = episodes.length;
			totalCount = allResults.length;
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	function handleSearch() {
		offset = 0;
		fetchEpisodes();
	}

	function nextPage() {
		offset += limit;
		fetchEpisodes();
	}

	function prevPage() {
		if (offset >= limit) {
			offset -= limit;
			fetchEpisodes();
		}
	}

	function handleFilterChange() {
		offset = 0;
		fetchEpisodes();
	}

	function seeAllResults() {
		search = '';
		selectedSeasons = [];
		selectedPlots = [];
		offset = 0;

		setTimeout(() => {
			const inputElement = document.querySelector('input[type="text"]');
			if (inputElement) {
				inputElement.value = '';
				inputElement.blur();
			}
		}, 0);

		fetchEpisodes();
	}
	function formatPlots(plots) {
		if (!plots || plots.length === 0) return '';
		return plots.map((plot) => plotEmojiMap[plot] || plot).join(' ');
	}
	let hasNext = $derived(totalCount > offset + actualDataLength);
	let hasPrev = $derived(offset > 0);
	let startItem = $derived(offset + 1);
	let endItem = $derived(offset + episodes.length);

	onMount(async () => {
		await fetchAvailableSeasons();
		await fetchAvailablePlots();
		fetchEpisodes();
	});
</script>

<div class="w-full h-screen flex flex-col">
	<!-- Navbar -->
	<div class="bg-white w-full h-fit max-h-[100px] flex justify-between items-center px-10 py-1">
		<div class="flex items-center gap-4">
			<img class="w-24 h-24" src={conanIcon} alt="Conan Icon" />
			<h1 class="instrument-serif-regular">CanYouRegMyEx</h1>
		</div>
		<div class="flex gap-10">
			<p class="hover:text-[#325FEC]">Download CSV</p>
			<p class="hover:text-[#325FEC]"><a href="https://github.com/CanYouRegMyEx">Source Code</a></p>
			<p class="hover:text-[#325FEC]"><a href="#">Youtube</a></p>
			<p class="hover:text-[#325FEC]">
				<a href="https://www.detectiveconanworld.com/wiki/Anime">Reference</a>
			</p>
		</div>
	</div>

	<!-- Background Gradient -->
	<div
		class="w-full h-fit flex justify-evenly items-start gap-20 px-20"
		style="background: radial-gradient(163% 100% at 50% 111.9%, #132952 1.8%, #4DA0FF 31.24%, #CCC4FF 50.9%, #EBF1FF 76.28%);"
	>
		<div class="flex flex-col gap-12 max-w-[596px] self-center">
			<h1 class="instrument-serif-regular text-black text-8xl">Detective Conan</h1>
			<p>
				The Detective Conan anime was first aired on January 8, 1996. It is animated by TMS
				Entertainment (formerly known as Tokyo Movie), and is produced by Yomiuri TV. The broadcast
				schedule was Mondays at 7.30 p.m. JST (excluding 1-hour, 2-hour and 2.5-hour special
				episodes). On October 2008, the schedule was moved to Mondays at 7.00 p.m. JST, before being
				moved to Saturdays at 6.00 p.m. JST since April 2009. On March 6, 2021, the anime reached
				1000 episodes and continues until today. The show's official website is <a
					href="http://www.ytv.co.jp/conan/">http://www.ytv.co.jp/conan/</a
				>.
			</p>
		</div>
		<img src={bigConan} class="w-3xl aspect-square object-cover" alt="Big Conan" />
	</div>

	<!--Marquee Banner -->
	<div class="bg-[#325FEC] p-3 overflow-hidden">
		<h2 class="text-white marquee">
			There is only one truth, and I will uncover it. I’m Edogawa Conan, a detective.
		</h2>
	</div>
</div>

<!-- Episode List -->
<div class="w-full h-fit flex flex-col gap-10 p-32">
	<h1>All Episodes</h1>

	<!-- Tools bar -->
	<div class="flex justify-center items-center gap-10 w-full">
		<!-- Search bar -->
		<div class="relative w-2xl max-w-2xl max-h-16">
			<Input
				type="text"
				placeholder="Episode number, Episode title,  Next's Conan Hint"
				class="pr-10 w-full"
				bind:value={search}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
						handleSearch();
					}
				}}
			/>
			<button
				onclick={handleSearch}
				class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#325FEC] cursor-pointer transition-colors"
				type="button"
			>
				<Search />
			</button>
		</div>
		<!-- Season Filter Dropdown -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button variant="outline" class="min-w-[180px] justify-between">
					{selectedSeasons.length === 0
						? 'Select Seasons'
						: selectedSeasons.length === 1
							? `Season ${selectedSeasons[0]}`
							: `${selectedSeasons.length} Seasons`}
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56 max-h-60 overflow-y-auto">
				{#each availableSeasons as seasonNum}
					<DropdownMenu.CheckboxItem
						checked={selectedSeasons.includes(seasonNum.toString())}
						onCheckedChange={(checked) => {
							if (checked) {
								selectedSeasons = [...selectedSeasons, seasonNum.toString()];
							} else {
								selectedSeasons = selectedSeasons.filter((s) => s !== seasonNum.toString());
							}
							handleFilterChange();
						}}
					>
						Season {seasonNum}
					</DropdownMenu.CheckboxItem>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>

		<!-- Plot Filter Dropdown -->
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button variant="outline" class="min-w-[180px] justify-between">
					{selectedPlots.length === 0
						? 'Select Plots'
						: selectedPlots.length === 1
							? availablePlots.find((p) => p.value === selectedPlots[0])?.label || selectedPlots[0]
							: `${selectedPlots.length} Plots`}
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56 max-h-60 overflow-y-auto">
				{#each availablePlots as plot}
					<DropdownMenu.CheckboxItem
						checked={selectedPlots.includes(plot.value)}
						onCheckedChange={(checked) => {
							if (checked) {
								selectedPlots = [...selectedPlots, plot.value];
							} else {
								selectedPlots = selectedPlots.filter((p) => p !== plot.value);
							}
							handleFilterChange();
						}}
					>
						{plot.label}
					</DropdownMenu.CheckboxItem>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<Button class="bg-[#325FEC] text-white" onclick={seeAllResults}>See all result</Button>
	</div>

	<!-- Table -->
	<div class="h-auto bg-white rounded-lg shadow overflow-x-auto">
		{#if loading}
			<p class="p-4">Loading...</p>
		{:else if error}
			<p class="p-4 text-red-500">{error}</p>
		{:else}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Season</Table.Head>
						<Table.Head>JPN</Table.Head>
						<Table.Head>INT</Table.Head>
						<Table.Head class="w-[100px]">Episode title</Table.Head>
						<Table.Head>Plot</Table.Head>
						<Table.Head>Original broadcast</Table.Head>
						<Table.Head>English broadcast</Table.Head>
						<Table.Head>Manga resource</Table.Head>
						<Table.Head>Next's Conan hint</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each episodes as ep}
						<Table.Row>
							<Table.Cell>{ep.season}</Table.Cell>
							<Table.Cell>{ep.index_jpn}</Table.Cell>
							<Table.Cell>{ep.index_int}</Table.Cell>
							<Table.Cell>
								<a
									href="/episode?link={encodeURIComponent(ep.episode.link)}"
									class="text-blue-600 hover:text-blue-800 underline cursor-pointer"
								>
									{ep.episode.label}
								</a>
							</Table.Cell>
							<Table.Cell>{formatPlots(ep.plots)}</Table.Cell>
							<Table.Cell>{ep.date_jpn}</Table.Cell>
							<Table.Cell>{ep.date_eng}</Table.Cell>
							<Table.Cell>{ep.manga_source}</Table.Cell>
							<Table.Cell>{ep.next_hint}</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{/if}
	</div>

	<!-- Pagination -->
	<div class="flex flex-col gap-4 mt-4">
		<!-- Pagination Info -->
		<div class="text-sm text-gray-600 text-center">
			{#if episodes.length > 0}
				Showing episodes {startItem}-{endItem} (Page {currentPage})
				{#if hasNext}
					• More episodes available
				{:else}
					• End of results
				{/if}
			{:else}
				No episodes found
			{/if}
		</div>

		<!-- Pagination Controls -->
		{#if episodes.length > 0}
			<div class="flex justify-center items-center gap-2">
				<!-- Previous Page -->
				<Button variant="outline" size="sm" onclick={prevPage} disabled={!hasPrev}>Previous</Button>

				<!-- Current Page Info -->
				<div class="px-4 py-2 text-sm bg-gray-100 rounded">
					Page {currentPage}
				</div>

				<!-- Next Page -->
				<Button variant="outline" size="sm" onclick={nextPage} disabled={!hasNext}>Next</Button>
			</div>

			<!-- Page Size Selector -->
			<!-- <div class="flex justify-center items-center gap-2 text-sm">
				<span>Items per page:</span>
				<select
					bind:value={limit}
					onchange={() => {
						offset = 0;
						fetchEpisodes();
					}}
					class="border rounded px-2 py-1"
				>
					<option value={10}>10</option>
					<option value={25}>25</option>
					<option value={50}>50</option>
					<option value={100}>100</option>
				</select>
			</div> -->
		{/if}
	</div>
</div>
