<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Search } from 'lucide-svelte';
	import { UserSearch } from 'lucide-svelte';
	import { Backpack } from 'lucide-svelte';

	let castList = [
		{
			title: 'Kudo Shinichi',
			description: 'Card Description 1',
			content: 'Card Content 1',
			footer: 'Card Footer 1'
		},
		{
			title: 'Card Title 2',
			description: 'Card Description 2',
			content: 'Card Content 2',
			footer: 'Card Footer 2'
		},
		{
			title: 'Card Title 3',
			description: 'Card Description 3',
			content: 'Card Content 3',
			footer: 'Card Footer 3'
		},
		{
			title: 'Card Title 4',
			description: 'Card Description 4',
			content: 'Card Content 4',
			footer: 'Card Footer 4'
		},
		{
			title: 'Card Title 5',
			description: 'Card Description 5',
			content: 'Card Content 5',
			footer: 'Card Footer 5'
		}
	];

	let peopleList = [
		{
			title: 'Card Title 1',
			description: 'Card Description 1',
			content: 'Card Content 1',
			footer: 'Card Footer 1'
		},
		{
			title: 'Card Title 2',
			description: 'Card Description 2',
			content: 'Card Content 2',
			footer: 'Card Footer 2'
		},
		{
			title: 'Card Title 3',
			description: 'Card Description 3',
			content: 'Card Content 3',
			footer: 'Card Footer 3'
		},
		{
			title: 'Card Title 4',
			description: 'Card Description 4',
			content: 'Card Content 4',
			footer: 'Card Footer 4'
		},
		{
			title: 'Card Title 5',
			description: 'Card Description 5',
			content: 'Card Content 5',
			footer: 'Card Footer 5'
		}
	];
</script>

<!-- Description -->
<div
	class="w-full h-screen opacity-100 flex flex-col items-center justify-center sm:gap-8 md:gap-12 lg:gap-14 xl:gap-18 2xl:gap-20 py-20 sm:px-7 md:px-14 lg:px-32 xl:px-60 2xl:px-70"
	style="background: radial-gradient(163% 100% at 50% 111.9%, #132952 1.8%, #4DA0FF 31.24%, #CCC4FF 50.9%, #EBF1FF 76.28%);"
>
	<div class="flex flex-col sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-10">
		<h1>Roller Coaster Murder Case</h1>
		<div class="flex items-end gap-2">
			<h3>Episode 1 / Season 1</h3>
			<h4>January 8, 1996</h4>
		</div>
		<p>
			Roller Coaster Murder Case (ジェットコースター殺人事件 Jetto Kōsutā Satsujin Jiken?) is the
			first episode of Detective Conan anime. The anime begins in the middle of a case where a
			murder was committed during a party at a private mansion, introducing the high-school student
			detective Shinichi Kudo who came to solve it. In the next day, he comes with Ran Mouri to
			the Tropical Land where another murder would be committed in a roller-coaster. Being the first
			episode, most of the main characters are introduced throughout the episode. The introduction
			of the characters Ayumi, Mitsuhiko, and Genta are anime-original, as their first manga
			appearance would be only in volume 2.
		</p>
	</div>

	<div class="object-cover rounded-[10px] w-[507px] h-fit rotate-[0deg] opacity-100">
		<img src="https://github.com/shadcn.png" alt="" class="w-full h-full object-cover" />
	</div>
</div>

<!-- Cast -->
<div
	class="w-full h-fit opacity-100 bg-[linear-gradient(245.33deg,_#EBE7FF_11.69%,_#FFFFFF_54.37%)] flex flex-col items-center py-20 gap-10 sm:px-16 md:px-24 lg:px-26 xl:px-30 2xl:px-36"
>
	<h1 class="self-start">Cast</h1>
	<div class="flex flex-wrap gap-4">
		{#each castList as cast}
			<Card.Root
				class="w-[300px] h-fit opacity-100 flex flex-col justify-center items-center gap-4 p-6 rounded-[10px] border border-solid border-gray-200"
			>
				<Card.Header
					class="w-full h-auto instrument-serif-regular text-[28px] tracking-[-0.02em] text-center"
				>
					<Card.Title>{cast.title}</Card.Title>
					<!-- <Card.Description>{cast.description}</Card.Description> -->
				</Card.Header>
				<Card.Content
					class="bg-gray-300 w-[100px] h-[100px] aspect-square flex justify-center items-center rounded-[100%] px-0 py-0"
				>
					<!-- <p>{cast.content}</p> -->
					<Avatar.Root class="w-full h-full">
						<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
						<Avatar.Fallback>CN</Avatar.Fallback>
					</Avatar.Root>
				</Card.Content>
				<Card.Footer class="w-auto h-auto flex flex-wrap justify-center items-center gap-2">
					<!-- <p>{cast.footer}</p> -->
					<Badge variant="outline"><Search />Badge</Badge>
					<Badge variant="outline"><UserSearch />Badge</Badge>
					<Badge variant="outline"><Backpack />Badge</Badge>
					<Badge variant="outline">Badge</Badge>
					<Badge variant="outline">Badge</Badge>
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
	<div class="flex flex-col sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 2xl:gap-15">
		<!-- Case Detail -->
		<div class="flex flex-col md:gap-3 lg:gap-5 xl:gap-7">
			<h2 class="flex items-end">
				<span class="instrument-serif-regular">Case 1</span>: Crime at the Private Mansion
			</h2>
			<h3 class="text-black">Situation</h3>
			<p>
				The episode starts in a mansion where a party has been interrupted by a murder: one of the
				guests, President Yamazaki of Yatsubishi Bank, was found dead with a bullet in his heart.
				The police, led by <span class="underline">Inspector Megure</span>, have been investigating
				the crime scene, but have no conclusive evidence as to who the killer is. However,
				<span class="underline">Shinichi</span> makes his grand entrance and claims that he has figured
				out the case.
			</p>
		</div>

		<!-- Carousel -->
		<div class="flex justify-center items-center">
			<Carousel.Root class="w-full h-fit max-w-2xl">
				<Carousel.Content>
					{#each Array(5), i}
						<Carousel.Item>
							<div class="p-1">
								<Card.Root>
									<Card.Content class="flex flex-col items-center justify-center p-6 gap-6">
										<p class="instrument-serif-regular">Murder</p>

										<div class="w-full h-fit flex gap-6">
											<img
												src="https://github.com/shadcn.png"
												alt="CN"
												class="max-w-[250px] max-h-[250px]"
											/>

											<div class="flex flex-col gap-2">
												<div class="flex gap-4">
													<p>Location:</p>
													<p class="text-[#737373]">Private Mansion</p>
												</div>
												<div class="flex gap-4">
													<p>Victim:</p>
													<p class="text-[#737373]">Tetsu Yamazaki</p>
												</div>
												<div class="flex gap-4">
													<p>Cause of death:</p>
													<p class="text-[#737373]">Gunshot wound</p>
												</div>
												<div class="flex gap-4">
													<p>Suspects:</p>
													<p class="text-[#737373]">Owner/host, and guests</p>
												</div>
												<p class="text-[#737373]">
													President Yamazaki of Yatsubishi Bank is found dead in a locked room with
													a bullet through his chest.
												</p>
											</div>
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
				{#each castList as cast}
					<Card.Root
						class="w-[300px] h-fit opacity-100 flex flex-col justify-center items-center gap-4 p-6 rounded-[10px] border border-solid border-gray-200"
					>
						<Card.Header
							class="w-full h-auto instrument-serif-regular text-[28px] tracking-[-0.02em] text-center"
						>
							<Card.Title>{cast.title}</Card.Title>
							<!-- <Card.Description>{cast.description}</Card.Description> -->
						</Card.Header>
						<Card.Content
							class="bg-gray-300 w-[100px] h-[100px] aspect-square flex justify-center items-center rounded-[100%] px-0 py-0"
						>
							<!-- <p>{cast.content}</p> -->
							<Avatar.Root class="w-full h-full">
								<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
								<Avatar.Fallback>CN</Avatar.Fallback>
							</Avatar.Root>
						</Card.Content>
						<Card.Footer class="w-auto h-auto flex flex-wrap justify-center items-center gap-2">
							<!-- <p>{cast.footer}</p> -->
							<Badge variant="outline"><Search />Badge</Badge>
							<Badge variant="outline"><UserSearch />Badge</Badge>
							<Badge variant="outline"><Backpack />Badge</Badge>
							<Badge variant="outline">Badge</Badge>
							<Badge variant="outline">Badge</Badge>
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
						<Accordion.Trigger>Evidence</Accordion.Trigger>
						<Accordion.Content class="flex flex-col gap-4 text-balance">
							<p>
								Our flagship product combines cutting-edge technology with sleek design. Built with
								premium materials, it offers unparalleled performance and reliability.
							</p>
							<p>
								Key features include advanced processing capabilities, and an intuitive user
								interface designed for both beginners and experts.
							</p>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-2">
						<Accordion.Trigger>Conclusion</Accordion.Trigger>
						<Accordion.Content class="flex flex-col gap-4 text-balance">
							<p>
								We offer worldwide shipping through trusted courier partners. Standard delivery
								takes 3-5 business days, while express shipping ensures delivery within 1-2 business
								days.
							</p>
							<p>
								All orders are carefully packaged and fully insured. Track your shipment in
								real-time through our dedicated tracking portal.
							</p>
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="item-3">
						<Accordion.Trigger>Motive</Accordion.Trigger>
						<Accordion.Content class="flex flex-col gap-4 text-balance">
							<p>
								We stand behind our products with a comprehensive 30-day return policy. If
								you&apos;re not completely satisfied, simply return the item in its original
								condition.
							</p>
							<p>
								Our hassle-free return process includes free return shipping and full refunds
								processed within 48 hours of receiving the returned item.
							</p>
						</Accordion.Content>
					</Accordion.Item>
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
					<Table.Head class="w-[100px]">Invoice</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head>Method</Table.Head>
					<Table.Head class="text-right">Amount</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell class="font-medium">INV001</Table.Cell>
					<Table.Cell>Paid</Table.Cell>
					<Table.Cell>Credit Card</Table.Cell>
					<Table.Cell class="text-right">$250.00</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</div>
</div>
