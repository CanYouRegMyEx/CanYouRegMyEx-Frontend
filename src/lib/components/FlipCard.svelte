<script>
	let { frontContent, backContent } = $props();
	
	let isFlipped = $state(false);
	
	const toggleCard = () => {
		isFlipped = !isFlipped;
	};
</script>

<div class="perspective-1000 flex justify-center">
	<div 
		class="relative w-full max-w-2xl h-80 md:h-96 preserve-3d transition-transform duration-700 cursor-pointer {isFlipped ? 'rotate-y-180' : ''}"
		onclick={toggleCard}
		onkeydown={(e) => e.key === 'Enter' && toggleCard()}
		role="button"
		tabindex="0"
	>
		<!-- Front Side -->
		<div class="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900 dark:to-orange-900 rounded-lg border-2 border-red-200 dark:border-red-700">
			<div class="p-8 h-full flex flex-col justify-center">
				<h3 class="text-2xl md:text-3xl font-bold mb-6 text-red-800 dark:text-red-200 text-center">{frontContent.title}</h3>
				<div class="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line font-japanese text-center">
					{frontContent.content}
				</div>
				<p class="text-md text-gray-600 dark:text-gray-400 mt-6 text-center">Click to flip</p>
			</div>
		</div>

		<!-- Back Side -->
		<div class="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg border-2 border-blue-200 dark:border-blue-700">
			<div class="p-8 h-full flex flex-col justify-center">
				<h3 class="text-2xl md:text-3xl font-bold mb-6 text-blue-800 dark:text-blue-200 text-center">{backContent.title}</h3>
				<div class="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line text-center">
					{backContent.content}
				</div>
				<p class="text-md text-gray-600 dark:text-gray-400 mt-6 text-center">Click to flip</p>
			</div>
		</div>
	</div>
</div>

<style>
	/* 3D perspective and transforms for flip card */
	.perspective-1000 {
		perspective: 1000px;
	}
	
	.preserve-3d {
		transform-style: preserve-3d;
	}
	
	.backface-hidden {
		backface-visibility: hidden;
	}
	
	.rotate-y-180 {
		transform: rotateY(180deg);
	}

	.font-japanese {
		font-family: 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif;
	}
</style>
