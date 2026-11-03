<script setup>
const { data: orders, pending } = useOrders()
const q = ref('')
const list = computed(() => (orders.value || []).filter(o => `${o.nama} ${o.item} ${o.deskripsi}`.toLowerCase().includes(q.value.toLowerCase())))
</script>
<template>
  <div>
    <div class="top"><h2>Riwayat</h2></div>
    <div class="search">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
      <input v-model="q" class="pill" placeholder="Search by deskripsi / nama">
    </div>
    <small v-if="pending">Memuat...</small>
    <OrderCard v-for="o in list" :key="o.id" :o="o" />
    <small v-if="!pending && !list.length">Tidak ada pesanan.</small>
  </div>
</template>
<style scoped>
.search{position:relative;margin-bottom:14px}
.search-icon{position:absolute;top:50%;left:18px;width:18px;height:18px;transform:translateY(-50%);color:var(--muted);pointer-events:none}
.search .pill{border:0;padding-left:44px}
</style>
