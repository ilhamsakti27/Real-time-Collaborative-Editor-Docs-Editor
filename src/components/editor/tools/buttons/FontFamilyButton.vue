<!-- eslint-disable -->
<template>
  <div @mouseenter="menuFontFamily" data-tooltip="Font family" class="w-max-content" ref="fontMenu">
    <button class="flex items-center justify-center">
      <div class="text-sm">Font-Family</div>
      <!-- down arrow icon -->
      <div class="inline arrow-icon">
        <svg class="" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true"
          fill="currentColor" focusable="false">
          <path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path>
        </svg>
      </div>
    </button>

    <template>
      <div ref="fontTools">
        <!-- dropdown menu text color -->
        <div class="pb-3 pt-2 border-b labelFontFamily">
          <div class="px-3 py-2 text-black/40 text-xs font-semibold">Font Family</div>
          <button v-for="(  item, index  ) in fontFamily" :key="index" class="btn-font"
            :class="{ 'is-active': editor.isActive('textStyle', { fontFamily: item.class }) }"
            @click="setFont(item.class, index)">

            {{ item.name }}

          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
/* eslint-disable */
import fontFamily from '../utils/fontFamily';
import tippy from 'tippy.js';

export default {
  props: ['editor'],
  data() {
    return {
      toggleFontFamily: false,
      fontFamily: fontFamily,
    }
  },
  mounted() {
    tippy(this.$refs.fontMenu, {
      content: this.$refs.fontTools,
      appendTo: () => this.$refs.fontMenu,
      placement: 'bottom-start',
      trigger: 'mouseenter',
      interactive: true,
    });
  },
  methods: {
    menuFontFamily() {
      this.toggleFontFamily = !this.toggleFontFamily
      document.addEventListener("click", this.clickOutsideHandler);
    },
    clickOutsideHandler(event) {
      if (!this.$el.contains(event.target)) {
        this.toggleFontFamily = false;
      }
    },
    setFont(font, index) {
      this.editor.chain().focus().setFontFamily(font).run();
    }
  }
}
</script>

<style>
.labelFontFamily {
  margin-top: -8px;
  /* left: 10; */
  background-color: #fff;
  color: #000;
  padding: 2px;
  border-radius: 3px;
  width: 115px;
  @apply text-sm shadow-md border
}

.btn-font {
  display: block;
  padding: 4px 10px;
  width: 100%;
  text-align: left;
  border-radius: 4px;
}

.btn-font:hover {
  background-color: #e2e1e1fa;
}
</style>../utils/fontFamily