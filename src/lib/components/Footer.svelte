<script lang="ts">
	const socials = [
		{ href: 'https://github.com/', label: 'GitHub' },
		{ href: 'https://x.com/', label: 'Twitter' },
		{ href: 'https://www.linkedin.com/', label: 'LinkedIn' },
		{ href: 'mailto:ellumainc@gmail.com', label: 'Email' }
	];
	const year = new Date().getFullYear();
</script>

<footer class="border-border mt-32 border-t">
	<div
		class="text-ink-muted mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 font-mono text-xs tracking-widest uppercase sm:flex-row sm:items-center sm:justify-between sm:px-10"
	>
		<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
			<span class="text-ink-dim">© {year}</span>
			<span>Ayomikun</span>
		</div>

		<nav aria-label="Social">
			<ul class="flex flex-wrap items-center gap-x-4 gap-y-2">
				{#each socials as link (link.label)}
					<li>
						<a
							href={link.href}
							target={link.href.startsWith('http') ? '_blank' : undefined}
							rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
							class="hover:text-accent transition-colors"
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</footer>
