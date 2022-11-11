<script lang="ts">
  import '@unocss/reset/tailwind.css'
  import '@kidonng/daisyui/index.css'
  import Header from '$components/Header.svelte'
  import { base } from '$app/paths'
  import { page } from '$app/stores'
</script>

{#if $page.url.pathname !== (base || '/')}
  <Header />
{/if}

<svelte:head>
  <title>KuwaCoin</title>
  <meta name="description" content="欲望を叶える禁断の力" />
</svelte:head>

<slot />

<style uno:preflights uno:safelist global>
  :root {
    @apply bg-base-200;
  }
</style>
