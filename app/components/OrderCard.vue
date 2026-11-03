<script setup>defineProps({ o: Object })</script>
<template>
  <NuxtLink :to="`/pesanan/${o.id}`" class="card">
    <div class="row"><b>{{ o.nama }}</b><span :class="['chip', 's-' + o.status]">{{ o.status }}</span></div>
    <small>{{ o.item }} · {{ rupiah(o.total) }}</small>
  </NuxtLink>
</template>
