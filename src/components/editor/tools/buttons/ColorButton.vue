<template>
  <button>
    <button
      :class="{ 'is-active': editor.isActive('textStyle', { color: '#958DF1' })}"
      @click="editor.chain().focus().setColor('#958DF1').run()"
    >
      purple
    </button>
    <br>
    <button
      :class="{ 'is-active': editor.isActive('textStyle', { color: '#F98181' })}"
      @click="editor.chain().focus().setColor('#F98181').run()"
    >
      red
    </button>
  </button>
</template>

<script>
/* eslint-disable */
export default {
  props: ['editor'],
}
</script>
