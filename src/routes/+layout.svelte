<script>
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';

	let { children } = $props();

	// Audio control
	import { writable } from 'svelte/store';
	let audioEl;
	const STORAGE_KEY = 'conan-audio-muted';

	// use a store so updates properly trigger reactive updates in Svelte 5
	const isMuted = writable(true);
	const audioAvailable = writable(true);

	// volume store (0.0 - 1.0)
	const VOLUME_KEY = 'conan-audio-volume';
	const volume = writable(0.5);

	onMount(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			// default to muted (autoplay policies allow muted autoplay)
			isMuted.set(stored === null ? true : stored === 'true');
		} catch (e) {
			isMuted.set(true);
		}

		// subscribe to store changes to keep audio element in sync
		const unsub = isMuted.subscribe((v) => {
			if (audioEl) {
				audioEl.muted = v;
				if (!v) {
					audioEl.play().catch(() => {
						// play may fail until user gesture
					});
				}
			}
		});

		// subscribe to volume changes
		const unsubVol = volume.subscribe((v) => {
			if (audioEl) {
				audioEl.volume = Math.max(0, Math.min(1, Number(v)));
			}
		});

		// handle audio load errors (e.g., 404)
		function onAudioError() {
			console.warn('Background audio failed to load at /conan-bg.mp3 - hiding audio controls.');
			audioAvailable.set(false);
		}

		function onAudioLoaded() {
			audioAvailable.set(true);
		}

		audioEl?.addEventListener?.('error', onAudioError);
		audioEl?.addEventListener?.('canplay', onAudioLoaded);

		// try to load stored volume
		try {
			const storedVol = localStorage.getItem(VOLUME_KEY);
			if (storedVol !== null) volume.set(Number(storedVol));
		} catch (e) {}

		return () => {
			unsub();
			unsubVol();
			audioEl?.removeEventListener?.('error', onAudioError);
			audioEl?.removeEventListener?.('canplay', onAudioLoaded);
		};
	});

	function toggleMute() {
		isMuted.update((v) => {
			const next = !v;
			try {
				localStorage.setItem(STORAGE_KEY, String(next));
			} catch (e) {}
			return next;
		});
	}

	function setVolume(v) {
		const clamped = Math.max(0, Math.min(1, Number(v)));
		volume.set(clamped);
		try {
			localStorage.setItem(VOLUME_KEY, String(clamped));
		} catch (e) {}
	}

	function changeVolume(delta) {
		volume.update((v) => {
			const next = Math.max(0, Math.min(1, v + delta));
			try {
				localStorage.setItem(VOLUME_KEY, String(next));
			} catch (e) {}
			return next;
		});
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<!-- Background audio: place your Conan audio file at /static/conan-bg.mp3 -->
<audio
	bind:this={audioEl}
	muted={$isMuted}
	src="/conan-bg.mp3"
	loop
	autoplay
	playsinline
	preload="auto"
	aria-hidden="true"
></audio>

<!-- Mute/unmute toggle (persistent) -->
{#if $audioAvailable}
	<div class="audio-controls" aria-label="Background music controls">
		<button
			onclick={toggleMute}
			aria-pressed={!$isMuted}
			aria-label={$isMuted ? 'Unmute background music' : 'Mute background music'}
			title={$isMuted ? 'Unmute background music' : 'Mute background music'}
			style="padding:8px;border-radius:999px;border:none;background:transparent;cursor:pointer;font-size:18px;"
		>
			{#if $isMuted}
				🔇
			{:else}
				🔊
			{/if}
		</button>


		<!-- volume controls (collapsed until hover/focus) -->
		<div class="vol-group" aria-hidden={!$audioAvailable}>
			<button class="vol-btn" onclick={() => changeVolume(-0.1)} aria-label="Decrease volume" title="-">−</button>

			<input
				class="vol-slider"
				type="range"
				min="0"
				max="100"
				step="1"
				value={$volume * 100}
				oninput={(e) => setVolume(e.target.value / 100)}
				aria-label="Background music volume"
			/>

			<button class="vol-btn" onclick={() => changeVolume(0.1)} aria-label="Increase volume" title="+">+</button>
		</div>
	</div>
{/if}

<style>
.audio-controls {
	position: fixed;
	right: 16px;
	bottom: 16px;
	z-index: 1000;
	padding: 6px 8px;
	border-radius: 12px;
	border: none;
	background: rgba(255,255,255,0.92);
	box-shadow: 0 6px 18px rgba(0,0,0,0.12);
	display: flex;
	align-items: center;
	gap: 8px;
}

/* hide slider and vol buttons by default, show on hover or focus-within */

/* collapse vol-group by default to save space */
.vol-group {
	display: flex;
	align-items: center;
	gap: 8px;
	overflow: hidden;
	max-width: 0; /* collapsed */
	transition: max-width 220ms cubic-bezier(.2,.9,.2,1), opacity 160ms ease;
	opacity: 0;
}

/* reveal on hover or focus-within */
.audio-controls:hover .vol-group,
.audio-controls:focus-within .vol-group {
	max-width: 260px; /* enough to show slider and buttons */
	opacity: 1;
}

.vol-slider {
	width: 120px;
}

.audio-controls button[onclick] { /* smaller button style */
	padding: 6px;
	border-radius: 6px;
	border: none;
	background: #f0f0f0;
	cursor: pointer;
}

.audio-controls button[aria-pressed] {
	padding: 8px;
	border-radius: 999px;
	border: none;
	background: transparent;
	cursor: pointer;
	font-size: 18px;
}
</style>
 
