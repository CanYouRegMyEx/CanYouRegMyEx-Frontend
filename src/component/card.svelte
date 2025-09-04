<script>
	const items = [{ name: 'Obelisk the Tormentor' }, { name: 'Exodia' }];
</script>

{#each items as item}
	<h2 class="text-red-500">{item.name}</h2>
{/each}
