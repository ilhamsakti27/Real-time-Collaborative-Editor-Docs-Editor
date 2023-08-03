<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner">
      <!-- brand logo -->
      <router-link
        to="/"
        class="brand-logo d-flex align-center"
      >
        <v-img
          :src="appLogo"
          max-height="30px"
          max-width="30px"
          alt="logo"
          contain
          class="me-3 "
        />

        <v-img
          :src="require('@/assets/images/svg/admin-text.svg')"
          max-width="130px"
          alt="logo"
          contain
          eager
          class="app-logo me-3"
        />
      </router-link>
      <!--/ brand logo -->

      <v-row class="auth-row ma-0">
        <v-col
          lg="8"
          class="d-none d-lg-block position-relative overflow-hidden pa-0"
        >
          <div class="auth-illustrator-wrapper">
            <!-- triangle bg -->
            <img
              height="362"
              class="auth-mask-bg"
              :src="require(`@/assets/images/misc/mask-v2-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
            >

            <!-- tree -->
            <v-img
              height="226"
              width="300"
              class="auth-tree"
              src="@/assets/images/misc/tree-4.png"
            />

            <div class="d-flex align-center h-full pa-16 ms-16 pe-0">
              <Lottie
                :options="{
                  animationData: null,
                }"
                style="max-width: 800px; margin: 0"
              />
            </div>
          </div>
        </v-col>

        <v-col
          lg="4"
          class="d-flex align-center auth-bg pa-10 pb-0"
        >
          <v-row>
            <v-col
              cols="12"
              sm="8"
              md="6"
              lg="12"
              class="mx-auto"
            >
              <v-card flat>
                <v-card-text>
                  <p
                    class="text-2xl font-weight-semibold text--primary mb-2"
                  >
                    Selamat datang! 👋🏻
                  </p>
                  <p class="mb-8">
                    Silahkan login terlebih dahulu.
                  </p>
                </v-card-text>

                <!-- login form -->
                <v-card-text>
                  <v-form
                    ref="loginForm"
                    @submit.prevent="login"
                  >
                    <v-text-field
                      v-model="phone"
                      outlined
                      label="Nomor HP"
                      placeholder="Input nomor HP"
                      hide-details="auto"
                      class="mb-6"
                    />

                    <v-text-field
                      v-model="password"
                      outlined
                      :type="isPasswordVisible ? 'text' : 'password'"
                      label="Password"
                      placeholder="Password"
                      :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline:icons.mdiEyeOutline"
                      hide-details="auto"
                      class="mb-2"
                      @click:append="isPasswordVisible = !isPasswordVisible"
                    />

                    <div
                      class="d-flex align-center justify-center flex-wrap mt-4"
                    >
                      <a
                        href="#"
                      >Lupa Password? </a>
                    </div>

                    <v-btn
                      block
                      color="primary"
                      type="submit"
                      class="mt-6"
                      :loading="loading"
                    >
                      Login
                    </v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref, computed } from '@vue/composition-api'
import Lottie from 'vue-lottie'
import themeConfig from '@themeConfig'
import store from '@/store'
import router from '@/router'
import breath from '@/assets/lottie/breath.json'

export default {
  components: {
    Lottie,
  },
  setup() {
    const isPasswordVisible = ref(false)

    const loginForm = ref(null)
    const phone = ref('')
    const password = ref('')
    const loading = computed(() => store.state.auth.loadingLogin)

    const login = () => {
      if (phone.value && password.value) {
        store.dispatch('login', {
          phone: phone.value,
          password: password.value,
        }).then(() => {
          Vue.notify({
            group: 'app',
            title: 'Berhasil login!',
            type: 'success',
            text: 'Selamat datang di AdminCRM.',
          })
          router.replace('/')
        })
      }
    }

    return {
      isPasswordVisible,
      loginForm,
      phone,
      password,
      loading,
      login,
      breath,

      // Icons
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },

      // themeConfig
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@core/preset/preset/pages/auth.scss';
</style>
