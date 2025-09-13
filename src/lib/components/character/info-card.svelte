<script>
	import { Card } from "$lib/components/ui/card/index.js";
	import { cn } from "$lib/utils.js";

	let {
		title,
		items = [],
		icon,
		variant = "default",
		class: className,
		...restProps
	} = $props();
</script>

<Card class={cn("bg-white/80 backdrop-blur-sm shadow-sm", className)} {...restProps}>
	<div class="p-6">
		{#if title}
			<h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
				{#if icon}
					{@const IconComponent = icon}
					<IconComponent class="w-5 h-5 mr-2" />
				{/if}
				{title}
			</h3>
		{/if}
		
		<div class="space-y-3">
			{#each items as item}
				{#if typeof item === 'string'}
					<p class="text-gray-700 leading-relaxed">{item}</p>
				{:else if item.label && item.value}
					<div class="flex items-start space-x-3">
						<div>
							<h4 class="font-semibold text-gray-800">{item.label}</h4>
							{#if Array.isArray(item.value)}
								{#each item.value as value}
									<p class="text-gray-600">{value}</p>
								{/each}
							{:else}
								<p class="text-gray-600">{item.value}</p>
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</Card>