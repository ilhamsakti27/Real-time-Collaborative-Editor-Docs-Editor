<!-- eslint-disable -->
<template>
  <button ref="tool" class="w-full flex flex-row items-center text-slate-600 rounded gap-2 " :aria-label="label"
    v-html="content"></button>
</template>

<script>
/* eslint-disable */

export default {
  props: {
    clickHandler: {
      type: String,
      required: false,
    },

    content: {
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
      default: "!bg-slate-600 hover:!bg-slate-700 !text-white",
    },
    active: {
      type: Boolean,
    },
  },

};
</script>
