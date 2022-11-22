<script lang="ts">
  import { BottomNav, Header, Toast } from '$components'
  import '@kidonng/daisyui/index.css'
  import '@unocss/reset/tailwind.css'
  import './global.css'
</script>

<svelte:head>
  <title>Kuwa Coin</title>
  <meta name="description" content="欲望を叶える禁断の力" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@kuwappi_" />
  <meta property="og:url" content="https://noy4.github.io/KuwaCoin-Faucet/" />
  <meta property="og:title" content="Kuwa Coin" />
  <meta property="og:description" content="欲望を叶える禁断の力" />
  <meta
    property="og:image"
    content="https://noy4.github.io/KuwaCoin-Faucet/kuwacoin_logo.png"
  />
</svelte:head>

<Header />
<Toast />
<slot />
<BottomNav />

<style uno:preflights uno:safelist global></style>
