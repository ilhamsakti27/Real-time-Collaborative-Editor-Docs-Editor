<!-- eslint-disable vue/no-v-html -->
<template>
  <button
    id="menuButton"
    ref="tool"
    :aria-label="label"
    v-html="content"
  />
</template>

<script>
export default {
  props: {
    clickHandler: {
      type: String,
      required: false,
      default: null,
    },

    content: {
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
  },

}
</script>

<style scoped>
#menuButton {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: rgb(71 85 105);
  border-radius: 0.25rem; /* 4px */
  gap: 0.75rem; /* 12px */
  padding: 0.125rem; /* 2px */
}
</style>
