<template>
  <v-form
    :ref="name"
    v-model="valid"
    lazy-validation
    @submit.prevent="submitForm"
  >
    <v-row>
      <v-col
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-text-field
          v-if="isMandatory(true)"
          v-model="data.name"
          :rules="[required]"
          label="Nama (required)"
          placeholder="Input nama"
        />
      </v-col>
      <v-col
        cols="12"
        :md="wrap ? '12' : grid"
      >
        <v-text-field
          v-if="isMandatory(false)"
          v-model="data.name"
          :rules="[required]"
          label="Nama"
          placeholder="Input nama"
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
import { required } from '@core/utils/validation'
import { ref, computed } from '@vue/composition-api'

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

      // validation rules
      required,
    }
  },
}
</script>

<style>

</style>
