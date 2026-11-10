<script setup>
const route = useRoute()
const on = {
  home: () => route.path === '/',
  riwayat: () => route.path.startsWith('/riwayat') || (route.path.startsWith('/pesanan/') && route.path !== '/pesanan/baru'),
  customer: () => route.path.startsWith('/customer'),
  baru: () => route.path === '/pesanan/baru'
}
</script>
<template>
  <nav class="nav" aria-label="Navigasi utama">
    <NuxtLink to="/" class="nav-item" :class="{ on: on.home() }"><AppIcon name="home" /><span>Home</span></NuxtLink>
    <NuxtLink to="/riwayat" class="nav-item" :class="{ on: on.riwayat() }"><AppIcon name="history" /><span>Riwayat</span></NuxtLink>
    <NuxtLink to="/customer" class="nav-item" :class="{ on: on.customer() }"><AppIcon name="users" /><span>Customer</span></NuxtLink>
    <NuxtLink to="/pesanan/baru" class="nav-item nav-fab" :class="{ on: on.baru() }" aria-label="Pesanan baru">
      <span class="circle"><AppIcon name="plus" :size="22" /></span><span>Pesanan</span>
    </NuxtLink>
  </nav>
</template>
