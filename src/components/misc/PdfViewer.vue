<template>
  <v-bottom-sheet
    v-model="isOpen"
    max-width="900px"
  >
    <v-card
      min-height="90vh"
    >
      <v-card-title class="font-weight-bold d-flex justify-space-between">
        <span>Preview Dokumen</span>
        <v-icon
          size="26px"
          @click="close()"
        >
          {{ icons.mdiClose }}
        </v-icon>
      </v-card-title>
      <div style="height: 90%;">
        <vue-pdf-app
          v-if="pdfLink"
          :pdf="pdfLink"
          :file-name="filename"
        />
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import { ref } from '@vue/composition-api'
import VuePdfApp from 'vue-pdf-app'
import 'vue-pdf-app/dist/icons/main.css'
import { mdiClose } from '@mdi/js'

export default {
  components: {
    VuePdfApp,
  },
  setup() {
    const pdfLink = ref('')
    const filename = ref('AdminCRM')
    const isOpen = ref(false)

    const show = (data, name) => {
      if (name) {
        filename.value = name
      } else {
        // eslint-disable-next-line prefer-destructuring
        filename.value = data.substring(data.lastIndexOf('/') + 1).split('.')[0]
      }

      pdfLink.value = data
      isOpen.value = true
    }

    const close = () => {
      pdfLink.value = ''
      isOpen.value = false
    }

    return {
      pdfLink,
      filename,
      isOpen,
      show,
      close,

      icons: {
        mdiClose,
      },
    }
  },
}
</script>

<style>

</style>
