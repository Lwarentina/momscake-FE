<script setup>
const route = useRoute(), api = useApi()
const { data: orders, refresh } = useOrders()
const o = computed(() => (orders.value || []).find(x => String(x.id) === route.params.id))
const busy = ref(false)
async function setStatus(s) { busy.value = true; try { await api.setStatus(o.value.id, s); await refresh() } finally { busy.value = false } }
</script>
<template>
  <div>
    <div class="top"><NuxtLink to="/riwayat" class="back" aria-label="Kembali"><AppIcon name="arrow-left" :size="20" /></NuxtLink><h2>Detail Pesanan</h2></div>
    <div v-if="o" class="card">
      <div class="row"><b style="font-size:18px">{{ o.nama }}</b><span :class="['chip', 's-' + o.status]">{{ o.status }}</span></div>
      <small>{{ o.no }} · {{ o.alamat }}</small>
      <p style="margin-top:12px"><b>{{ o.item }}</b></p><small>{{ o.deskripsi }}</small>
      <div class="big" style="margin:8px 0">{{ rupiah(o.total) }}</div>
      <label>Update status</label>
      <div class="row"><button v-for="s in ['Baru', 'Diproses', 'Selesai']" :key="s" :class="['chip', 's-' + s]" :disabled="busy" style="padding:9px 16px;cursor:pointer;opacity:1" @click="setStatus(s)">{{ s }}</button></div>
      <label style="margin-top:16px">Log pesanan</label>
      <div class="log">Dibuat {{ o.at && new Date(o.at).toLocaleString('id-ID') }}</div>
      <div class="log">Status: {{ o.status }} · {{ o.upd && new Date(o.upd).toLocaleString('id-ID') }}</div>
    </div>
    <small v-else>Pesanan tidak ditemukan.</small>
  </div>
</template>
