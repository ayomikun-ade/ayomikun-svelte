<script lang="ts">
	import { socials, type Social } from '$lib/data/socials';

	type Props = {
		variant?: 'icon' | 'label';
		class?: string;
	};
	let { variant = 'icon', class: klass = '' }: Props = $props();

	function isExternal(s: Social) {
		return s.href.startsWith('http');
	}
</script>

<ul class="flex flex-wrap items-center gap-1 {klass}">
	{#each socials as link (link.key)}
		<li>
			<a
				href={link.href}
				target={isExternal(link) ? '_blank' : undefined}
				rel={isExternal(link) ? 'noopener noreferrer' : undefined}
				aria-label={link.label}
				class:icon-link={variant === 'icon'}
				class:label-link={variant === 'label'}
				class="group inline-flex items-center gap-2 transition-colors hover:text-accent"
			>
				{#if variant === 'icon'}
					<span
						class="inline-flex size-9 items-center justify-center border-2 border-border transition-colors group-hover:border-accent"
					>
						{#if link.key === 'github'}
							<svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
								<path
									d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1-.02-1.96-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.77 1.06.77 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"
								/>
							</svg>
						{:else if link.key === 'twitter'}
							<svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
								<path
									d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
								/>
							</svg>
						{:else if link.key === 'linkedin'}
							<svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
								<path
									d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"
								/>
							</svg>
						{:else if link.key === 'email'}
							<svg
								viewBox="0 0 24 24"
								class="size-4"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="square"
								aria-hidden="true"
							>
								<rect x="3" y="5" width="18" height="14" />
								<path d="M3 7l9 6 9-6" />
							</svg>
						{/if}
					</span>
				{:else}
					<span class="font-mono text-xs tracking-widest uppercase">{link.label}</span>
				{/if}
			</a>
		</li>
	{/each}
</ul>
