<script lang="ts">
	let { size = 'md' }: { size?: 'sm' | 'md' } = $props();
</script>

<a
	href="/"
	class="group inline-flex items-baseline gap-1.5 font-display leading-none tracking-tight no-underline"
	class:text-xl={size === 'sm'}
	class:text-2xl={size === 'md'}
	aria-label="Ayomikun — home"
>
	<span class="font-bold">AYO</span>
	<span
		class="inline-block size-2 translate-y-[-1px] bg-accent transition-transform duration-300 group-hover:rotate-45"
		aria-hidden="true"
	></span>
</a>
