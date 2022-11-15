import { derived, writable, type Readable } from 'svelte/store'

type Notification = {
  id: string
  message: string
}

function createNotificationStore() {
  const _notifications = writable<Notification[]>([])

  function send(message: string) {
    _notifications.update((state) => {
      return [...state, { id: crypto.randomUUID(), message }]
    })
  }

  const notifications = derived<Readable<Notification[]>, Notification[]>(
    _notifications,
    ($_notifications, set) => {
      set($_notifications)
      if ($_notifications.length > 0) {
        const timer = setTimeout(() => {
          _notifications.update((state) => state.slice(1))
        }, 2000)
        return () => clearTimeout(timer)
      }
    }
  )

  return {
    subscribe: notifications.subscribe,
    send,
  }
}

export const notifications = createNotificationStore()
