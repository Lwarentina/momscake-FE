<script setup>
definePageMeta({ layout: false })
const api = useApi()
const f = reactive({ username: '', password: '' })
const err = ref(''), busy = ref(false)
const debugAccess = useCookie('debug-access', { path: '/' })
const showDebugAccess = useRuntimeConfig().public.debugAuthBypass
async function submit() {
  err.value = ''; busy.value = true
  try { await api.login(f.username, f.password); await navigateTo('/') }
  catch { err.value = 'Username atau password salah.' }
  finally { busy.value = false }
}
async function enterDebugMode() {
  debugAccess.value = 'enabled'
  await navigateTo('/')
}
</script>
<template>
  <div class="app" style="padding:0;display:flex;flex-direction:column;background:linear-gradient(var(--c4),var(--c2))">
    <div style="height:300px;padding:calc(env(safe-area-inset-top) + 32px) 24px;color:#fff;font-size:34px;font-weight:700;line-height:1.2">Log-In<br>SIMPUL</div>
    <form @submit.prevent="submit" style="flex:1;background:#fff;border-radius:30px 30px 0 0;padding:28px 24px">
      <h2 style="font-weight:700">Welcome Back!</h2>
      <p style="margin:8px 0 24px;font-size:14px">Please enter your username and password to login.</p>
      <input v-model="f.username" class="pill" placeholder="Username" autocomplete="username" required>
      <input v-model="f.password" class="pill" type="password" placeholder="Password" autocomplete="current-password" required style="margin-top:14px">
      <p v-if="err" class="err">{{ err }}</p>
      <button class="btn" :disabled="busy" style="width:160px;margin:48px auto 0">{{ busy ? '...' : 'Login' }}</button>
      <button v-if="showDebugAccess" class="btn" type="button" style="width:100%;margin-top:16px" @click="enterDebugMode">Debug: View Pages Without Login</button>
    </form>
  </div>
</template>
