<script>
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { cn } from "$lib/utils.js";

	let {
		names = [],
		class: className,
		variant = "secondary",
		...restProps
	} = $props();
</script>

{#if names.length > 0}
<div class={cn("flex flex-wrap gap-2 justify-center md:justify-start", className)} {...restProps}>
	{#each names as name}
		<Badge {variant} class="px-3 py-1 text-sm">
			{name}
		</Badge>
	{/each}
</div>
{/if}