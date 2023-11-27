<!-- eslint-disable vue/no-v-html -->
<template>
  <!-- <button
    id="menuButton"
    ref="tool"
    style="width: 100%; display: flex; align-items: center; flex-direction: row;border-radius: 0.25rem"
    class="w-full flex flex-row items-center text-slate-600 rounded gap-3 p-0.5"
    :aria-label="label"
    v-html="content">
  </button> -->
  <button
    id="menuButton"
    ref="tool"
    :aria-label="label"
    v-html="content"
  />
</template>

<script>
/* eslint-disable vue/order-in-components */
/* eslint-disable vue/require-default-prop */
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
