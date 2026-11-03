import { useApi } from './useApi'
import { norm } from '../utils/format'

export const useOrders = () => {
  const api = useApi()
  // useAsyncData sudah return reactive data/pending/refresh — tidak perlu await di sini.
  const { data, pending, refresh } = useAsyncData('orders', () => api.orders())

  return {
    // DOM/UI dapat data yang sudah dinormalisasi sesuai format.js
    data: computed(() => (data.value || []).map(norm)),
    pending,
    // Panggil ini Setelah createOrder / setStatus berhasil.
    refresh: () => refreshNuxtData('orders'),
  }
}
