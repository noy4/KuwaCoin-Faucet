<script lang="ts">
  import '@unocss/reset/tailwind.css'
  import '@kidonng/daisyui/index.css'
  import Header from '$components/Header.svelte'
  import { base } from '$app/paths'
  import { page } from '$app/stores'

  $: isHome = $page.url.pathname === (base || '/')
</script>

<svelte:head>
  <title>KuwaCoin</title>
  <meta name="description" content="欲望を叶える禁断の力" />
</svelte:head>

{#if isHome}
  <Header class="absolute bg-transparent shadow-none" />
{:else}
  <Header />
{/if}

<slot />

<style uno:preflights uno:safelist global>
  :root {
    @apply bg-base-200;
  }
  [data-theme='light'] .light-text-neutral-content {
    @apply text-neutral-content;
  }
</style>
