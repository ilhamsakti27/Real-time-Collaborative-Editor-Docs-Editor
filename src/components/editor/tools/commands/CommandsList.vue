<template>
  <div
    id="slash-menu"
    class="items"
  >
    <template
      v-if="items.length"
    >
      <button
        v-for="(item, index) in items"
        :key="index"
        class="item"
        :class="{ 'is-selected': index === selectedIndex }"
        @click="selectItem(index)"
      >
        <!-- {{ item }} -->
        <!-- list of menu -->
        <span v-html="item.icon" /> <span>{{ item.title }}</span>
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
/* eslint-disable */
export default {
  props: {
    items: {
      type: Array,
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
        this.enterHandler()
        return true
      }
      return false
    },

    upHandler() {
      this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
      this.scrollToSelectedUp()
    },

    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
      this.scrollToSelectedDown()
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

    scrollToSelectedDown() {
      const slashMenuElement = document.getElementById('slash-menu');
      const selectedItem = slashMenuElement.querySelector('.is-selected');
      if (selectedItem) {
        const offsetTop = selectedItem.offsetTop;
        slashMenuElement.scrollTop = offsetTop;
      }
    },

    scrollToSelectedUp() {
      const slashMenuElement = document.getElementById('slash-menu');
      const selectedItem = slashMenuElement.querySelector('.is-selected');
      if (selectedItem) {
        // const offsetTop = selectedItem.offsetTop;
        slashMenuElement.scrollTop -= 25;
      }
    }
  },
}
</script>

<style lang="scss">
.items {
  padding: 8px 4px;
  border-radius: 6px;
  border: 1px solid #D9D9D9;
  background: #f8f7f7;
  box-shadow: 0px 4px 16px 2px rgba(0, 0, 0, 0.15);
  overflow: auto;
  width: 200px;
  height: 320px;
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
    // border-color: #000;
    background-color: #d8d9daa1;
  }
}
.item span svg{
  display: inline-block;
  width: 2em;
}
</style>
