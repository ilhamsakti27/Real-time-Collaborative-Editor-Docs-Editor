<template>
  <v-form
    :ref="name"
    v-model="valid"
    lazy-validation
    @submit.prevent="submitForm"
  >
    <v-row>
      <v-col
        v-if="isMandatory(true)"
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-text-field
          v-model="data.first_name"
          :rules="[required]"
          label="Nama Awal (wajib diisi)"
          placeholder="Input nama awal"
          outlined
          dense
        />
      </v-col>
      <v-col
        v-if="isMandatory(true)"
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-text-field
          v-model="data.last_name"
          :rules="[required]"
          label="Nama Akhir (wajib diisi)"
          placeholder="Input nama akhir"
          outlined
          dense
        />
      </v-col>
      <v-col
        v-if="isMandatory(true)"
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-select
          v-model="data.gender"
          :items="[
            {
              value: '0',
              label: 'Laki Laki',
            },
            {
              value: '1',
              label: 'Perempuan',
            },
          ]"
          label="Gender (wajib diisi)"
          outlined
          item-text="label"
          item-value="value"
          return-object
          dense
        />
      </v-col>
      <v-col
        v-if="isMandatory(true)"
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-text-field
          v-model="data.phone_number"
          :rules="[required]"
          label="Nomor HP (wajib diisi)"
          placeholder="Input nomor HP pelanggan"
          outlined
          dense
          hint="Contoh: 08951234567"
          persistent-hint
        />
      </v-col>
      <v-col
        v-if="isMandatory(false)"
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-text-field
          v-model="data.job_title"
          label="Pekerjaan"
          placeholder="Input pekerjaan"
          outlined
          dense
        />
      </v-col>
      <v-col
        v-if="isMandatory(false)"
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-menu
          v-model="showDate"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="data.birth_date"
              clearable
              label="Tanggal Lahir"
              readonly
              outlined
              dense
              v-bind="attrs"
              v-on="on"
              @click:clear="data.birth_date = ''"
            />
          </template>
          <v-date-picker
            v-model="data.birth_date"
            locale="id-ID"
            :max="maxDate"
            @change="showDate = false"
          />
        </v-menu>
      </v-col>
      <v-col
        v-if="isMandatory(false)"
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-text-field
          v-model="data.whatsapp_number"
          label="Nomor WhatsApp"
          placeholder="Input nomor WhatsApp pelanggan"
          outlined
          dense
          hint="Contoh: 08951234567"
          persistent-hint
        />
      </v-col>
      <v-col
        v-if="isMandatory(false)"
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-text-field
          v-model="data.email"
          label="Email"
          placeholder="Input email pelanggan"
          outlined
          dense
          type="email"
          :rules="[emailValidator]"
        />
      </v-col>
      <v-col
        v-if="isMandatory(false)"
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-text-field
          v-model="data.facebook"
          label="Facebook"
          placeholder="Input Facebook pelanggan"
          outlined
          dense
        />
      </v-col>
      <v-col
        v-if="isMandatory(false)"
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-text-field
          v-model="data.instagram"
          label="Instagram"
          placeholder="Input Instagram pelanggan"
          outlined
          dense
        />
      </v-col>
      <v-col
        v-if="isMandatory(false)"
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-textarea
          v-model="data.description"
          label="Deskripsi"
          placeholder="Isi deskripsi pelanggan"
          outlined
          dense
        />
      </v-col>
      <v-col
        v-if="isMandatory(false)"
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-textarea
          v-model="data.address"
          label="Alamat"
          placeholder="Isi alamat pelanggan"
          outlined
          dense
        />
      </v-col>
    </v-row>

    <v-overlay
      :value="loading"
      absolute
      class="rounded"
    >
      <v-progress-circular
        indeterminate
        size="36"
      />
    </v-overlay>
  </v-form>
</template>

<script>
import { required, emailValidator } from '@core/utils/validation'
import { ref, computed } from '@vue/composition-api'
import { format, parseISO } from 'date-fns'

export default {
  props: {
    name: {
      type: String,
      required: true,
      default: 'form',
    },
    value: {
      type: Object,
      required: true,
      default: () => {},
    },
    grid: {
      type: [String, Number],
      default: '4',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    quick: {
      type: Boolean,
      default: false,
    },
    wrap: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.form = this.$refs[this.name]
  },
  setup(props, { emit }) {
    const form = ref(null)
    const valid = ref(false)
    const data = computed(() => props.value)
    const showDate = ref(false)
    const maxDate = format(parseISO(new Date().toISOString()), 'yyyy-MM-dd')

    const isMandatory = bool => {
      if (bool) return props.quick || true

      return !props.quick || false
    }

    const validate = () => form.value.validate()
    const resetValidation = () => form.value.resetValidation()
    const resetForm = () => form.value.reset()
    const submitForm = () => {
      emit('submit', props.value)
    }

    return {
      form,
      valid,
      data,
      validate,
      resetValidation,
      resetForm,
      submitForm,
      isMandatory,
      showDate,
      maxDate,

      // validation rules
      required,
      emailValidator,
    }
  },
}
</script>

<style>

</style>
