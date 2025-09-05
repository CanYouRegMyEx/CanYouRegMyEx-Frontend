<script>
	let { children, ...props } = $props();
</script>

<button 
	class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
	{...props}
>
	{@render children?.()}
</button>
