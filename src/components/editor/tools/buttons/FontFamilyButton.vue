<template>
  <button>
    <button
      :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'Inter' }) }"
      @click="editor.chain().focus().setFontFamily('Inter').run()"
    >
      Inter
    </button>
    <button
      :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' }) }"
      @click="editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()"
    >
      Comic Sans
    </button>
    <button
      :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'serif' }) }"
      @click="editor.chain().focus().setFontFamily('serif').run()"
    >
      serif
    </button>
    <button
      :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'monospace' }) }"
      @click="editor.chain().focus().setFontFamily('monospace').run()"
    >
      monospace
    </button>
    <button
      :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: 'cursive' }) }"
      @click="editor.chain().focus().setFontFamily('cursive').run()"
    >
      cursive
    </button>
    <button
      @click="editor.chain().focus().unsetFontFamily().run()"
    >
      unsetFontFamily
    </button>
  </button>
</template>

<script>
/* eslint-disable */
export default {
  props: ['editor'],
}
</script>