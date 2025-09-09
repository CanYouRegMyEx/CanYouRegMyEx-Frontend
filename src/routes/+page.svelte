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
	let season = '';
	let plot = [];

	let episodes = $state([]);
	let limit = 25;
	let offset = $state(0);
	let loading = $state(false);
	let error = $state(null);
	let totalCount = $state(0);
	let currentPage = $state(1);

	async function fetchEpisodes() {
		loading = true;
		error = null;
		const params = new URLSearchParams({
			limit,
			offset,
			...(search && { filter: search }),
			...(season && { season: parseInt(season) })
		});

		// Add plot parameters as separate query params
		if (plot && plot.length > 0) {
			plot.forEach((p) => params.append('plot', p));
		}

		try {
			const res = await fetch(`http://127.0.0.1:8000/episodes/?${params.toString()}`);
			if (!res.ok) throw new Error('Failed to fetch episodes');
			const data = await res.json();

			// Backend returns array directly
			episodes = data;

			// Update current page based on offset
			currentPage = Math.floor(offset / limit) + 1;

			// We don't know the exact total count, so we'll use a simple approach:
			// - If we get exactly 'limit' episodes, there might be more
			// - If we get less than 'limit', we're at the end
			const hasMoreData = data.length === limit;

			// Set a high totalCount if there might be more data
			if (hasMoreData) {
				totalCount = offset + limit + limit; // Add another page worth to enable next
			} else {
				totalCount = offset + data.length; // Exact count to disable next
			}
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
		// Simple check: if current page has full data, allow next page
		if (episodes.length === limit) {
			offset = offset + limit;
			fetchEpisodes();
		}
	}

	function prevPage() {
		if (offset >= limit) {
			offset = offset - limit;
			fetchEpisodes();
		}
	}

	function goToPage(page) {
		offset = (page - 1) * limit;
		fetchEpisodes();
	}

	function firstPage() {
		offset = 0;
		fetchEpisodes();
	}

	// Remove lastPage function since we don't know total pages

	function handlePlotChange(event) {
		plot = Array.from(event.target.selectedOptions).map((option) => option.value);
		offset = 0;
		fetchEpisodes();
	}

	// Plot emoji mapping
	const plotEmojiMap = {
		new: '✨',
		char: '👤',
		romance: '❤️',
		bo: '👥',
		fbi: '👮‍♂️',
		mk: '🎩',
		past: '🕰️',
		hh: '🧢',
		db: '🕵️‍♂️',
		dc: '👓',
		mko: '💎'
	};

	// Function to format plots with emojis
	function formatPlots(plots) {
		if (!plots || plots.length === 0) return '';
		return plots.map((plot) => plotEmojiMap[plot] || plot).join(' ');
	}

	// Reactive variables for pagination info
	let hasNext = $derived(episodes.length === limit); // Has next if current page is full
	let hasPrev = $derived(offset > 0);
	let startItem = $derived(offset + 1);
	let endItem = $derived(offset + episodes.length);

	// Calculate displayed page info
	let displayedPages = $derived(() => {
		if (!hasNext && !hasPrev) return 1; // Only one page
		return currentPage;
	});

	onMount(fetchEpisodes);
</script>

<div class="w-full h-screen flex flex-col">
	<!-- Navbar -->
	<div class="bg-white w-full h-fit max-h-[100px] flex justify-between items-center px-10 py-1">
		<div class="flex items-center gap-4">
			<img class="w-24 h-24" src={conanIcon} alt="Conan Icon" />
			<h1 class="instrument-serif-regular">CanYouRegMyEx</h1>
		</div>
		<div class="flex gap-10">
			<p class="hover:text-[#325FEC]"><a href="">Download CSV</a></p>
			<p class="hover:text-[#325FEC]"><a href="">Source Code</a></p>
			<p class="hover:text-[#325FEC]"><a href="">Youtube</a></p>
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
	<div class="bg-[#325FEC] p-7 overflow-hidden">
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
				placeholder="Episode number, Episode title,  Next’s Conan Hint"
				class="pr-10 w-full"
				bind:value={search}
				on:keydown={(e) => {
					if (e.key === 'Enter') handleSearch();
				}}
			/>
			<span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
				<Search />
			</span>
		</div>
		<!-- Filter dropdown -->
		<div>
			<Input
				type="number"
				placeholder="Season"
				bind:value={season}
				on:input={() => {
					offset = 0;
					fetchEpisodes();
				}}
			/>
		</div>
		<!-- Plot -->
		<div>
			<select
				multiple
				bind:value={plot}
				on:change={handlePlotChange}
				class="min-w-[180px] p-2 border rounded"
			>
				<option value="new">✨New</option>
				<option value="char">📈Character</option>
				<option value="romance">❤️Romance</option>
				<option value="bo">👥Black Organization</option>
				<option value="fbi">👮‍♂️FBI</option>
				<option value="mk">🎩Magic Kaito</option>
				<option value="past">🕰️Past</option>
				<option value="hh">🧢Heiji Hattori</option>
				<option value="db">🕵️‍♂️Detective Boys</option>
				<option value="dc">👓Detective Conan</option>
				<option value="mko">💎Mysterious Kid</option>
			</select>
		</div>
		<Button class="bg-[#325FEC] text-white">See all result</Button>
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
								<a href={ep.episode.link} class="text-blue-600 underline">{ep.episode.label}</a>
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
				<!-- First Page -->
				<Button variant="outline" size="sm" on:click={firstPage} disabled={!hasPrev}>First</Button>

				<!-- Previous Page -->
				<Button variant="outline" size="sm" on:click={prevPage} disabled={!hasPrev}>
					Previous
				</Button>

				<!-- Current Page Info -->
				<div class="px-4 py-2 text-sm bg-gray-100 rounded">
					Page {currentPage}
				</div>

				<!-- Next Page -->
				<Button variant="outline" size="sm" on:click={nextPage} disabled={!hasNext}>Next</Button>
			</div>

			<!-- Page Size Selector -->
			<div class="flex justify-center items-center gap-2 text-sm">
				<span>Items per page:</span>
				<select
					bind:value={limit}
					on:change={() => {
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
			</div>
		{/if}
	</div>
</div>
