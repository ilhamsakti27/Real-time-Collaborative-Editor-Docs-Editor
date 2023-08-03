<template>
  <div class="d-flex w-100 mb-8 align-center">
    <v-icon
      v-if="!hideBack"
      class="primary--text mr-4"
      @click="back()"
    >
      {{ icons.mdiArrowLeft }}
    </v-icon>
    <h3
      v-if="title"
      class="mr-8 mb-0"
    >
      {{ title }}
    </h3>
    <v-breadcrumbs
      v-if="!hideBreadcrumbs"
      class="pa-0"
      :items="breadcrumbs && breadcrumbs.length ? breadcrumbs : []"
    >
      <template v-slot:divider>
        <v-icon>{{ icons.mdiChevronRight }}</v-icon>
      </template>
    </v-breadcrumbs>
    <div class="ms-auto">
      <slot
        name="action"
      />
    </div>
  </div>
</template>

<script>
import { mdiChevronRight, mdiArrowLeft } from '@mdi/js'
import { computed } from '@vue/composition-api'
import { useRouter } from '@core/utils'

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    hideBreadcrumbs: {
      type: Boolean,
      default: false,
    },
    hideBack: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { route, router } = useRouter()
    const breadcrumbs = computed(() => route.value.meta.breadcrumbs)
    const hasHistory = computed(() => window.history.length > 2)
    const back = () => {
      if (hasHistory.value) {
        router.back()
      } else {
        router.push('/')
      }
    }

    return {
      breadcrumbs,
      back,
      icons: {
        mdiChevronRight,
        mdiArrowLeft,
      },
    }
  },
}
</script>

<style>
.v-breadcrumbs li:nth-child(even) {
  padding: 0 4px !important;
}
</style>
