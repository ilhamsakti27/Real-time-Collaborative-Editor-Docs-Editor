<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    id="item-btn"
    style="display: flex; align-items: center; column-gap: 8px; padding: 4px 8px;cursor: pointer;"
    @click="handleClick"
  >
    <div
      style="margin: auto 0;display: flex;"
      v-html="content"
    />
    <div>
      {{ label }}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    content: {
      type: String,
      required: false,
      default: null,
    },
    clickHandler: {
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
      default: '!bg-slate-600 hover:!bg-slate-700 !text-white',
    },
    active: {
      type: Boolean,
    },
    editor: {
      type: Object,
      default: null,
    },
    tool: {
      type: Object,
      default: null,
    },
  },
  methods: {
    handleClick() {
      this.tool.command(this.editor)
    },
  },
}
</script>
<style scoped>
#item-btn:hover{
  background-color: #e1e1e1;
}
</style>
