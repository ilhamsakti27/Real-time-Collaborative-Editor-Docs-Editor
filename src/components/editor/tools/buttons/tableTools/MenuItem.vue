<!-- eslint-disable vue/html-self-closing -->
<template>
  <div
    ref="dropdown"
    style="position: relative;"
    class="group text-sm"
  >
    <slot></slot>
    <div
      v-if="hasDropdown"
      ref="dropdownContent"
      style="z-index: 10;background-color: white; padding: 0 8px; overflow: hidden;white-space: nowrap;position: absolute;bottom: 100%; border-radius: 4px;"
      class="shadow-md group-focus-within:block sm:bottom-auto sm:top-full"
      :class="align == 'left' ? 'left-0' : 'right-0'"
    >
      <div
        ref="item"
        class=" text-sm"
      >
        <div
          style="padding-left: 0.5rem;
            padding-right: 0.5rem;
            padding-bottom: 0.5rem;
            font-size: 0.75rem;
            line-height: 1rem;
            font-weight: 600; "
        >
          {{ action }}Action
        </div>
        <slot name="dropdown"></slot>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/order-in-components */
/* eslint-disable vue/require-default-prop */

import tippy from 'tippy.js'

export default {
  computed: {
    hasDropdown() {
      return !!this.$slots.dropdown
    },
  },
  props: {
    action: {
      type: String,
    },
    align: {
      type: String,
      default: 'left',
    },
    iconName: {
      type: String,
      required: false,
    },
    iconSvg: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
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
