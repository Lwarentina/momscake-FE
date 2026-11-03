export default defineNuxtRouteMiddleware(to => {
  const t = useCookie('token')
  if (!t.value && to.path !== '/login') return navigateTo('/login')
  if (t.value && to.path === '/login') return navigateTo('/')
})
