<script>
	import { Music, Clock, Hash, Languages, Globe } from '@lucide/svelte';
	
	let { trackList } = $props();
</script>

<div class="bg-white/80 rounded-lg shadow-lg overflow-hidden">
	<table class="w-full">
		<!-- Table Header -->
		<thead class="bg-gray-100">
			<tr>
				<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-16">
					<div class="flex items-center">
						<Hash class="w-4 h-4 mr-1" />
					</div>
				</th>
				<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">
					<div class="flex items-center">
						<Music class="w-4 h-4 mr-1" />
						Song Title
					</div>
				</th>
				<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">
					<div class="flex items-center">
						<Languages class="w-4 h-4 mr-1" />
						Romanji
					</div>
				</th>
				<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700">
					<div class="flex items-center">
						<Globe class="w-4 h-4 mr-1" />
						Translation
					</div>
				</th>
				<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 w-20">
					<div class="flex items-center">
						<Clock class="w-4 h-4 mr-1" />
						Length
					</div>
				</th>
			</tr>
		</thead>
		<!-- Table Body -->
		<tbody class="divide-y divide-gray-200">
			{#each trackList as track}
				<tr class="hover:bg-gray-50 transition-colors duration-200">
					<td class="px-4 py-4 text-sm text-gray-900">{track.number}</td>
					<td class="px-4 py-4 text-sm text-gray-900 font-japanese">{track.titleJapanese}</td>
					<td class="px-4 py-4 text-sm text-gray-700 font-mono">{track.titleRomanji}</td>
					<td class="px-4 py-4 text-sm text-gray-700">{track.translation}</td>
					<td class="px-4 py-4 text-sm text-gray-700">{track.length}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.font-japanese {
		font-family: 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif;
	}

	.font-mono {
		font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Cascadia Code', monospace;
	}
</style>
