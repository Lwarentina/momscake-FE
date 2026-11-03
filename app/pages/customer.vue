<script setup>
const api = useApi()
const { data: list, pending } = await useAsyncData('customers', () => api.customers())
</script>
<template>
  <div>
    <div class="top"><h2>Customer</h2></div>
    <small v-if="pending">Memuat...</small>
    <div v-for="c in list" :key="c.id" class="card">
      <div class="row"><b>{{ c.nama }}</b><span v-if="c.pesanan_count ?? c.orders_count" class="chip s-Diproses">{{ c.pesanan_count ?? c.orders_count }} pesanan</span></div>
      <small>{{ c.no }}<br>{{ c.alamat }}</small>
    </div>
  </div>
</template>
