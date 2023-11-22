<!-- eslint-disable -->
<template>
  <div class="flex items-center gap-x-2 px-2 hover:bg-slate-100 cursor-pointer" @click="handleClick">
    <div class="border rounded p-1" v-html="content"></div>
    <div class="">{{ label }}</div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    content: {
      type: String,
      required: false,
    },
    clickHandler: {
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
    editor: {
      type: Object
    },
    tool: {
      type: Object,
    }
  },
  methods: {
    handleClick() {
      this.tool.command(this.editor)
    }
  },
};
</script>
