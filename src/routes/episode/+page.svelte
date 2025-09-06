<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Table from '$lib/components/ui/table/index.js';

	let castList = [
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

<div
	class="w-full h-screen opacity-100 flex flex-col items-center justify-center gap-16 pt-32 pr-[180px] pb-20 pl-[180px] bg-white"
	style="background: radial-gradient(163% 100% at 50% 111.9%, #132952 1.8%, #4DA0FF 31.24%, #CCC4FF 50.9%, #EBF1FF 76.28%);"
>
	<div class="flex flex-col space-y-6">
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

	<div class="bg-black w-[507px] h-[620px] rotate-[0deg] opacity-100"></div>
</div>

<!-- Cast -->
<div
	class="w-full min-h-screen opacity-100 bg-[linear-gradient(245.33deg,_#EBE7FF_11.69%,_#FFFFFF_54.37%)] flex flex-col gap-7 p-20"
>
	<h1>Cast</h1>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
		{#each castList as cast}
			<Card.Root
				class="w-[300px] h-[272px] opacity-100 gap-4 p-6 rounded-[10px] border border-solid border-gray-200"
			>
				<Card.Header>
					<Card.Title>{cast.title}</Card.Title>
					<Card.Description>{cast.description}</Card.Description>
				</Card.Header>
				<Card.Content>
					<p>{cast.content}</p>
				</Card.Content>
				<Card.Footer>
					<p>{cast.footer}</p>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>

<!-- Plot -->
<div
	class="w-full h-[2055px] opacity-100 bg-[linear-gradient(336.19deg,_#FFFFFF_56.55%,_#EBE7FF_100.92%)] flex flex-col p-20 gap-10"
>
	<h1>Plot</h1>
	<!-- Case 1 -->
	<div class="flex flex-col gap-12">
		<!-- Case Detail -->
		<div class="flex flex-col gap-7">
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

		<!-- Card -->
		<div class="flex flex-col justify-center items-center">
			<Card.Root
				class="w-[641px] h-[364px] opacity-100 gap-6 p-6 rounded-[10px] border border-solid"
			>
				<Card.Header>
					<Card.Title>Card Title</Card.Title>
					<Card.Description>Card Description</Card.Description>
				</Card.Header>
				<Card.Content>
					<p>Card Content</p>
				</Card.Content>
				<Card.Footer>
					<p>Card Footer</p>
				</Card.Footer>
			</Card.Root>
		</div>

		<!-- People -->
		<div class="flex flex-col gap-7">
			<h3 class="text-black">People</h3>

			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{#each peopleList as person}
					<Card.Root
						class="w-[300px] h-[272px] opacity-100 gap-4 p-6 rounded-[10px] border border-solid border-gray-200"
					>
						<Card.Header>
							<Card.Title>{person.title}</Card.Title>
							<Card.Description>{person.description}</Card.Description>
						</Card.Header>
						<Card.Content>
							<p>{person.content}</p>
						</Card.Content>
						<Card.Footer>
							<p>{person.footer}</p>
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
						<Accordion.Trigger>Product Information</Accordion.Trigger>
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
						<Accordion.Trigger>Shipping Details</Accordion.Trigger>
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
						<Accordion.Trigger>Return Policy</Accordion.Trigger>
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
	class="w-full h-[466px] opacity-100 bg-[linear-gradient(72.44deg,_#FFFFFF_56.67%,_#EBE7FF_102.5%)] flex flex-col p-20 gap-7"
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
