<template>
  <button
    :class="{ 'is-active': editor.isActive('superscript')}"
    class="bubble"
    @click="editor.chain().focus().toggleSuperscript().run()"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 35 32"
      fill="none"
    >
      <path
        d="M33 6H29V8H35V10H27V6C27 4.9 27.9 4 29 4H33V2H27V0H33C34.1 0 35 0.9 35 2V4C35 5.1 34.1 6 33 6ZM0.76001 32H6.08001L12.88 21.16H13.12L19.92 32H25.24L15.94 17.46L24.62 4H19.26L13.12 13.98H12.88L6.70001 4H1.38001L10.02 17.46L0.76001 32Z"
        fill="#272829"
        fill-opacity="0.85"
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
