<script lang="ts">
  import { BottomNav, Header, Toast } from '$components'
  import '@kidonng/daisyui/index.css'
  import '@unocss/reset/tailwind.css'
  import './global.css'
</script>

<svelte:head>
  <title>Kuwa Coin</title>
  <meta name="description" content="欲望を叶える禁断の力" />
</svelte:head>

<Header />
<Toast />
<slot />
<BottomNav />

<style uno:preflights uno:safelist global></style>
