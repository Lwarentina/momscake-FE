export const rupiah = n => 'Rp ' + Number(n || 0).toLocaleString('id-ID')
export const short = n => (n >= 1000 ? Math.round(n / 1000) + 'k' : String(n))
// Map API pesanan (+ relasi user) -> shape used by the UI. Adjust here if the API differs.
export const norm = o => ({
  id: o.id, nama: o.user?.nama ?? o.nama ?? '-', no: o.user?.no ?? '', alamat: o.user?.alamat ?? '',
  item: o.item, deskripsi: o.deskripsi, status: o.status, total: Number(o.total_harga ?? 0),
  at: o.created_at, upd: o.updated_at
})
export const stats = list => {
  const now = new Date(), prev = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const inM = (d, m) => { const x = new Date(d); return x.getFullYear() === m.getFullYear() && x.getMonth() === m.getMonth() }
  const cur = list.filter(o => inM(o.at, now)), last = list.filter(o => inM(o.at, prev))
  const sum = a => a.reduce((s, o) => s + o.total, 0)
  const t = sum(cur), l = sum(last), cnt = {}
  cur.forEach(o => (cnt[o.item] = (cnt[o.item] || 0) + 1))
  const top = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '-'
  return { t, l, pct: l ? ((t - l) / l) * 100 : 0, top, n: cur.length }
}
