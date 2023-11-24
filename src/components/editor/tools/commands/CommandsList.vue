<template>
  <div
    v-show="topLevelNodeType !== 'table' && topLevelNodeType !== 'orderedList' && topLevelNodeType !== 'title'"
    ref="itemsContainer"
    class="items flex flex-col gap-y-1"
  >
    <template v-if="items.length">
      <button
        v-for="(item, index) in items"
        id="popup"
        :key="index"
        class="item"
        :class="{ 'is-selected': index === selectedIndex }"
        @click="selectItem(index)"
      >
        <!-- {{ item }} -->
        <!-- list of menu -->
        <div class="flex items-center gap-x-2">
          <div class="border rounded-md p-2">
            <span v-html="item.icon" />
          </div>
          <div class="flex flex-col">
            <span class="text-md">{{ item.title }}</span>
            <span class="text-black/50 text-sm">{{ item.desc }}</span>
          </div>
        </div>
      </button>
    </template>
    <div
      v-else
      class="item"
    >
      No result
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    editor: {
      type: Array, // type
      required: true,
    },
    command: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      selectedIndex: 0,
      topLevelNodeType: null, // Renamed from topLevelNodeType
    }
  },

  computed: {
    itemsWithInsertCommand() {
      return this.items.filter(item => item.insertCommand)
    },

  },

  watch: {
    items() {
      this.selectedIndex = 0
    },
    topLevelNodeType: {
      handler() {
        let node = null
        const selectionStart = this.editor.view.state.selection.$from
        if (selectionStart.node(1) == null && this.editor.view.lastSelectedViewDesc) {
          node = this.editor.view.lastSelectedViewDesc.node
        } else {
          node = selectionStart.node(1)
        }
        console.log(node.type.name)

        // Update the data property
        this.topLevelNodeType = node.type.name
      },
      immediate: true, // This ensures the watcher is triggered on component mount
    },

  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()

        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()

        return true
      }

      if (event.key === 'Enter') {
        event.preventDefault()
        this.enterHandler()

        return true
      }

      return false
    },

    upHandler() {
      if (this.selectedIndex > 0) {
        this.selectedIndex -= 1
        this.scrollIfNeeded()
      }
    },

    downHandler() {
      if (this.selectedIndex < this.items.length - 1) {
        this.selectedIndex += 1
        this.scrollIfNeeded()
      }
    },

    scrollIfNeeded() {
      const { itemsContainer } = this.$refs
      if (itemsContainer) {
        const itemHeight = 60 // Adjust this value based on your item height
        const containerHeight = itemsContainer.clientHeight
        const scrollPosition = itemsContainer.scrollTop

        const scrollToIndex = this.selectedIndex

        if (scrollToIndex * itemHeight < scrollPosition) {
          // Scroll up
          itemsContainer.scrollTop = scrollToIndex * itemHeight
        } else if ((scrollToIndex + 1) * itemHeight > scrollPosition + containerHeight) {
          // Scroll down
          itemsContainer.scrollTop = (scrollToIndex + 1) * itemHeight - containerHeight
        }
      }
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]

      if (item) {
        this.command(item)
      }
    },
  },
}
</script>

<style lang="scss">
.items {
  padding: 8px 4px;
  border-radius: 6px;
  border: 1px solid #D9D9D9;
  background: white;
  box-shadow: 0px 4px 16px 2px rgba(0, 0, 0, 0.15);
  overflow: scroll;
  max-height: 300px;
}

.items::-webkit-scrollbar {
  width: 3px;
}

.items::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 50px;
}

.items::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
  border: 7px solid transparent;
}

.item {
  display: block;
  margin: 0;
  width: 100%;
  text-align: left;
  background: transparent;
  border-radius: 0.4rem;
  border: 1px solid transparent;
  padding: 0.2rem 0.4rem;

  &.is-selected {
    background-color: #d8d9daa1;
  }
}

.item span svg {
  display: inline-block;
  width: 2em;
}
</style>
