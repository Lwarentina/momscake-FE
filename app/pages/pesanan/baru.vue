<script setup>
const api = useApi()
const chat = ref('')
const f = reactive({ nama: '', no: '', alamat: '', item: '', deskripsi: '', total_harga: '' })
const ai = ref(false), busy = ref(false), err = ref('')
async function extract() {
  err.value = ''; busy.value = true
  try { Object.assign(f, await api.extract(chat.value)); ai.value = true }
  catch { err.value = 'Gagal mengekstrak chat. Isi manual atau coba lagi.' }
  finally { busy.value = false }
}
async function save() {
  err.value = ''; busy.value = true
  try { await api.createOrder({ ...f, total_harga: Number(String(f.total_harga).replace(/\D/g, '')) }); await refreshNuxtData('orders'); await navigateTo('/riwayat') }
  catch { err.value = 'Gagal menyimpan pesanan.' }
  finally { busy.value = false }
}
const fields = [['nama', 'Nama customer', 'Siti'], ['no', 'No. telepon', '081234566767'], ['alamat', 'Alamat', 'Alamat'], ['item', 'Item', 'Item'], ['deskripsi', 'Deskripsi', 'Deskripsi'], ['total_harga', 'Total harga', 'Rp']]
</script>
<template>
  <div>
    <div class="top"><NuxtLink to="/" class="back">←</NuxtLink><h2>Pesanan Baru</h2></div>
    <div class="card">
      <label style="margin-top:0">Salin teks chat WhatsApp</label>
      <textarea v-model="chat" class="pill" placeholder="Tempel chat pelanggan di sini..." />
      <div class="row" style="margin-top:10px">
        <button class="btn sm" :disabled="busy || !chat.trim()" @click="extract">✨ Ekstrak AI</button>
      </div>
      <p v-if="ai" class="lbl" style="margin-top:10px">✨ Terisi otomatis. Periksa &amp; koreksi bila perlu.</p>
      <template v-for="[k, l, p] in fields" :key="k"><label>{{ l }}</label><input v-model="f[k]" class="pill" :placeholder="p"></template>
      <p v-if="err" class="err">{{ err }}</p>
      <button class="btn" :disabled="busy || !f.nama || !f.item" style="margin-top:18px" @click="save">Simpan Pesanan</button>
    </div>
  </div>
</template>
