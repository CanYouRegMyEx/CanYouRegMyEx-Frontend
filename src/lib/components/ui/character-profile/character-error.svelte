<script>
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { AlertCircle, ArrowLeft } from '@lucide/svelte';

	let {
		title = "Character Not Found",
		message = "Sorry, we couldn't find the character you're looking for.",
		showBack = true,
		class: className,
		...restProps
	} = $props();

	function goBack() {
		if (typeof window !== 'undefined') {
			window.history.back();
		}
	}
</script>

<div class={cn("min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50", className)} {...restProps}>
	<div class="text-center max-w-md mx-auto px-8">
		<AlertCircle class="w-16 h-16 text-red-500 mx-auto mb-4" />
		
		<h1 class="text-2xl font-bold text-gray-800 mb-2">
			{title}
		</h1>
		
		<p class="text-gray-600 mb-6">
			{message}
		</p>

		{#if showBack}
			<Button onclick={goBack} variant="outline" class="flex items-center gap-2">
				<ArrowLeft class="w-4 h-4" />
				Go Back
			</Button>
		{/if}
	</div>
</div>