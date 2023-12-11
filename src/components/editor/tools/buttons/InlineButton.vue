<template>
  <div>
    <div
      id="popup"
      ref="inlineBtn"
      class="flex"
    >
      <template v-if="filteredItems.length">
        <button
          v-for="(item, index) in filteredItems"
          :id="item.title === 'Link' || item.title === 'Others' ? 'more' : item.title === 'Format Align' ? 'align' : ''"
          :ref="item.ref"
          :key="index"
        >
          <!-- list of menu -->
          <div
            class="icon-container flex menu items-center gap-x-2 bubble-menu-btn border-r"
            :data-tooltip="item.title"
            @mouseover="handleHover(index)"
            @click="selectItem(index)"
          >
            <div class="flex flex-col">
              <div class=" rounded-md">
                <span v-html="item.icon" />
              </div>
            </div>
          </div>
        </button>
      </template>
      <div
        v-else
      >
        No data
      </div>
    </div>
  </div>
</template>

<script>
import defaultInlineTools from '../utils/inlineTools'
import { mergeArrays } from '../../utils/utils'
import { moreTools } from './moreToolsBtn'
import { alignFormat } from './alignTools'

export default {
  props: {
    inlineTools: {
      type: Array,
      default: () => [],
    },
    editor: {
      required: true,
      type: Object,
    },
    node: {
      type: null,
      required: true,
    },
  },
  data() {
    return {
      allInlineTools: [],
      moreLineTools: [],
      selectedIndex: -1,
      isMoreTools: false,
    }
  },
  computed: {
    hrefValue() {
      return this.editor.getAttributes('link').href
    },
    filteredItems() {
      return this.allInlineTools.filter(item => {
        switch (item.title) {
          case 'Others':
            return !this.editor.isActive('table')
          case 'Format Align':
            return !this.editor.isActive('table')
          case 'Link':
            return !this.editor.isActive('table')

          default:
            break
        }

        return true
      })
    },
  },
  watch: {
    hrefValue(newHref, oldHref) {
      this.handleHrefChange(newHref, oldHref)
    },
  },
  mounted() {
    this.allInlineTools = mergeArrays(defaultInlineTools(this.editor), this.inlineTools)
  },
  methods: {
    handleHrefChange() {
      this.allInlineTools = mergeArrays(defaultInlineTools(this.editor), this.inlineTools)
    },
    handleHover(index) {
      this.selectedIndex = index
      const item = this.allInlineTools[this.selectedIndex]
      this.isMoreTools = true
      if (item.tools) {
        if (item.title === 'Others') moreTools(this.editor, item.tools, this.isMoreTools, 'Inline Tools')
        if (item.title === 'Format Align') alignFormat(this.editor, item.tools, this.isMoreTools, 'Format Align')
      }
    },
    selectItem(index) {
      this.selectedIndex = index
      const item = this.allInlineTools[index]
      if (item.command) item.command(this.editor, this.node)
    },
  },
}
</script>

<style>
.icon-container {
    position: relative;
}
</style>
