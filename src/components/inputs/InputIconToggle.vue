<template>
  <div
    class="d-flex"
    :class="{ 'flex-row-reverse' : direction === 'right' }"
  >
    <XyzTransitionGroup
      appear
      :xyz="direction === 'left' ? 'fade right-2' : 'fade left-2'"
    >
      <div
        v-show="isOpen && !modal"
        :key="1"
        :class="direction === 'left' ? 'mr-1' : 'ml-1'"
      >
        <v-text-field
          v-model="inputData"
          :placeholder="placeholder"
          v-bind="$attrs"
          class="mt-0 pt-0"
          :height="iconSize"
          hide-details
          dense
          :loading="loading"
        />
      </div>
    </XyzTransitionGroup>

    <v-slide-x-reverse-transition
      v-if="direction === 'left'"
      mode="out-in"
    >
      <v-icon
        :key="`icon-${isOpen}`"
        :size="iconSize"
        @click="isOpen = !isOpen"
      >
        {{ isOpen && !modal ? mdiClose : icon }}
      </v-icon>
    </v-slide-x-reverse-transition>

    <v-slide-x-transition
      v-else
      mode="out-in"
    >
      <v-icon
        :key="`icon-${isOpen}`"
        :size="iconSize"
        @click="isOpen = !isOpen; inputData = ''"
      >
        {{ isOpen && !modal ? mdiClose : icon }}
      </v-icon>
    </v-slide-x-transition>

    <v-dialog
      v-if="modal"
      v-model="isOpen"
      max-width="300px"
    >
      <v-card class="pt-4">
        <v-card-text>
          <v-text-field
            v-model="inputData"
            :placeholder="placeholder"
            v-bind="$attrs"
            class="mt-0 pt-0"
            hide-details
            :height="iconSize"
            dense
            :loading="loading"
          >
            <template slot="append">
              <v-icon
                v-if="inputData.length"
                size="26px"
                class="primary--text"
                @click="isOpen = !isOpen"
              >
                {{ mdiCheck }}
              </v-icon>
            </template>
          </v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'
import { mdiClose, mdiMagnify, mdiCheck } from '@mdi/js'

export default {
  props: {
    // eslint-disable-next-line
    value: {
      default: () => null,
    },
    icon: {
      type: String,
      default: mdiMagnify,
    },
    direction: {
      type: String,
      default: 'left',
    },
    placeholder: {
      type: String,
      default: 'Input sesuatu',
    },
    modal: {
      type: Boolean,
      default: false,
    },
    iconSize: {
      type: [String, Number],
      default: '26px',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isOpen = ref(false)
    const inputData = computed({
      get() {
        return props.value
      },
      set(val) {
        emit('input', val)
      },
    })

    watch(isOpen, value => {
      if (value) {
        emit('open')
      } else {
        emit('close')
      }
    })

    return {
      isOpen,
      mdiClose,
      mdiCheck,
      inputData,
    }
  },
}
</script>

<style scoped lang="scss">
.v-icon.v-icon::after {
  background-color: transparent !important;
}

.v-icon {
  transition: position 0.2s;
}
</style>
