<template>
  <perfect-scrollbar
    :options="{
      wheelPropagation: true,
      useBothWheelAxes: true,
    }"
  >
    <div class="kanban">
      <draggable
        :list="value"
        :animation="200"
        ghost-class="ghost-card"
        group="value"
        class="d-flex"
        :sort="sortable"
        @change="updateSort"
      >
        <div
          v-for="(column, index) in value"
          :key="column.id"
          class="kanban-column"
          :style="`border-top: 8px #${column.color} solid;`"
        >
          <v-hover #default="{ hover: isHovered }">
            <div class="kanban-header d-flex justify-space-between">
              <small class="mb-2">{{ column.name }}</small>
              <v-menu
                v-model="menuOpenList[index]"
                :close-on-content-click="false"
                max-width="290px"
                min-width="290px"
                offset-y
                left
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-slide-x-reverse-transition
                    mode="out-in"
                  >
                    <v-icon
                      v-show="isHovered"
                      :key="1"
                      size="24px"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ icons.mdiDotsHorizontal }}
                    </v-icon>
                  </v-slide-x-reverse-transition>
                </template>

                <v-card>
                  <v-list>
                    <div class="px-4 mt-2">
                      <v-text-field
                        :value="column.name"
                        placeholder="Label status"
                        hide-details
                        dense
                      />
                    </div>
                    <div class="px-4 mt-4">
                      <small>Warna Status</small>
                      <div class="d-flex flex-wrap mt-2">
                        <div class="pa-4 mr-1 mb-1 rounded primary" />
                        <div class="pa-4 mr-1 mb-1 rounded error" />
                        <div class="pa-4 mr-1 mb-1 rounded warning" />
                        <div class="pa-4 mr-1 mb-1 rounded secondary" />
                        <div class="pa-4 mr-1 mb-1 rounded accent" />
                        <div class="pa-4 mr-1 mb-1 rounded info" />
                        <div class="pa-4 mr-1 mb-1 rounded success" />
                      </div>
                    </div>
                    <div class="px-4 mt-4">
                      <small>Dapat Menerima Status</small>
                      <v-combobox
                        :items="['Status 1', 'Status 2', 'Status 3']"
                        multiple
                        chips
                        small-chips
                        hide-details
                        dense
                      />
                    </div>
                  </v-list>

                  <v-divider />

                  <div class="d-flex">
                    <v-spacer />

                    <v-btn
                      text
                      @click="menuOpenList[index] = false"
                    >
                      Batal
                    </v-btn>
                    <v-btn
                      color="primary"
                      text
                      @click="menuOpenList[index] = false"
                    >
                      Simpan
                    </v-btn>
                  </div>
                </v-card>
              </v-menu>
            </div>
          </v-hover>
          <draggable
            :list="column.lists"
            :animation="200"
            ghost-class="ghost-card"
            group="lists"
            class="h-100"
            :sort="column.sortable !== null || column.sortable !== false ? column.sortable : true"
            @change="updateStatus(index, $event)"
          >
            <div
              v-for="list in column.lists"
              :key="list.id"
            >
              <slot
                name="kanban-card"
                :data="list"
              >
                <v-card
                  :key="list.id"
                  class="mb-2"
                >
                  <v-card-text>
                    {{ list.name }}
                  </v-card-text>
                </v-card>
              </slot>
            </div>
          </draggable>
        </div>
      </draggable>
    </div>
  </perfect-scrollbar>
</template>

<script>
import { ref } from '@vue/composition-api'
import draggable from 'vuedraggable'
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'
import { mdiDotsHorizontal } from '@mdi/js'

export default {
  components: {
    draggable,
    PerfectScrollbar,
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
    sortable: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const updateSort = data => {
      if (data.moved) {
        emit('sortColumn', data.moved)
      }
    }

    const updateStatus = (index, data) => {
      if (data.added) {
        emit('moveStatus', index, data.added)
      }
    }

    const menuOpenList = ref(Array.from({ length: props.value.length }, () => false))

    return {
      updateSort,
      updateStatus,
      menuOpenList,

      icons: {
        mdiDotsHorizontal,
      },
    }
  },
}
</script>

<style lang="scss">
@import '~vuetify/src/styles/styles.sass';

.kanban {
  margin-bottom: 48px;

  .kanban-column {
    min-width: 320px;
    background: rgba(255, 255, 255, 0.8);
    padding: 0 10px;
    padding-bottom: 32px;
    border-right: 1px rgb(215, 215, 215) solid;
    border-bottom: 1px rgb(215, 215, 215) solid;

    .kanban-header {
      padding: 10px 4px;
      font-weight: 600;
    }

    .ghost-card {
      background: rgb(240, 240, 240) !important;
    }
  }

  .kanban-column:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-left: 1px rgb(215, 215, 215) solid;;
  }

  .kanban-column:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}

.theme--dark {
  .kanban-column {
    background: rgba(255, 255, 255, 0.1);

    .ghost-card {
      background: rgba(255, 255, 255, 0.1) !important;
    }
  }
}
</style>
