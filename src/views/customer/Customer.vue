<template>
  <v-card>
    <v-row class="mx-2 pt-2">
      <v-col>
        <h3>Daftar Pelanggan</h3>
      </v-col>
      <v-col
        cols="auto"
        class="ms-auto"
      >
        <input-icon-toggle
          v-model="search"
          class="ms-2"
          :icon="icons.mdiMagnify"
          placeholder="Cari pelanggan"
        />
      </v-col>
    </v-row>
    <v-row class="mx-2 mb-2">
      <v-col
        cols="12"
        lg="3"
        md="4"
      >
        <v-select
          placeholder="Sortir Berdasarkan"
          :items="[]"
          item-text="title"
          item-value="value"
          outlined
          dense
          hide-details
        />
      </v-col>
      <v-col
        cols="12"
        lg="2"
        md="3"
      >
        <v-badge
          bordered
          overlap
          class="w-100 cursor-pointer"
          @click.native="clearFilter()"
        >
          <template #badge>
            <v-icon>{{ icons.mdiClose }}</v-icon>
          </template>
          <v-btn
            outlined
            block
            large
            color="primary"
            @click.stop="showDialog = true"
          >
            Filter (2)
          </v-btn>
        </v-badge>
      </v-col>
      <v-col
        cols="auto"
        class="ms-auto d-flex"
      >
        <v-btn-toggle
          v-model="viewTab"
          mandatory
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ icons.mdiTable }}</v-icon>
              </v-btn>
            </template>
            <span>Tampilan Tabel</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ icons.mdiCardText }}</v-icon>
              </v-btn>
            </template>
            <span>Tampilan Kartu</span>
          </v-tooltip>
        </v-btn-toggle>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ms-4"
              color="primary"
              v-bind="attrs"
              v-on="on"
              @click="$router.push({ name: 'customer-add' })"
            >
              <v-icon>{{ icons.mdiPlus }}</v-icon>
            </v-btn>
          </template>
          <span>Tambah Pelanggan</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-tabs-items v-model="viewTab">
      <v-tab-item>
        <v-data-table
          v-model="selectedRows"
          :headers="headers"
          :items="state.customers.value"
          :items-per-page="5"
          item-key="id"
          show-select
          disable-sort
          :footer-props="{
            'items-per-page-options': [5, 10, 15],
            'items-per-page-text': 'Jumlah data',
          }"
          :server-items-length="state.customers.value.length"
          mobile-breakpoint="0"
          :loading="loading"
        >
          <template v-slot:item.name="props">
            <router-link :to="{ name: 'customer-detail', params: { id: props.item.id } }">
              <span class="primary--text font-medium">{{ `${props.item.first_name} ${props.item.last_name}` }}</span>
            </router-link>
          </template>
          <template v-slot:item.type="props">
            <v-chip
              v-for="type in props.item.type"
              :key="type.id"
              small
              class="mr-1 mb-1"
            >
              {{ type.name }}
            </v-chip>
          </template>
          <template v-slot:item.action>
            <v-menu
              bottom
              left
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  size="20px"
                  v-bind="attrs"
                  class="ml-auto"
                  v-on="on"
                >
                  {{ icons.mdiDotsVertical }}
                </v-icon>
              </template>
              <v-list>
                <v-list-item> Lihat Detail </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template
            slot="footer.page-text"
            slot-scope="item"
          >
            Melihat {{ item.pageStart }} - {{ item.pageStop }} dari total {{ item.itemsLength }} data
          </template>
        </v-data-table>
      </v-tab-item>

      <v-tab-item class="px-5">
        <v-data-iterator
          v-model="selectedRows"
          :headers="headers"
          :items="state.customers.value"
          :items-per-page="5"
          item-key="id"
          show-select
          disable-sort
          :footer-props="{
            'items-per-page-options': [5, 10, 15],
            'items-per-page-text': 'Jumlah data',
          }"
          :server-items-length="state.customers.value.length"
          mobile-breakpoint="0"
          :loading="loading"
        >
          <template v-slot:default="props">
            <v-row class="match-height">
              <v-col
                v-for="item in props.items"
                :key="item.name"
                cols="12"
                sm="6"
                md="4"
                xl="3"
              >
                <v-hover #default="{ hover }">
                  <v-card
                    outlined
                    elevation="1"
                    class="d-flex flex-column pa-4"
                    @click="$router.push({ name: 'customer-detail', params: { id: item.id } })"
                  >
                    <div class="d-flex mb-1 align-start">
                      <v-avatar
                        size="44"
                        class="v-avatar-light-bg mr-2"
                      >
                        FI
                      </v-avatar>
                      <div>
                        <span class="text-subtitle-2 font-weight-bold d-block primary--text">{{ `${item.first_name} ${item.last_name}` }}</span>
                        <span class="text-caption font-medium">{{ item.phone_number }}</span>
                      </div>
                      <v-menu
                        bottom
                        left
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-slide-x-reverse-transition mode="out-in">
                            <v-icon
                              v-show="hover"
                              size="20px"
                              v-bind="attrs"
                              class="ml-auto mt-2"
                              v-on="on"
                            >
                              {{ icons.mdiDotsVertical }}
                            </v-icon>
                          </v-slide-x-reverse-transition>
                        </template>
                        <v-list>
                          <v-list-item> Lihat Detail </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>
                    <span class="text-caption text--disabled">{{ item.email }}</span>
                    <div class="d-flex flex-wrap mt-2">
                      <v-chip
                        v-for="i in 5"
                        :key="i"
                        x-small
                        class="mr-1 mb-1"
                      >
                        Tag Customer {{ i }}
                      </v-chip>
                    </div>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-tab-item>
    </v-tabs-items>

    <v-dialog
      v-model="showDialog"
      max-width="600px"
    >
      <v-card>
        <v-card-title> Filter Pelanggan </v-card-title>
        <v-card-text> Hello this is filter modal. The content is coming up soon. </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { ref, onMounted } from '@vue/composition-api'
import {
  mdiClose, mdiMagnify, mdiTable, mdiCardText, mdiPlus, mdiDotsVertical,
} from '@mdi/js'
import { createFieldMapper } from 'vuex-use-fields'
import { useStorage } from '@vueuse/core'
import store from '@/store'
import InputIconToggle from '@/components/inputs/InputIconToggle.vue'
import { apolloClient } from '@/vue-apollo'
import { customerSubscription } from '@/graphql/subscriptions'
import errorHandling from '@/utils/errorHandling'

const useFieldCustomer = createFieldMapper({ getter: 'customer/getField', setter: 'customer/getField' })

export default {
  components: {
    InputIconToggle,
  },
  setup() {
    const max25chars = v => v.length <= 25 || 'Input too long!'
    const selectedRows = ref([])
    const search = ref('')
    const showDialog = ref(false)
    const viewTab = useStorage('viewTabCustomer', 0)
    const loading = ref(false)
    const headers = ref([
      {
        text: 'Nama',
        value: 'name',
      },
      {
        text: 'Nomor HP',
        value: 'phone_number',
      },
      {
        text: 'Email',
        value: 'email',
      },
      {
        text: 'Deskripsi',
        value: 'description',
      },
      {
        text: 'Tags',
        value: 'type',
      },
      {
        text: '',
        value: 'action',
      },
    ])

    const save = () => {
      console.log('saved!')
    }
    const open = () => {
      console.log('opened!')
    }

    const clearFilter = () => {
      console.log('filter is cleared!')
    }

    const state = {
      ...useFieldCustomer(['customers', 'customersCount']),
    }

    const fetchCustomers = () => {
      loading.value = true
      store.dispatch('customer/getCustomers').then(result => {
        store.commit('customer/setField', { location: 'customers', value: result.data.customers })
        loading.value = false
      })
    }

    const observer = apolloClient.subscribe({
      query: customerSubscription,
      fetchPolicy: 'no-cache',
    })

    observer.subscribe({
      next(sub) {
        console.log('receiveUpdate', sub.data.customerSubscription)
        fetchCustomers()
      },
      error(error) {
        console.error(error)
        errorHandling(error)
      },
    })

    onMounted(() => {
      fetchCustomers()
    })

    return {
      headers,
      selectedRows,
      max25chars,
      save,
      open,
      search,
      showDialog,
      clearFilter,
      viewTab,
      state,
      loading,

      icons: {
        mdiDotsVertical,
        mdiClose,
        mdiMagnify,
        mdiTable,
        mdiCardText,
        mdiPlus,
      },
    }
  },
}
</script>

<style>
.v-data-iterator .v-data-footer .v-data-footer__select {
  margin-left: 0 !important;
  margin-right: auto !important;
}
.v-data-iterator .v-data-footer .v-data-footer__select .v-select {
  margin: 13px 0 13px 20px !important;
}
</style>
