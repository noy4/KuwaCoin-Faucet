<script lang="ts">
  import '@unocss/reset/tailwind.css'
  import '@kidonng/daisyui/index.css'
  import { Header, Link } from '$components'
  import { base } from '$app/paths'
  import { page } from '$app/stores'

  const bottomNavItems = [
    { icon: 'home', label: 'Home', to: '/' },
    { icon: 'coin', label: 'Coin', to: '/faucet' },
    { icon: 'book', label: 'Guide', to: '/guide' },
  ]

  $: isHome = $page.url.pathname === (base || '/')
</script>

<svelte:head>
  <title>Kuwa Coin</title>
  <meta name="description" content="欲望を叶える禁断の力" />
</svelte:head>

<Header />

<slot />

{#if !isHome}
  <nav class="btm-nav border-t border-t-base-200 max-w-3xl mx-auto">
    {#each bottomNavItems as item}
      <Link to={item.to} class={item.to === $page.url.pathname ? 'active' : ''}>
        <span class="i-tabler-{item.icon} text-xl" />
        <span class="btm-nav-label text-2.5">{item.label}</span>
      </Link>
    {/each}
  </nav>
  <div class="h-16" />
{/if}

<style uno:preflights uno:safelist global>
  :root {
    @apply bg-base-200;
  }
  [data-theme='light'] .light-text-neutral-content {
    @apply text-neutral-content;
  }
  .table th:first-child {
    @apply static;
  }
</style>
