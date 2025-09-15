<script>
	import { cn } from "$lib/utils.js";

	let {
		images = [],
		characterName = "",
		class: className,
		columns = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
		...restProps
	} = $props();
</script>

{#if images.length > 0}
<div class={cn("grid gap-4", columns, className)} {...restProps}>
	{#each images as imageUrl, index}
		<div class="aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group">
			<img 
				src={imageUrl}
				alt="{characterName} - Image {index + 1}"
				class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				onerror={(e) => {
					e.target.parentElement.style.display = 'none';
				}}
			/>
		</div>
	{/each}
</div>
{/if}