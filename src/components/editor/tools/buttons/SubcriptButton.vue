<template>
  <button
    :class="{ 'is-active': editor.isActive('subscript')}"
    class="bubble"
    @click="editor.chain().focus().toogleSubscript().run()"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M44 36H40V38H46V40H38V36C38 34.9 38.9 34 40 34H44V32H38V30H44C45.1 30 46 30.9 46 32V34C46 35.1 45.1 36 44 36ZM11.76 36H17.08L23.88 25.16H24.12L30.92 36H36.24L26.94 21.46L35.62 8H30.26L24.12 17.98H23.88L17.7 8H12.38L21.02 21.46L11.76 36Z"
        fill="#272829"
        fill-opacity="0.8"
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
