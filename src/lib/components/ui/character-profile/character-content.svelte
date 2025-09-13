<script>
	import { Card } from "$lib/components/ui/card/index.js";
	import { BookOpen, User, Heart, Star, Trophy, Music } from "lucide-svelte";
	import { cn } from "$lib/utils.js";

	let {
		background,
		appearance,
		personality,
		skills,
		class: className,
		...restProps
	} = $props();

	const sections = $derived(() => {
		const result = [];
		
		if (background?.generic?.length > 0) {
			result.push({
				title: "Background",
				content: background.generic,
				icon: BookOpen
			});
		}
		
		if (background?.conanEdogawa?.length > 0) {
			result.push({
				title: "As Conan Edogawa",
				content: background.conanEdogawa,
				icon: BookOpen
			});
		}
		
		if (appearance?.generic?.length > 0) {
			result.push({
				title: "Appearance",
				content: appearance.generic,
				icon: User
			});
		}
		
		if (personality?.generic?.length > 0) {
			result.push({
				title: "Personality",
				content: personality.generic,
				icon: Heart
			});
		}
		
		return result;
	});

	const skillSections = $derived(() => {
		if (!skills) return [];
		
		return [
			{ title: "Intelligence", content: skills.Intelligence || [], icon: Star },
			{ title: "Athletic Ability", content: skills['Athletic ability'] || [], icon: Trophy },
			{ title: "Language Skills", content: skills.Language || [], icon: BookOpen },
			{ title: "Musical Ability", content: skills.Music || [], icon: Music },
			{ title: "Other Skills", content: skills['Other skills'] || [], icon: Star }
		].filter(section => section.content.length > 0);
	});
</script>

<div class={cn("bg-gray-50 py-16", className)} {...restProps}>
	<div class="container mx-auto px-4">
		<div class="max-w-4xl mx-auto space-y-8">
			<!-- Background, Appearance, Personality -->
			{#each sections as section}
				{@const IconComponent = section.icon}
				<Card class="p-8">
					<h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
						<IconComponent class="w-6 h-6 mr-2 text-blue-600" />
						{section.title}
					</h2>
					
					<div class="prose prose-lg max-w-none">
						{#each section.content as paragraph}
							<p class="text-gray-700 leading-relaxed mb-4">{paragraph}</p>
						{/each}
					</div>
				</Card>
			{/each}

			<!-- Skills Section -->
			{#if skillSections.length > 0}
				<Card class="p-8">
					<h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
						<Star class="w-6 h-6 mr-2 text-blue-600" />
						Skills & Abilities
					</h2>
					
					<div class="grid md:grid-cols-2 gap-6">
						{#each skillSections as skill}
							{@const IconComponent = skill.icon}
							<div class="bg-gray-50 rounded-lg p-4">
								<h3 class="font-semibold text-gray-900 mb-3 flex items-center">
									<IconComponent class="w-5 h-5 mr-2 text-gray-600" />
									{skill.title}
								</h3>
								<div class="space-y-2">
									{#each skill.content as item}
										<p class="text-sm text-gray-700 leading-relaxed">{item}</p>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</Card>
			{/if}
		</div>
	</div>
</div>