<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    ref="itemsContainer"
    class="menuContainer"
  >
    <div
      style="padding-left: 8px;color: rgba(0,0,0,0.4);font-weight: 600;"
      class=" text-xs"
    >
      Action
    </div>
    <template v-if="filteredItems.length">
      <button
        v-for="(item, index) in filteredItems"
        :ref="item.ref"
        :key="index"
        class="item"
        :class="{ 'is-selected': index === selectedIndex }"
        @click="selectItem(index)"
        @mouseover="handleHover(index)"
      >
        <!-- {{ item }} -->
        <!-- list of menu -->
        <div
          style="display: flex;align-items: center;column-gap: 8px;"
          class="menu"
        >
          <div class="icon-wrapper">
            <span
              v-html="item.icon"
            />
          </div>
          <div style="display: flex;flex-direction: column;">
            <span class="text-sm">{{ item.title }}</span>
            <span
              style="color: rgba(0,0,0,0.4);"
              class="text-xs"
            >{{ item.desc }}</span>
          </div>
        </div>
      </button>
    </template>
    <div
      v-else
      class="item"
    >
      <div class="text-black/50 text-xs text-center font-semibold">
        No Action Available
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    editor: {
      required: true,
    },
    topLevelNodeType: {
      required: true,
    },
    isSubMenu: {
      required: true,
    },
    isNodeUp: true,
    isNodeDown: true,
  },

  data() {
    return {
      selectedIndex: 0,
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        if (item.title === 'Delete') {
          return this.editor.can().deleteNode(this.topLevelNodeType)
        } else if (item.ref === 'unsetHghlBtn') {
          return this.editor.isActive('highlight')
        } else if (item.ref === 'unsetColorBtn') {
          return this.editor.isActive('textStyle')
        } else if (item.ref === 'moveUpBtn') {
          return this.canMoveNodeUp()
        } else if (item.ref === 'moveDownBtn') {
          return this.canMoveNodeDown()
        } else if (item.ref === 'toggleHeaderColumn' || item.ref === 'toggleHeaderRow') {
          return this.editor.isActive('table')
        } else if (item.ref === 'convertBtn') {
          switch (this.topLevelNodeType) {
            case 'image':
              return false
            case 'video':
              return false
            case 'codeBlock':
              return false
            case 'callout':
              return false
            case 'bookmark':
              return false
            case 'youtube':
              return false
            case 'table':
              return false
            case 'linkPage':
              return false
            default:
              break
          }
        }

        return true
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      const el = this.$refs.itemsContainer
      el.focus()
      el.addEventListener('keydown', this.keyDownHandler)
    })
  },
  methods: {
    selectItem() {
      const item = this.filteredItems[this.selectedIndex]
      console.log(item.title)
      if (item) {
        item.command(this.editor, this.topLevelNodeType)
      }
    },
    upHandler() {
      // stop scroll event jika sudah mentok
      if (this.selectedIndex <= 0) {
        this.selectedIndex = 0
      } else {
        this.selectedIndex -= 1
      }
      // ref untuk element items
      const { itemsContainer } = this.$refs
      // logic scroll key down
      if (itemsContainer && this.selectedIndex <= (this.items.length / 2)) {
        // scroll untuk key down pada index
        const scrollPosition = itemsContainer.scrollTop
        if (this.selectedIndex >= 0) {
          const newScrollPosition = scrollPosition - 60
          itemsContainer.scrollTop = newScrollPosition
        }
      }
    },
    handleHover(index) {
      this.selectedIndex = index
    },
    downHandler() {
      // stop scroll event jika sudah mentok
      if (this.selectedIndex >= this.items.length - 1) {
        this.selectedIndex = this.items.length - 1
      } else {
        this.selectedIndex += 1
      }

      // ref untuk element items
      const { itemsContainer } = this.$refs
      // logic scroll key down
      if (itemsContainer && this.selectedIndex >= (this.items.length / 3) + 1) {
        // scroll untuk key down pada index >= ke-setengah item
        const scrollPosition = itemsContainer.scrollTop
        if (this.selectedIndex !== this.items.length) {
          const newScrollPosition = scrollPosition + 60
          itemsContainer.scrollTop = newScrollPosition
        }
      }
    },
    enterHandler() {
      this.selectItem(this.selectedIndex)
    },
    keyDownHandler(event) {
      event.preventDefault()
      if (this.isSubMenu === true) {
        switch (event.key) {
          case 'ArrowUp':
            this.upHandler()
            break
          case 'ArrowDown':
            this.downHandler()
            break
          case 'Enter':
            this.enterHandler()
          // eslint-disable-next-line
          default:
            break
        }
      }
    },
    canMoveNodeDown() {
      const selectionStart = this.editor.view.state.selection.$from

      return selectionStart.index(0) < selectionStart.node(0).childCount - 1
    },
    canMoveNodeUp() {
      const selectionStart = this.editor.view.state.selection.$from
      if (selectionStart.index(0) === 1) {
        this.isNodeUp = false
      } else {
        this.isNodeUp = true
      }

      return selectionStart.index(0) > 1
    },
  },
}
</script>

<style lang="scss">
.icon-wrapper {
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding: 2px;
    border-radius: 0.375rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 5vh; ;
    align-items: center;
}

.menuContainer {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    border-radius: 6px;
    padding: 12px 4px 0px 4px;
    border: 1px solid #D9D9D9;
    background: white;
    box-shadow: 0px 4px 16px 2px rgba(0, 0, 0, 0.15);
    overflow: scroll;
    max-height: 300px;
    width: 210px;
    z-index: 999;
}

// styling scroll slash menu
.menuContainer::-webkit-scrollbar {
    width: 3px;
}

/* Track (jalur) */
.menuContainer::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 50px;
}

/* Handle (bilah) */
.menuContainer::-webkit-scrollbar-thumb {
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

    &.is-selected {
        // border-color: #000;
        background-color: #d8d9daa1;
    }
}

.item span svg {
    display: inline-block;
    width: 2em;
}
</style>
