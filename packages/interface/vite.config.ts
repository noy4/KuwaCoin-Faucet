import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import {
  presetUno,
  transformerDirectives,
  presetTypography,
  presetIcons,
} from 'unocss'
import presetDaisy from 'unocss-preset-daisy'

const config: UserConfig = {
  plugins: [
    UnoCSS({
      mode: 'svelte-scoped',
      transformers: [transformerDirectives()],
      presets: [presetUno(), presetDaisy(), presetTypography(), presetIcons()],
      safelist: [
        ...'bg-base-300 hidden'.split(' '),
        ...[...Array(10)].map((_, i) => `mt-${i}`),
      ],
    }),
    sveltekit(),
  ],
}

export default config
