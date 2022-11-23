import { writable, type Writable } from 'svelte/store'

export type UseFetchOptions<T> = {
  data?: Writable<T>
  immediate?: boolean
}

export function useFetch<T>(
  _fetch: () => Promise<T>,
  options: UseFetchOptions<T> = { immediate: true }
) {
  const isLoading = writable(true)
  const data = options.data || writable<T>()
  const error = writable()

  const fetch = () =>
    _fetch()
      .then((value) => {
        data.set(value)
      })
      .catch((e) => {
        error.set(e)
        console.error(e)
      })
      .finally(() => {
        isLoading.set(false)
      })

  if (options.immediate) fetch()

  return { isLoading, data, error, fetch }
}
