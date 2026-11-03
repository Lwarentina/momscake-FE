<script setup>
const { data: orders, pending } = useOrders()
const q = ref('')
const list = computed(() => (orders.value || []).filter(o => `${o.nama} ${o.item} ${o.deskripsi}`.toLowerCase().includes(q.value.toLowerCase())))
</script>
<template>
  <div>
    <div class="top"><h2>Riwayat</h2></div>
    <input v-model="q" class="pill" placeholder="🔍 Search by deskripsi / nama" style="margin-bottom:14px;border:0">
    <small v-if="pending">Memuat...</small>
    <OrderCard v-for="o in list" :key="o.id" :o="o" />
    <small v-if="!pending && !list.length">Tidak ada pesanan.</small>
  </div>
</template>
