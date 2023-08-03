<template>
  <div>
    <v-card class="mb-4">
      <v-card-text class="text-h6 font-weight-bold">
        Daftar Tiket
      </v-card-text>
      <v-tabs
        v-model="activeTab"
        class="px-4"
      >
        <v-tab class="text-capitalize">
          Retur
        </v-tab>
        <v-tab class="text-capitalize">
          Komplain
        </v-tab>
        <v-tab class="text-capitalize">
          Servis
        </v-tab>
      </v-tabs>
    </v-card>
    <v-tabs-items
      v-model="activeTab"
      class="transparent"
    >
      <v-tab-item>
        <kanban-board :value="returTickets" />
      </v-tab-item>
      <v-tab-item>
        <kanban-board :value="complaintTickets">
          <template
            slot="kanban-card"
            slot-scope="props"
          >
            <v-card
              :key="props.data.id"
              class="mb-2"
            >
              <v-hover
                #default="{ hover: isHovered }"
              >
                <v-card-text class="success--text d-flex justify-space-between">
                  <h4>{{ props.data.name }}</h4>
                  <v-icon v-show="isHovered">
                    {{ icons.mdiDotsHorizontal }}
                  </v-icon>
                </v-card-text>
              </v-hover>
            </v-card>
          </template>
        </kanban-board>
      </v-tab-item>
      <v-tab-item>
        <kanban-board :value="serviceTickets">
          <template
            slot="kanban-card"
            slot-scope="props"
          >
            <v-card
              :key="props.data.id"
              class="mb-2"
            >
              <v-card-text class="warning--text">
                {{ props.data.name }}
              </v-card-text>
            </v-card>
          </template>
        </kanban-board>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import { mdiDotsHorizontal } from '@mdi/js'
import KanbanBoard from '@/components/misc/KanbanBoard.vue'

export default {
  components: {
    KanbanBoard,
  },
  setup() {
    const activeTab = ref(0)
    // eslint-disable-next-line no-bitwise
    const randomHex = () => (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0').toUpperCase()
    const returTickets = ref([
      {
        id: 1,
        name: 'Status 1',
        color: randomHex(),
        lists: [
          {
            id: 1,
            name: 'Ticket 1',
            data: 'Ticket 2',
          },
          {
            id: 2,
            name: 'Ticket 2',
            data: 'Ticket 2',
          },
          {
            id: 3,
            name: 'Ticket 3',
            data: 'Ticket 2',
          },
        ],
      },
      {
        id: 2,
        name: 'Status 2',
        color: randomHex(),
        lists: [
          {
            id: 4,
            name: 'Ticket 4',
            data: 'Ticket 2',
          },
          {
            id: 5,
            name: 'Ticket 5',
            data: 'Ticket 2',
          },
          {
            id: 6,
            name: 'Ticket 6',
            data: 'Ticket 2',
          },
        ],
      },
    ])

    const complaintTickets = ref([
      {
        id: 1,
        name: 'Status 1',
        color: randomHex(),
        lists: [
          {
            id: 1,
            name: 'Ticket 1',
            data: 'Ticket 2',
          },
          {
            id: 2,
            name: 'Ticket 2',
            data: 'Ticket 2',
          },
          {
            id: 3,
            name: 'Ticket 3',
            data: 'Ticket 2',
          },
        ],
      },
      {
        id: 2,
        name: 'Status 2',
        color: randomHex(),
        lists: [
          {
            id: 4,
            name: 'Ticket 4',
            data: 'Ticket 2',
          },
          {
            id: 5,
            name: 'Ticket 5',
            data: 'Ticket 2',
          },
          {
            id: 6,
            name: 'Ticket 6',
            data: 'Ticket 2',
          },
        ],
      },
      {
        id: 3,
        name: 'Status 3',
        color: randomHex(),
        lists: [
          {
            id: 7,
            name: 'Ticket 7',
            data: 'Ticket 2',
          },
          {
            id: 8,
            name: 'Ticket 8',
            data: 'Ticket 2',
          },
          {
            id: 9,
            name: 'Ticket 9',
            data: 'Ticket 2',
          },
        ],
      },
      {
        id: 4,
        name: 'Status 4',
        color: randomHex(),
        lists: [
          {
            id: 10,
            name: 'Ticket 10',
            data: 'Ticket 2',
          },
          {
            id: 11,
            name: 'Ticket 11',
            data: 'Ticket 2',
          },
          {
            id: 12,
            name: 'Ticket 12',
            data: 'Ticket 2',
          },
        ],
      },
    ])

    const serviceTickets = ref([
      {
        id: 1,
        name: 'Status 1',
        color: randomHex(),
        lists: [
          {
            id: 1,
            name: 'Ticket 1',
            data: 'Ticket 2',
          },
          {
            id: 2,
            name: 'Ticket 2',
            data: 'Ticket 2',
          },
          {
            id: 3,
            name: 'Ticket 3',
            data: 'Ticket 2',
          },
        ],
      },
      {
        id: 2,
        name: 'Status 2',
        color: randomHex(),
        lists: [
          {
            id: 4,
            name: 'Ticket 4',
            data: 'Ticket 2',
          },
          {
            id: 5,
            name: 'Ticket 5',
            data: 'Ticket 2',
          },
          {
            id: 6,
            name: 'Ticket 6',
            data: 'Ticket 2',
          },
        ],
      },
      {
        id: 3,
        name: 'Status 3',
        color: randomHex(),
        lists: [
          {
            id: 7,
            name: 'Ticket 4',
            data: 'Ticket 2',
          },
          {
            id: 8,
            name: 'Ticket 5',
            data: 'Ticket 2',
          },
          {
            id: 9,
            name: 'Ticket 6',
            data: 'Ticket 2',
          },
        ],
      },
    ])

    return {
      activeTab,
      returTickets,
      complaintTickets,
      serviceTickets,

      icons: {
        mdiDotsHorizontal,
      },
    }
  },
}
</script>

<style>

</style>
