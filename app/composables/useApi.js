export const useApi = () => {
  const base = useRuntimeConfig().public.apiBase + '/api'
  const token = useCookie('token', { maxAge: 60 * 60 * 24 * 7 })

  const call = (path, opts = {}) => $fetch(base + path, {
    ...opts,
    headers: {
      Accept: 'application/json',
      ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}),
    },
    onResponseError({ response }) {
      if (response.status === 401 && path !== '/login') {
        token.value = null
        navigateTo('/login')
      }
    },
  })

  const data = async (path, opts) => {
    const r = await call(path, opts)
    return r?.data ?? r // handles { data: ... } envelope or raw response
  }

  return {
    token,
    async login(username, password) {
      const r = await call('/login', { method: 'POST', body: { username, password } })
      token.value = r.token ?? r.data?.token
      // Let Nuxt flush the cookie to document.cookie before any navigation
      await new Promise(resolve => setTimeout(resolve, 0))
    },
    async logout() {
      try {
        await call('/logout', { method: 'POST' })
      } finally {
        token.value = null
        navigateTo('/login')
      }
    },
    me: () => data('/user'),
    customers: () => data('/customers'),
    customer: (id) => data('/customers/' + id),
    orders: () => data('/pesanan'),
    createOrder: (body) => call('/pesanan', { method: 'POST', body }),
    setStatus: (id, status) => call(`/pesanan/${id}/status`, { method: 'PATCH', body: { status } }),
    // FIXED: backend expects { raw_text }, not { text }
    extract: (text) => data('/extract-chat', { method: 'POST', body: { raw_text: text } }),
  }
}