import { writable, type Writable } from 'svelte/store'

export type UseFetchOptions<T> = {
  data?: Writable<T>
  immediate?: boolean
}

export function useFetch<T>(
  fetch: () => Promise<T>,
  options: UseFetchOptions<T> = {}
) {
  const _options = { immediate: true, ...options }

  const isLoading = writable(true)
  const data = _options.data || writable<T>()
  const error = writable()

  const _fetch = () =>
    fetch()
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

  if (_options.immediate) _fetch()

  return { isLoading, data, error, fetch: _fetch }
}
