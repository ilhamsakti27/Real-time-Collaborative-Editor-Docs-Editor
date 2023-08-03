<template>
  <v-bottom-sheet
    v-model="showDialog"
    max-width="900px"
  >
    <v-card
      min-height="400px"
    >
      <v-card-title>
        Tambah Pelanggan
      </v-card-title>
      <v-card-text>
        Hello!
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import { ref } from '@vue/composition-api'

export default {
  setup() {
    const showDialog = ref(false)

    const show = () => {
      showDialog.value = true
    }

    const hide = () => {
      showDialog.value = false
    }

    return {
      showDialog,
      show,
      hide,
    }
  },
}
</script>

<style>

</style>
