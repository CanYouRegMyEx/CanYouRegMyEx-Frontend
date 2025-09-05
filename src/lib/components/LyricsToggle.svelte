<script>
	let { showRomanji = $bindable(false), lyrics, lyricsRomanji } = $props();
	
	const handleToggle = () => {
		showRomanji = !showRomanji;
	};
	
	const lyricsClass = $derived(showRomanji ? 'font-mono' : 'font-japanese');
	const togglePosition = $derived(showRomanji ? 'translate-x-9' : 'translate-x-0');
	const jpColor = $derived(!showRomanji ? 'text-blue-600' : 'text-gray-500');
	const rmColor = $derived(showRomanji ? 'text-blue-600' : 'text-gray-500');
	const currentLyrics = $derived(showRomanji ? lyricsRomanji : lyrics);
</script>

<div class="text-center mb-8">
	<!-- Toggle Switch -->
	<div class="inline-flex items-center justify-center">
		<div class="relative group">
			<!-- Toggle Button -->
			<button 
				onclick={handleToggle}
				class="relative inline-flex items-center w-20 h-10 bg-gray-200 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors duration-300 hover:bg-gray-300"
				aria-label="Toggle lyrics language"
			>
				<!-- Moving Circle -->
				<span class="absolute inset-1 w-9 h-8 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out {togglePosition}"></span>
				
				<!-- Text Labels -->
				<div class="relative z-10 w-full flex items-center justify-between px-3">
					<span class="text-sm font-bold transition-colors duration-300 {jpColor}">JP</span>
					<span class="text-sm font-bold transition-colors duration-300 {rmColor}">RM</span>
				</div>
			</button>
			
			<!-- Tooltip -->
			<div class="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20">
				<div class="text-center">
					<div class="font-semibold">Lyrics Language</div>
					<div class="text-xs mt-1">
						<span class="{!showRomanji ? 'text-blue-300' : 'text-gray-300'}">JP = Japanese</span>
						<span class="mx-2">|</span>
						<span class="{showRomanji ? 'text-blue-300' : 'text-gray-300'}">RM = Romanji</span>
					</div>
				</div>
				<!-- Tooltip arrow -->
				<div class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
			</div>
		</div>
	</div>
</div>

<!-- Lyrics Content -->
<div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 md:p-12">
	<div class="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line {lyricsClass} text-center">
		{currentLyrics}
	</div>
</div>
