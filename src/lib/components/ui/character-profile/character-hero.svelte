<script>
	import { Card } from "$lib/components/ui/card/index.js";
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

<div class={cn("bg-white py-8", className)} {...restProps}>
	<div class="container mx-auto px-4 max-w-6xl">
		<div class="flex flex-col lg:flex-row items-start gap-8">
			<!-- Character Image -->
			<div class="flex-shrink-0">
				<div class="w-80 h-96 bg-white rounded-lg shadow-md overflow-hidden border">
					<img 
						src={character?.profileImage || "/api/placeholder/320/384"} 
						alt={character?.name || "Character"}
						class="w-full h-full object-cover"
					/>
				</div>
			</div>

			<!-- Character Info -->
			<div class="flex-1 space-y-6">
				<div>
					<h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-2" style="color: #325FEC;">
						{character?.name || 'Loading...'}
					</h1>
					{#if character?.nameJapanese}
						<p class="text-xl text-gray-500 mb-2">
							{character.nameJapanese}
						</p>
					{/if}
					
					<!-- Alternative Names -->
					{#if character?.englishNames?.length > 0}
						<p class="text-lg text-gray-600">
							{character.englishNames.join(', ')}
						</p>
					{/if}
				</div>

				<!-- Summary -->
				{#if character?.summary?.length > 0}
					<div class="prose prose-lg max-w-none">
						{#each character.summary as paragraph}
							<p class="text-gray-700 leading-relaxed text-lg mb-4">{paragraph}</p>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>