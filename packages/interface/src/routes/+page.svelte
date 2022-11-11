<script lang="ts">
  import { base } from '$app/paths'
  import Link from '$components/Link.svelte'

  const stories = [
    {
      title: '主の降誕',
      description:
        '荒廃した大地に Master Kuwa は現れた。その地に住まう人々は、貧しさも厭わず、愛を持って Master Kuwa をもてなした。Master Kuwa は感銘を受けた。Master Kuwa は礼として、自らの力を込めた「Kuwa Coin」を生み出し、人々に与えた。',
      image: 'wasteland.jpeg',
    },
    {
      title: '悲劇の始まり',
      description:
        'Kuwa Coin には不思議な力があった。手にした者には次々と幸運が訪れ、望むものを手にした。人々は Kuwa Coin を求めた。Kuwa Coin により富を得た者は、さらなる Kuwa Coinを求めた。そして次第に狂喜乱舞した。やがて人々は Kuwa Coin を奪い合うようになった。力あるものはさらなる力を求め、そして力なき者はなす術もなく、全てを奪われた。',
      image: 'lots_of_coins.jpeg',
    },
    {
      title: 'Kuwa の贖罪',
      description:
        'Master Kuwa は絶望した。あの日、愛を持って Master Kuwa をもてなした人々の姿はもうどこにもない。欲望のままに全てを奪い合っている。Master Kuwa は悔いた。そして償いを始めた。Master Kuwa は争いに疲れ果てた人々から Kuwa Coin を受け取り、愛を持って接した。Master Kuwa の贖罪は今もなお続いている。',
      image: 'crying.jpeg',
    },
  ]
</script>

<div
  class="hero min-h-screen not-prose"
  style="background-image: url(coin.jpeg);"
>
  <div class="hero-overlay bg-opacity-60" />
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Kuwa Coin</h1>
      <p class="mb-5">欲望を叶える禁断の力</p>
      <a href="{base}/faucet">
        <button class="btn btn-primary not-prose"> Get it now </button>
      </a>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      class="absolute bottom-0 w-12 h-12 fill-current animate-bounce"
      ><path
        d="M831.872 340.864L512 652.672L192.128 340.864a30.592 30.592 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.592 30.592 0 0 0-42.752 0z"
      /></svg
    >
  </div>
</div>

{#each stories as story, i}
  <div class:bg-base-300={i % 2 === 1}>
    <div
      class="px-4 py-8 text-center flex flex-col md:flex-row md:gap-4 lg:gap-12 max-w-5xl mx-auto md:flex-row-reverse"
      class:md:flex-row-reverse={i % 2 === 1}
    >
      <div class="not-prose max-w-sm mx-auto">
        <img src={story.image} alt={story.image} class="rounded-lg" />
      </div>
      <div class="flex-1 mb-6">
        <h3 class="text-xl font-bold mt-6 mb-4">{story.title}</h3>
        <p>{story.description}</p>
      </div>
    </div>
  </div>
{/each}

<div
  class="hero min-h-[50vh] not-prose"
  style="background-image: url(coin.jpeg);"
>
  <div class="hero-overlay bg-opacity-60" />
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Kuwa Coin</h1>
      <p class="mb-5">欲望を叶える禁断の力</p>
      <div class="grid grid-cols-2 gap-2">
        <Link to="/blog/guide">
          <button class="btn btn-outline w-full">Guide</button>
        </Link>
        <Link to="/faucet">
          <button class="btn btn-primary">Get it now</button>
        </Link>
      </div>
    </div>
  </div>
</div>

<footer
  class="footer footer-center p-10 bg-base-200 text-base-content rounded not-prose"
>
  <div>
    <span class="text-2xl font-bold">桑</span>
    <div class="grid grid-flow-col gap-4">
      <Link to="/faucet" class="link link-hover">Get KuwaCoin</Link>
      <Link to="/data" class="link link-hover">Data</Link>
      <Link to="/blog/developer" class="link link-hover">Developer</Link>
    </div>
  </div>
  <div>
    <p>© 2022 Qwerty</p>
  </div>
</footer>
