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
        @mouseleave="handleLeave()"
      >
        <!-- {{ item }} -->
        <!-- list of menu -->
        <div id="convert">
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

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    editor: {
      type: Map,
      required: true,
    },
    topLevelNodeType: {
      type: String,
      required: true,
    },
    isSubMenu: {
      type: Boolean,
      required: true,
    },

  },

  data() {
    return {
      selectedIndex: 0,
      isNodeUp: false,
      isNodeDown: false,
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        if (item.title === 'Delete') {
          return this.editor.can().deleteNode(this.topLevelNodeType)
        } if (item.ref === 'unsetHghlBtn') {
          return this.editor.isActive('highlight')
        } if (item.ref === 'pageTitle') {
          return this.editor.isActive('Page')
        } if (item.ref === 'unsetColorBtn') {
          return this.editor.isActive('textStyle')
        } if (item.ref === 'moveUpBtn') {
          return this.canMoveNodeUp()
        } if (item.ref === 'moveDownBtn') {
          return this.canMoveNodeDown()
        } if (item.ref === 'toggleHeaderColumn' || item.ref === 'toggleHeaderRow') {
          return this.editor.isActive('table')
        } if (item.ref === 'convertBtn') {
          const excludedNodeTypes = new Set([
            'image',
            'video',
            'callout',
            'bookmark',
            'youtube',
            'table',
            'Page',
            'orderedList',
            'bulletList',
            'columnBlock',
            'taskList',
            'horizontalRule',
            'toggle',
            'blockquote',
          ])
          if (excludedNodeTypes.has(this.topLevelNodeType)) {
            return false
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
      if (item) {
        item.command(this.editor, this.topLevelNodeType)
      }
    },
    upHandler() {
      if (this.selectedIndex <= 0) {
        this.selectedIndex = 0
      } else {
        this.selectedIndex -= 1
      }
      const { itemsContainer } = this.$refs
      if (itemsContainer && this.selectedIndex <= (this.items.length / 2)) {
        const scrollPosition = itemsContainer.scrollTop
        if (this.selectedIndex >= 0) {
          const newScrollPosition = scrollPosition - 60
          itemsContainer.scrollTop = newScrollPosition
        }
      }
    },
    handleHover(index) {
      this.selectedIndex = index
      const item = this.filteredItems[this.selectedIndex]
      if (item.ref === 'convertBtn') item.command(this.editor, true)
    },
    handleLeave() {
      const items = this.filteredItems.filter(item => item.ref === 'convertBtn')
      if (items) items[0].command(this.editor, false)
    },
    downHandler() {
      if (this.selectedIndex >= this.items.length - 1) {
        this.selectedIndex = this.items.length - 1
      } else {
        this.selectedIndex += 1
      }

      const { itemsContainer } = this.$refs
      if (itemsContainer && this.selectedIndex >= (this.items.length / 3) + 1) {
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
            break
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

    ::-webkit-scrollbar {
      width: 3px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
      border-radius: 50px;
    }
    ::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 20px;
      border: 7px solid transparent;
    }
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
        background-color: #d8d9daa1;
    }
     span svg {
        display: inline-block;
        width: 2em;
    }
}

</style>
