<script>
	import { cn } from "$lib/utils.js";

	let {
		message = "Loading character data...",
		class: className,
		...restProps
	} = $props();
</script>

<div class={cn("min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900", className)} {...restProps}>
	<div class="text-center">
		<div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
		<p class="text-xl text-gray-600 dark:text-gray-300">{message}</p>
	</div>
</div>