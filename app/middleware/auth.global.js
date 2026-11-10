export default defineNuxtRouteMiddleware(to => {
  const t = useCookie('token', { maxAge: 60 * 60 * 24 * 7, path: '/' })
  if (!t.value && to.path !== '/login') return navigateTo('/login')
  if (t.value && to.path === '/login') return navigateTo('/')
})