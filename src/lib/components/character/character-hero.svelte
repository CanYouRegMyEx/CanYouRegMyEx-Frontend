<script>
	import { Avatar, AvatarImage, AvatarFallback } from "$lib/components/ui/avatar/index.js";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { cn } from "$lib/utils.js";

	let {
		character,
		class: className,
		...restProps
	} = $props();
	
	// Get first letter for fallback
	const initials = $derived(character?.name ? character.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?');
</script>

<div class={cn("flex flex-col md:flex-row items-center text-center md:text-left space-y-8 md:space-y-0 md:space-x-12", className)} {...restProps}>
	<!-- Content Section -->
	<div class="flex-1">
		<!-- Main Title -->
		<div class="flex items-center justify-center md:justify-start mb-4">
			<h1 class="text-4xl md:text-6xl font-bold" style="color: #325FEC;">
				{character?.name || 'Loading...'}
			</h1>
		</div>
		
		<!-- Japanese Name -->
		{#if character?.nameJapanese}
			<h2 class="text-2xl md:text-3xl font-medium mb-4" style="color: #081116;">
				{character.nameJapanese}
			</h2>
		{/if}
		
		<!-- English Names -->
		{#if character?.englishNames?.length > 0}
			<div class="mb-6">
				<h3 class="text-lg font-semibold mb-2" style="color: #081116;">Also known as:</h3>
				<div class="flex flex-wrap gap-2 justify-center md:justify-start">
					{#each character.englishNames as name}
						<Badge variant="outline" class="bg-white/20 backdrop-blur-sm border-white/30 text-gray-800 hover:bg-white/30">
							{name}
						</Badge>
					{/each}
				</div>
			</div>
		{/if}
		
		<!-- Summary -->
		{#if character?.summary?.length > 0}
			<div class="max-w-3xl">
				{#each character.summary as paragraph}
					<p class="text-lg leading-relaxed mb-4" style="color: #081116;">
						{paragraph}
					</p>
				{/each}
			</div>
		{/if}
	</div>
	
	<!-- Profile Image -->
	<div class="flex-shrink-0">
		<Avatar class="w-64 h-80 md:w-80 md:h-96 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300">
			<AvatarImage 
				src={character?.profileImage} 
				alt="{character?.name} Profile"
				class="object-cover"
			/>
			<AvatarFallback class="text-4xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
				{initials}
			</AvatarFallback>
		</Avatar>
	</div>
</div>