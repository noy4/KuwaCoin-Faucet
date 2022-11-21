<script lang="ts">
  import { base } from '$app/paths'
  import { page } from '$app/stores'
  import { Link } from '$components'

  const bottomNavItems = [
    { icon: 'coin', label: 'Get', to: '/get' },
    { icon: 'send', label: 'Send', to: '/send' },
    { icon: 'book', label: 'Guide', to: '/guide' },
  ]

  $: isHome = $page.url.pathname === (base || '/')
</script>

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
