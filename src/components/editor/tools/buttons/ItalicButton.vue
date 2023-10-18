<template>
  <button
    :class="{ 'is-active': editor.isActive('italic')}"
    class="bubble"
    @click="editor.chain().focus().toggleItalic().run()"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M10.0834 4.58333H15.5834M6.41669 17.4167H11.9167M12.8334 4.58333L9.16669 17.4167"
        stroke="#272829"
        stroke-opacity="0.8"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
/* eslint-disable */
export default {
  props: ['editor'],
}
</script>
