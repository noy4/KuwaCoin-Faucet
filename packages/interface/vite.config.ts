import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { presetUno, transformerDirectives, presetTypography } from 'unocss'
import presetDaisy from 'unocss-preset-daisy'

const config: UserConfig = {
  plugins: [
    UnoCSS({
      mode: 'svelte-scoped',
      transformers: [transformerDirectives()],
      presets: [presetUno(), presetDaisy(), presetTypography()],
    }),
    sveltekit(),
  ],
}

export default config
