export const useApi = () => {
  const base = useRuntimeConfig().public.apiBase + '/api'
  const token = useCookie('token', { maxAge: 60 * 60 * 24 * 7 })
  const call = (path, opts = {}) => $fetch(base + path, {
    ...opts,
    headers: { Accept: 'application/json', ...(token.value ? { Authorization: `Bearer ${token.value}` } : {}) },
    onResponseError({ response }) { if (response.status === 401 && path !== '/login') { token.value = null; navigateTo('/login') } }
  })
  const data = async (path, opts) => { const r = await call(path, opts); return r?.data ?? r } // handles {data:...} or raw
  return {
    token,
    async login(username, password) { const r = await call('/login', { method: 'POST', body: { username, password } }); token.value = r.token ?? r.data?.token },
    async logout() { try { await call('/logout', { method: 'POST' }) } finally { token.value = null; navigateTo('/login') } },
    me: () => data('/user'),
    customers: () => data('/customers'),
    customer: id => data('/customers/' + id),
    orders: () => data('/pesanan'),
    createOrder: body => call('/pesanan', { method: 'POST', body }),
    setStatus: (id, status) => call(`/pesanan/${id}/status`, { method: 'PATCH', body: { status } }),
    extract: text => data('/extract-chat', { method: 'POST', body: { text } })
  }
}
export const useOrders = () => { const api = useApi(); return useAsyncData('orders', async () => (await api.orders()).map(norm)) }
