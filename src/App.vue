<template>
  <div>
    <component
      :is="resolveLayoutVariant"
      :class="`skin-variant--${appSkinVariant}`"
    >
      <transition
        v-if="$route"
        :name="appRouteTransition"
        mode="out-in"
        appear
      >
        <router-view :key="$route.path" />
      </transition>
    </component>

    <notifications group="app" />
    <v-overlay :value="loadingProfile">
      <div class="d-flex align-center h-full pa-16 ms-16 pe-0">
        <Lottie
          :options="{
            animationData: catloading,
          }"
          style="max-width: 800px; margin: 0"
        />
      </div>
    </v-overlay>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import Lottie from 'vue-lottie'
import { computed } from '@vue/composition-api'
// eslint-disable-next-line import/no-unresolved
import useAppConfig from '@core/@app-config/useAppConfig'
import { useRouter } from '@core/utils'
import { useLayout } from '@core/layouts/composable/useLayout'

// Layouts
import useDynamicVh from '@core/utils/useDynamicVh'
import LayoutContentVerticalNav from '@/layouts/variants/content/vertical-nav/LayoutContentVerticalNav.vue'
import LayoutContentHorizontalNav from '@/layouts/variants/content/horizontal-nav/LayoutContentHorizontalNav.vue'
import LayoutBlank from '@/layouts/variants/blank/LayoutBlank.vue'
import store from '@/store'
import catloading from '@/assets/lottie/cat_loading.json'

// Dynamic vh

export default {
  components: {
    Lottie,
    LayoutContentVerticalNav,
    LayoutContentHorizontalNav,
    LayoutBlank,
  },
  setup() {
    const { route } = useRouter()
    const { appContentLayoutNav, appSkinVariant, appRouteTransition } = useAppConfig()
    const loadingProfile = computed(() => store.state.auth.loadingProfile)

    const { handleBreakpointLayoutSwitch } = useLayout()
    handleBreakpointLayoutSwitch()

    const resolveLayoutVariant = computed(() => {
      if (route.value && route.value.meta && route.value.meta.layout === 'blank') return 'layout-blank'

      return `layout-content-${appContentLayoutNav.value}-nav`
    })

    useDynamicVh()

    return {
      loadingProfile,
      resolveLayoutVariant,
      appSkinVariant,
      appRouteTransition,
      catloading,
    }
  },
}
</script>
