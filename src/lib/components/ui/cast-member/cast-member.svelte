<script>
	import { User, Badge } from '@lucide/svelte';
	
	let { member, index } = $props();
	
	// Gradient classes for each cast member
	const gradients = [
		'bg-gradient-to-br from-purple-400 via-purple-600 to-blue-600',
		'bg-gradient-to-br from-pink-400 via-pink-600 to-red-600',
		'bg-gradient-to-br from-blue-400 via-blue-600 to-cyan-600',
		'bg-gradient-to-br from-green-400 via-green-600 to-teal-600',
		'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500',
		'bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500'
	];
	
	const avatarGradient = $derived(gradients[index % gradients.length]);
	const initial = $derived(member.name.charAt(0).toUpperCase());
</script>

<div class="text-center group">
	<!-- Avatar with gradient background - shadcn style -->
	<div class="relative w-24 h-24 md:w-32 md:h-32 {avatarGradient} rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:scale-105 transition-transform duration-300 border-2 border-white">
		<span class="text-2xl md:text-3xl font-bold text-white">
			{initial}
		</span>
		<!-- Role badge -->
		<div class="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
			<Badge class="w-4 h-4 text-purple-600" />
		</div>
	</div>
	
	<!-- Cast member info card -->
	<div class="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-gray-200">
		<div class="flex items-center justify-center mb-1">
			<User class="w-4 h-4 text-gray-600 mr-1" />
			<h3 class="text-lg font-bold text-gray-800">{member.name}</h3>
		</div>
		<p class="text-gray-600 text-sm">{member.character}</p>
	</div>
</div>
