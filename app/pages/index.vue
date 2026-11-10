<script setup>
const api = useApi()
const { data: me } = await useAsyncData('me', () => api.me())
const { data: orders } = useOrders()
const s = computed(() => stats(orders.value || []))
</script>
<template>
  <div>
    <div class="top">
      <div style="flex:1;font-size:13px">Hello!<br><b style="font-size:15px">{{ me?.username || me?.name || 'Admin' }}</b></div>
      <button class="chip s-Baru ic" @click="api.logout()"><AppIcon name="log-out" :size="14" />Logout</button>
    </div>
    <div class="sec">Rekap penjualan</div>
    <div class="card row"><div><small>Statistics</small><br><b>Total revenue<br>this month</b></div>
      <div style="text-align:right"><div class="big">{{ short(s.t) }}</div><div :class="s.pct >= 0 ? 'up' : 'down'"><AppIcon :name="s.pct >= 0 ? 'trending-up' : 'trending-down'" :size="14" />{{ s.pct >= 0 ? '+' : '' }}{{ s.pct.toFixed(2) }}%</div></div></div>
    <div class="card row"><div><small>Statistics</small><br><b>Total revenue<br>last month</b></div><div class="big">{{ short(s.l) }}</div></div>
    <div class="grid">
      <div class="card"><b>Top selling product</b><div class="pink" style="margin-top:8px">{{ s.top }}</div></div>
      <div class="card"><b>Total order this month</b><div class="pink big" style="font-size:38px">{{ s.n }}</div></div>
    </div>
    <div class="sec">Pesanan terbaru</div>
    <OrderCard v-for="o in (orders || []).slice(0, 3)" :key="o.id" :o="o" />
  </div>
</template>
