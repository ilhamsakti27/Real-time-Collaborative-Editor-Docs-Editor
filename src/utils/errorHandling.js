import Vue from 'vue'
import store from '@/store'

/**
 * Fungsi untuk menampilkan toast sederhana
 * @method
 * @param {string} title Judul dari toast
 * @param {string} text Deskripsi atau teks dari toast
 * @param {string} [type="error"]  Tipe dari toast, bisa error, warn, atau success
 * @returns {void}
 */
const showToast = (title, text, type = 'error') => {
  Vue.notify({
    title,
    type,
    text,
  })
}

/**
 * Untuk menghandle jika terjadi error
 * @method
 * @param {(string|Object)} error Pesan atau object error dari GraphQL
 * @returns {void}
 */
export default function errorHandling(error, path) {
  if (error) {
    if (error.graphQLErrors && Array.isArray(error.graphQLErrors) && error.graphQLErrors.length) {
      if (error.graphQLErrors[0].extensions.code === 'TOKEN_EXPIRED') {
        store.dispatch('refreshToken')

        return
      }

      if (error.graphQLErrors[0].extensions.code === 'PERMISSION_DENIED') {
        showToast('Aksi Ditolak', `Kamu tidak punya hak akses untuk melakukan aksi tersebut. ${path ? `Akses: ${path}` : ''}`)

        return
      }

      if (error.graphQLErrors[0].extensions.code === 'AUTH_FAILED') {
        showToast('Login Gagal', error.graphQLErrors[0].message)

        return
      }

      showToast(error.graphQLErrors[0].extensions.code, error.graphQLErrors[0].message)

      return
    }
    if (Array.isArray(error)) {
      showToast('Terjadi kesalahan!', error.join('\n'))
    } else {
      showToast('Terjadi kesalahan!', error)
    }
  }
}
