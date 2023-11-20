<!-- eslint-disable -->
<template>
  <div ref="dropdown" class="group text-sm relative">
    <slot></slot>
    <div ref="dropdownContent" v-if="hasDropdown"
      class="z-10 bg-white shadow py-2 group-focus-within:block hidden overflow-hidden whitespace-nowrap absolute bottom-full sm:bottom-auto sm:top-full mt-4 rounded border border-slate-400"
      :class="align == 'left' ? 'left-0' : 'right-0'">
      <slot ref="item" name="dropdown"> </slot>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import tippy from "tippy.js"
export default {
  computed: {
    hasDropdown() {
      return !!this.$slots.dropdown;
    },
  },

  props: {
    align: {
      type: String,
      default: "left",
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
      default: "!bg-slate-600 hover:!bg-slate-700 !text-white rounded",
    },
    active: {
      type: Boolean,
    },
  },
  mounted() {
    tippy(this.$refs.dropdown, {
      content: this.$refs.dropdownContent,
      appendTo: () => this.$refs.dropdown,
      placement: 'bottom-start',
      trigger: 'click',
      interactive: true,
    });
  },
};
</script>
