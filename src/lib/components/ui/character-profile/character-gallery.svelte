<script>
	import { Card } from "$lib/components/ui/card/index.js";
	import { Image as ImageIcon } from "lucide-svelte";
	import { cn } from "$lib/utils.js";

	let {
		images = [],
		characterName = "",
		class: className,
		...restProps
	} = $props();
</script>

{#if images.length > 0}
<div class={cn("bg-white py-8 border-t", className)} {...restProps}>
	<div class="container mx-auto px-4 max-w-6xl">
		<h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
			<ImageIcon class="w-6 h-6 mr-2 text-blue-600" />
			Gallery
		</h2>
		
		<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
			{#each images as imageUrl, index}
				<div class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
					<img 
						src={imageUrl}
						alt="{characterName} - Image {index + 1}"
						class="w-full aspect-square object-cover"
						onerror={(e) => {
							e.target.parentElement.style.display = 'none';
						}}
					/>
				</div>
			{/each}
		</div>
	</div>
</div>
{/if}