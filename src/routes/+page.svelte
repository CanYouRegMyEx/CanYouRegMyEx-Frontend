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

	let episodes = [];
	let limit = 25;
	let offset = 0;
	let loading = false;
	let error = null;

	async function fetchEpisodes() {
		loading = true;
		error = null;
		try {
			const res = await fetch(`http://127.0.0.1:8000/episodes/?limit=${limit}&offset=${offset}`);
			if (!res.ok) throw new Error('Failed to fetch episodes');
			episodes = await res.json();
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
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
			<p class="hover:text-[#325FEC]"><a href="">Reference</a></p>
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
			/>
			<span class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
				<Search />
			</span>
		</div>
		<!-- Filter dropdown -->
		<div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="w-[150px] h-fit">
					{#snippet child({ props })}
						<Button {...props} variant="outline">Season</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-[150px] h-fit">
					<DropdownMenu.Group>
						<DropdownMenu.Label>Appearance</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.CheckboxItem bind:checked={showStatusBar}>
							Status Bar
						</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem bind:checked={showActivityBar} disabled>
							Activity Bar
						</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem bind:checked={showPanel}>Panel</DropdownMenu.CheckboxItem>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<!-- Plot -->
		<div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="w-[250px] h-fit">
					{#snippet child({ props })}
						<Button {...props} variant="outline">Plot</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-[250px] h-fit">
					<DropdownMenu.Group>
						<DropdownMenu.Label>Appearance</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.CheckboxItem bind:checked={showStatusBar}>
							Status Bar
						</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem bind:checked={showActivityBar} disabled>
							Activity Bar
						</DropdownMenu.CheckboxItem>
						<DropdownMenu.CheckboxItem bind:checked={showPanel}>Panel</DropdownMenu.CheckboxItem>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
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
							<Table.Cell>{ep.plots ? ep.plots.join(', ') : ''}</Table.Cell>
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
	<div class="flex gap-4 mt-4">
		<Button on:click={prevPage} disabled={offset === 0}>Previous</Button>
		<Button on:click={nextPage}>Next</Button>
	</div>
</div>
