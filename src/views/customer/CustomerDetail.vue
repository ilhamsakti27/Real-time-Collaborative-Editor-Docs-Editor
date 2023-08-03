<template>
  <div>
    <app-breadcrumb
      title="Detail Pelanggan"
      hide-breadcrumbs
    />
    <v-row>
      <v-col
        cols="12"
        md="4"
        lg="3"
      >
        <v-card>
          <div class="pa-4 pb-2 d-flex">
            <v-avatar
              size="44"
              class="v-avatar-light-bg mr-2"
            >
              FI
            </v-avatar>
            <div>
              <span class="text-subtitle-2 font-weight-bold d-block primary--text">Nama Customer</span>
              <span class="text-caption font-medium">Nomor HP</span>
            </div>
          </div>
          <div class="px-4 py-2">
            <div
              v-for="i in 6"
              :key="i"
              class="d-flex align-center mb-4"
            >
              <v-icon
                size="32px"
                class="mr-2"
              >
                {{ icons.mdiInformation }}
              </v-icon>
              <div class="d-flex flex-column">
                <span class="text-caption">Informasi Tambahan {{ i }}</span>
                <span>Informasi Tambahan {{ i }}</span>
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="8"
        lg="9"
      >
        <v-card class="mb-4">
          <v-card-title class="font-weight-bold">
            Detail Yang Lain
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad eius hic eaque ratione! Amet libero ea nostrum reprehenderit mollitia veniam adipisci inventore aliquid laboriosam officiis expedita, sed rerum, doloribus minus.
          </v-card-text>
        </v-card>
        <v-card class="mb-4">
          <v-card-title class="font-weight-bold">
            Detail Yang Lain
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad eius hic eaque ratione! Amet libero ea nostrum reprehenderit mollitia veniam adipisci inventore aliquid laboriosam officiis expedita, sed rerum, doloribus minus.
          </v-card-text>
        </v-card>
        <v-card class="mb-4">
          <v-card-title class="font-weight-bold">
            Detail Yang Lain
          </v-card-title>
          <v-card-text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad eius hic eaque ratione! Amet libero ea nostrum reprehenderit mollitia veniam adipisci inventore aliquid laboriosam officiis expedita, sed rerum, doloribus minus.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import { mdiInformation } from '@mdi/js'
import { apolloClient } from '@/vue-apollo'
import { customerDetail } from '@/graphql/queries'
import AppBreadcrumb from '@/components/misc/AppBreadcrumb.vue'

export default {
  components: {
    AppBreadcrumb,
  },
  props: {
    id: {
      type: [String, Number],
      default: null,
      required: true,
    },
  },
  setup(props) {
    const loadingDetail = ref(false)
    const detail = ref({})
    const fetchDetail = () => {
      loadingDetail.value = true
      apolloClient.query({
        query: customerDetail,
        fetchPolicy: 'no-cache',
        variables: {
          customer_id: +props.id,
        },
      }).then(result => {
        console.log(result)
        loadingDetail.value = false
      })
    }

    onMounted(() => {
      // fetchDetail()
    })

    return {
      loadingDetail,
      detail,
      fetchDetail,

      icons: {
        mdiInformation,
      },
    }
  },
}
</script>

<style>

</style>
