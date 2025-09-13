<script>
	import { cn } from "$lib/utils.js";

	let {
		message = "Loading character data...",
		class: className,
		...restProps
	} = $props();
</script>

<div class={cn("min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50", className)} {...restProps}>
	<div class="text-center">
		<div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
		<p class="text-xl text-gray-600">{message}</p>
	</div>
</div>