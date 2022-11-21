import { languages } from '$lib/i18n'
import { error } from '@sveltejs/kit'
import { marked } from 'marked'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
  const enMarkdownFiles = import.meta.glob('./*.md', { as: 'raw' })
  const otherLangMarkdownFiles = import.meta.glob('./*/*.md', { as: 'raw' })
  const enFile = Object.entries(enMarkdownFiles).find(([path]) =>
    path.match(params.slug)
  )

  if (!enFile) throw error(404, { message: 'Not found' })

  const otherLangFiles = Object.entries(otherLangMarkdownFiles).reduce<
    Record<string, () => Promise<string>>
  >((prev, [path, resolver]) => {
    if (path.match(params.slug)) {
      const [, langKey] = path.split('/')
      const hasLang = !!languages.find((l) => l.key === langKey)
      if (hasLang) {
        prev[langKey] = resolver
      }
    }
    return prev
  }, {})

  const files: Record<string, () => Promise<string>> = {
    en: enFile[1],
    ...otherLangFiles,
  }
  const contents = await Object.keys(files).reduce<
    Promise<Record<string, string>>
  >(async (prev, key) => {
    const raw = await files[key]()
    return {
      ...(await prev),
      [key]: marked.parse(raw),
    }
  }, Promise.resolve({}))

  return {
    contents,
  }
}
