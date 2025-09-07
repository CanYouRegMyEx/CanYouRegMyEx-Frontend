<script>
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Search } from 'lucide-svelte';
	import conanIcon from '$lib/assets/Conanicons.jpg';
	import bigConan from '$lib/assets/Bigconan.png';

	let showStatusBar = $state(true);
	let showActivityBar = $state(false);
	let showPanel = $state(false);

	const episodeTable = [
		{
			season: 1,
			jpn: 1,
			int: 1,
			title: 'Roller Coaster Murder Case',
			plot: '❤️🥲🐧',
			original: 'January 8, 1996',
			rebroadcast: 'May 24, 2004 July 3, 2025',
			manga: 'V1 ~ F1 (001)',
			hint: 'Skyscraper'
		},
		{
			season: 1,
			jpn: 2,
			int: 2,
			title: "Company President's Daughter Kidnapping Case",
			plot: '🕵️‍♂️🚗',
			original: 'January 15, 1996',
			rebroadcast: 'June 1, 2004 July 10, 2025',
			manga: 'V1 ~ F2 (002)',
			hint: 'Kidnapper'
		},
		{
			season: 1,
			jpn: 3,
			int: 3,
			title: 'Mystery of the Murdered Actress',
			plot: '🎭🔪',
			original: 'January 22, 1996',
			rebroadcast: 'June 8, 2004 July 17, 2025',
			manga: 'V1 ~ F3 (003)',
			hint: 'Actress'
		}
	];
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
	<div>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head>Season</Table.Head>
					<Table.Head>JPN</Table.Head>
					<Table.Head>INT</Table.Head>
					<Table.Head class="w-[100px]">Episode title</Table.Head>
					<Table.Head>Plot</Table.Head>
					<Table.Head>Original broadcast</Table.Head>
					<Table.Head>Original broadcast</Table.Head>
					<Table.Head>Manga resource</Table.Head>
					<Table.Head>Next's Conan hint</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each episodeTable as row}
					<Table.Row>
						<Table.Cell>{row.season}</Table.Cell>
						<Table.Cell>{row.jpn}</Table.Cell>
						<Table.Cell>{row.int}</Table.Cell>
						<Table.Cell>{row.title}</Table.Cell>
						<Table.Cell>{row.plot}</Table.Cell>
						<Table.Cell>{row.original}</Table.Cell>
						<Table.Cell>{row.rebroadcast}</Table.Cell>
						<Table.Cell>{row.manga}</Table.Cell>
						<Table.Cell>{row.hint}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>

	<!-- Pagination -->
	<div>
		<Pagination.Root count={100} perPage={10}>
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton />
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton />
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	</div>
</div>
