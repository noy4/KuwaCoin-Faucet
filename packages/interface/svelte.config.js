import adapter from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess'

const isProd = process.env.NODE_ENV === 'production'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/components',
      $lib: 'src/lib',
    },
    prerender: {
      entries: ['*', '/guide', '/developer'],
    },
    paths: {
      base: isProd ? '/KuwaCoin-Faucet' : '',
    },
  },
}

export default config
