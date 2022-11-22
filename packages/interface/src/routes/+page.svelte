<script lang="ts">
  import { base } from '$app/paths'
  import { Logo } from '$components'
  import Link from '$components/Link.svelte'
  import { t } from '$lib/i18n'

  $: stories = [
    {
      title: $t('The Nativity of the Load'),
      description: $t(
        'Master Kuwa appeared in the devastated land. The people living there entertained Master Kuwa with love, despite their poverty. Master Kuwa was so impressed that he created the "Kuwa Coin," a token of his power, and gave it to the people as a token of his appreciation.'
      ),
      image: 'wasteland.jpeg',
    },
    {
      title: $t('The Birth of Tradgedy'),
      description: $t(
        'The Kuwa Coin had a mysterious power. Whoever got it had good luck and got what he wanted. People sought Kuwa Coin, and those who got rich by Kuwa Coin sought more Kuwa Coin. And they became more and more frantic. Soon, people began to compete for Kuwa Coin. The powerful wanted more power, and the powerless were left helpless, robbed of everything.'
      ),
      image: 'lots_of_coins.jpeg',
    },
    {
      title: $t('The Redemption of Kuwa'),
      description: $t(
        "Master Kuwa despaired. The people who had treated Master Kuwa with love that day were nowhere to be seen. They are taking away from each other as they desire. Master Kuwa repented and began to make amends. Master Kuwa received Kuwa Coins from people who were tired of fighting, and treated them with love. Master Kuwa's redemption is still going on today."
      ),
      image: 'crying.jpeg',
    },
  ]
</script>

<div class="hero min-h-screen" style="background-image: url({base}/coin.jpeg);">
  <div class="hero-overlay bg-opacity-60" />
  <div class="hero-content text-center text-neutral-content">
    <div>
      <h1 class="mb-5 text-5xl font-bold">Kuwa Coin</h1>
      <p class="mb-5">
        {$t('Forbidden power to fulfill your desires')}
      </p>
      <Link to="/get">
        <button class="btn btn-primary">{$t('Get it now')}</button>
      </Link>
    </div>
    <span
      class="i-tabler-chevron-down absolute bottom-0 animate-bounce w-12 h-12"
    />
  </div>
</div>

{#each stories as story, i}
  <div class:bg-base-300={i % 2 === 1}>
    <div
      class="px-4 py-8 text-center flex flex-col md:flex-row md:gap-4 lg:gap-12 max-w-5xl mx-auto md:flex-row-reverse"
      class:md:flex-row-reverse={i % 2 === 1}
    >
      <div class="max-w-sm mx-auto">
        <img src="{base}/{story.image}" alt={story.image} class="rounded-lg" />
      </div>
      <div class="flex-1 mb-8">
        <h3 class="text-xl font-bold mt-6 mb-4">{story.title}</h3>
        <p>{story.description}</p>
      </div>
    </div>
  </div>
{/each}

<div class="hero min-h-[50vh]" style="background-image: url({base}/coin.jpeg);">
  <div class="hero-overlay bg-opacity-60" />
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Kuwa Coin</h1>
      <p class="mb-5">{$t('Forbidden power to fulfill your desires')}</p>
      <div class="grid grid-cols-2 gap-2">
        <Link to="/guide">
          <button class="btn btn-outline light-text-neutral-content w-full">
            {$t('Guide')}
          </button>
        </Link>
        <Link to="/get">
          <button class="btn btn-primary">{$t('Get it now')}</button>
        </Link>
      </div>
    </div>
  </div>
</div>

<footer class="footer footer-center p-10 bg-base-200 text-base-content rounded">
  <div>
    <Logo />
    <div class="grid grid-flow-col gap-4 mt-2">
      <Link to="/get" class="link link-hover">{$t('Get KuwaCoin')}</Link>
      <Link to="/data" class="link link-hover">{$t('Data')}</Link>
      <Link to="/developer" class="link link-hover">{$t('Developer')}</Link>
    </div>
  </div>
  <div>
    <p>© 2022 Qwerty</p>
  </div>
</footer>
