<script>
	import { cn } from "$lib/utils.js";

	let {
		profile,
		actors,
		class: className,
		...restProps
	} = $props();

	// Add debug logging
	console.log('Profile data received:', profile);
	console.log('Actors data received:', actors);
	console.log('About to create derived values...');
	
	// Add fallback data for testing
	const fallbackProfile = {
		nameJapanese: '工藤新一',
		englishNames: ['Jimmy Kudo'],
		ages: ['16-17', '6-7 as Conan'],
		gender: 'Male',
		heights: ['174 cm', '5\'8.5"'],
		weights: ['Unknown'],
		birthday: 'May 4',
		relatives: [
			'Yusaku Kudo (father)',
			'Yukiko Kudo (mother)', 
			'Ran Mouri (girlfriend)'
		],
		occupations: ['High School Student', 'Detective'],
		statuses: ['Alive'],
		nicknames: [
			'Detective Geek',
			'The Holmes of the East', 
			'The Savior of the police force'
		],
		aliases: ['Conan Edogawa']
	};
	
	const fallbackActors = {
		voicesJapanese: ['Kappei Yamaguchi'],
		voicesEnglish: ['Jerry Jewell'],
		dramaActors: ['Shun Oguri']
	};

	// Transform profile data - use state and effect
	let profileData = $state([]);
	
	$effect(() => {
		const profileSource = profile || fallbackProfile;
		console.log('Processing profile source:', profileSource);
		
		if (!profileSource) {
			profileData = [];
			return;
		}
		
		const data = [];
		
		if (profileSource.nameJapanese) {
			data.push({ label: 'Japanese name:', value: profileSource.nameJapanese });
		}
		if (profileSource.englishNames?.length > 0) {
			data.push({ label: 'English name:', value: profileSource.englishNames.join(', ') });
		}
		if (profileSource.ages?.length > 0) {
			data.push({ label: 'Age:', value: profileSource.ages.join(', ') });
		}
		if (profileSource.gender) {
			data.push({ label: 'Gender:', value: profileSource.gender });
		}
		if (profileSource.heights?.length > 0) {
			data.push({ label: 'Height:', value: profileSource.heights.join(', ') });
		}
		if (profileSource.weights?.length > 0 && profileSource.weights[0] !== 'Unknown') {
			data.push({ label: 'Weight:', value: profileSource.weights.join(', ') });
		}
		if (profileSource.birthday && profileSource.birthday !== 'Unknown') {
			data.push({ label: 'Date of birth:', value: profileSource.birthday });
		}
		
		if (profileSource.relatives?.length > 0) {
			data.push({ label: 'Relatives:', value: profileSource.relatives.join(', ') });
		}
		
		if (profileSource.occupations?.length > 0) {
			data.push({ label: 'Occupation:', value: profileSource.occupations.join(', ') });
		}
		if (profileSource.statuses?.length > 0) {
			data.push({ label: 'Status:', value: profileSource.statuses.join(', ') });
		}
		
		if (profileSource.nicknames?.length > 0) {
			data.push({ label: 'Nicknames:', value: profileSource.nicknames.join(', ') });
		}
		
		if (profileSource.aliases?.length > 0) {
			data.push({ label: 'Aliases:', value: profileSource.aliases.join(', ') });
		}
		
		console.log('Final profile data:', data);
		profileData = data;
	});

	// Transform actors data - use state and effect
	let actorsData = $state([]);
	
	$effect(() => {
		const actorsSource = actors || fallbackActors;
		console.log('Processing actors source:', actorsSource);
		
		if (!actorsSource) {
			actorsData = [];
			return;
		}
		
		const data = [];
		
		// Japanese voices - show each on separate line
		if (actorsSource.voicesJapanese?.length > 0) {
			const japaneseVoices = actorsSource.voicesJapanese.map(voice => {
				// Handle special formatting for young voice actors
				if (voice.includes('young') || voice.includes('(young)')) {
					return voice;
				}
				return voice;
			}).join('\n');
			
			data.push({ 
				label: 'Japanese voice:', 
				value: japaneseVoices
			});
		}
		
		// English voices - show each on separate line with studio info
		if (actorsSource.voicesEnglish?.length > 0) {
			const englishVoices = actorsSource.voicesEnglish.map(voice => {
				// Keep studio information in parentheses
				return voice;
			}).join('\n');
			
			data.push({ 
				label: 'English voice:', 
				value: englishVoices
			});
		}
		
		// Drama actors - show each on separate line
		if (actorsSource.dramaActors?.length > 0) {
			const dramaActors = actorsSource.dramaActors.join('\n');
			data.push({ 
				label: 'Drama actor:', 
				value: dramaActors
			});
		}
		
		console.log('Final actors data:', data);
		actorsData = data;
	});
</script>

<div class={cn("bg-white py-8", className)} {...restProps}>
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- Profile Section -->
			<div class="bg-white border rounded-lg overflow-hidden" style="box-shadow: 0px 1px 4px 0px #00000033;">
				<div class="bg-gray-50 px-6 py-3 border-b">
					<h3 class="text-center text-gray-900" style="font-family: 'Instrument Serif'; font-weight: 400; font-size: 28px; line-height: 100%; letter-spacing: 0%; vertical-align: middle;">Profile</h3>
				</div>
				<div class="p-4">
					{#each profileData as item}
						<div class="flex py-2">
							<div class="text-sm font-medium text-gray-600 w-32 flex-shrink-0">
								{item.label}
							</div>
							<div class="text-sm text-gray-900 flex-1">
								{item.value}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Actors Section -->
			<div class="bg-white border rounded-lg overflow-hidden" style="box-shadow: 0px 1px 4px 0px #00000033;">
				<div class="bg-gray-50 px-6 py-3 border-b">
					<h3 class="text-center text-gray-900" style="font-family: 'Instrument Serif'; font-weight: 400; font-size: 28px; line-height: 100%; letter-spacing: 0%; vertical-align: middle;">Actors</h3>
				</div>
				<div class="p-4">
					{#each actorsData as item}
						<div class="flex py-2">
							<div class="text-sm font-medium text-gray-600 w-32 flex-shrink-0">
								{item.label}
							</div>
							<div class="text-sm text-gray-900 flex-1 whitespace-pre-line">
								{item.value}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>