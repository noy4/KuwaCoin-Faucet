import { error } from '@sveltejs/kit'
import { marked } from 'marked'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ params }) => {
  const markdownFiles = import.meta.glob('./*.md', { as: 'raw' })
  const file = Object.entries(markdownFiles).find(([path]) =>
    path.match(params.slug)
  )
  if (!file) throw error(404, { message: 'Not found' })
  const rawContent = await file[1]()

  return {
    content: marked.parse(rawContent),
  }
}
