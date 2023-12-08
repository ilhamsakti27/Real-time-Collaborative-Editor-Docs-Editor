<template>
  <div
    ref="dropdown"
    style="position: relative;"
    class="group text-sm"
  >
    <slot />
    <div
      v-if="hasDropdown"
      ref="dropdownContent"
      style="z-index: 10;background-color: white;  overflow: hidden;white-space: nowrap;position: absolute;bottom: 100%; border-radius: 4px;"
      class="shadow-md group-focus-within:block sm:bottom-auto sm:top-full"
      :class="align == 'left' ? 'left-0' : 'right-0'"
    >
      <div
        ref="item"
      >
        <div
          style="padding:0.5rem 0.5rem; color:rgba(0,0,0,0.4); font-weight: 600;"
          class="text-xs"
        >
          {{ action }} Action
        </div>
        <slot name="dropdown" />
      </div>
    </div>
  </div>
</template>

<script>

import tippy from 'tippy.js'

export default {
  props: {
    action: {
      type: String,
      default: null,
    },
    align: {
      type: String,
      default: 'left',
    },
    iconName: {
      type: String,
      required: false,
      default: null,
    },
    iconSvg: {
      type: String,
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: false,
      default: null,
    },
    activeClass: {
      type: String,
      required: false,
      default: '!bg-slate-600 hover:!bg-slate-700 !text-white rounded',
    },
    active: {
      type: Boolean,
    },
  },
  computed: {
    hasDropdown() {
      return !!this.$slots.dropdown
    },
  },
  mounted() {
    tippy(this.$refs.dropdown, {
      content: this.$refs.dropdownContent,
      appendTo: () => this.$refs.dropdown,
      placement: 'right-end',
      zIndex: 999,
      trigger: 'click',
      interactive: true,
    })
  },
}
</script>
