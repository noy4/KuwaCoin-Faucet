import type { PageLoad } from './$types'
import { marked } from 'marked'

export const load: PageLoad = async () => {
  const markdownFiles = import.meta.glob('./guide.md', { as: 'raw' })

  const allPosts = await Promise.all(
    Object.entries(markdownFiles).map(async ([path, resolver]) => {
      const resolvedPost = await resolver()
      return resolvedPost
    })
  )

  return {
    content: marked.parse(allPosts[0]),
  }
}
