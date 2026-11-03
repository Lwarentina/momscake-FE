export const api = $fetch.create({
  baseURL: 'http://127.0.0.1:8000/api',
  onRequest({ options }) {
    const token = localStorage.getItem('token')
    if (token) options.headers.set('Authorization', `Bearer ${token}`)
  },
})
