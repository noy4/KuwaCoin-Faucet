import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { presetUno, transformerDirectives } from 'unocss'
import presetDaisy from 'unocss-preset-daisy'

const config: UserConfig = {
  plugins: [
    UnoCSS({
      transformers: [transformerDirectives()],
      presets: [presetUno(), presetDaisy()],
    }),
    sveltekit(),
  ],
}

export default config
