<template>
  <div>
    <v-card>
      <div class="pa-4">
        <app-breadcrumb
          title="Tambah Pelanggan"
        />
        <CustomerForm
          ref="customerForm"
          v-model="customerData"
          name="customerForm"
          @submit="submitForm"
        />
        <div class="d-flex justify-end">
          <v-btn
            class="mr-2"
            outlined
            @click="$refs.customerForm.resetForm()"
          >
            Reset Form
          </v-btn>
          <v-btn
            color="primary"
            :loading="loadingAdd"
            @click="submitForm"
          >
            Simpan Pelanggan
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { apolloClient } from '@/vue-apollo'
import { addCustomer } from '@/graphql/mutations'
import router from '@/router'
import AppBreadcrumb from '@/components/misc/AppBreadcrumb.vue'
import CustomerForm from './CustomerForm.vue'

export default {
  components: {
    AppBreadcrumb,
    CustomerForm,
  },
  setup() {
    const customerForm = ref(null)
    const customerData = ref({
      first_name: '',
      last_name: '',
      gender: {
        value: '0',
        label: 'Laki Laki',
      },
      description: '',
      address: '',
      job_title: '',
      birth_date: '',
      phone_number: '',
      whatsapp_number: '',
      email: '',
      instagram: '',
      facebook: '',
    })

    const loadingAdd = ref(false)
    const submitForm = () => {
      if (customerForm.value.validate()) {
        loadingAdd.value = true
        apolloClient.mutate({
          mutation: addCustomer,
          variables: {
            ...customerData.value,
            gender: customerData.value.gender.value,
          },
        }).then(result => {
          console.log(result)
          loadingAdd.value = false
          router.replace({ name: 'customers' })
        }).catch(err => {
          console.log(err.graphQLErrors[0].message)
          loadingAdd.value = false
        })
      }
    }

    return {
      loadingAdd,
      customerForm,
      customerData,
      submitForm,
    }
  },
}
</script>

<style>

</style>
