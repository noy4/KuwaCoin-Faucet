import { derived, writable, type Readable } from 'svelte/store'

type Status = 'success' | 'error'
type Notification = {
  id: string
  status: Status
  message: string
}

function createNotificationStore() {
  const _notifications = writable<Notification[]>([])

  function send(args: { status: Status; message: string }) {
    _notifications.update((state) => {
      return [...state, { id: crypto.randomUUID(), ...args }]
    })
  }

  const notifications = derived<Readable<Notification[]>, Notification[]>(
    _notifications,
    ($_notifications, set) => {
      set($_notifications)
      if ($_notifications.length > 0) {
        const timer = setTimeout(() => {
          _notifications.update((state) => state.slice(1))
        }, 3000)
        return () => clearTimeout(timer)
      }
    }
  )

  return {
    subscribe: notifications.subscribe,
    send,
    success: (message: string) => send({ status: 'success', message }),
    error: (message: string) => send({ status: 'error', message }),
  }
}

export const notifications = createNotificationStore()
