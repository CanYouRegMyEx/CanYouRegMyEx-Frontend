<script>
	import { cn } from "$lib/utils.js";

	let {
		title,
		background = "",
		class: className,
		children,
		icon,
		...restProps
	} = $props();
</script>

<section 
	class={cn("min-h-screen flex items-center justify-center", className)}
	style={background ? `background: ${background}` : ""}
	{...restProps}
>
	<div class="w-full">
		<div class="min-h-screen flex items-center justify-center p-8">
			<div class="w-full max-w-6xl">
				<div class="flex items-center justify-center mb-12">
					{#if icon}
						{@const IconComponent = icon}
						<IconComponent class="w-12 h-12 text-blue-600 mr-4" />
					{/if}
					<h2 class="text-4xl md:text-5xl font-bold" style="color: #325FEC;">
						{title}
					</h2>
				</div>
				
				{@render children?.()}
			</div>
		</div>
	</div>
</section>