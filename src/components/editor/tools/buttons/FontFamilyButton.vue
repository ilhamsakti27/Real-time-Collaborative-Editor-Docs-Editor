<!-- eslint-disable -->
<template>
  <div>
    <button @click="menuFontFamily">
      <div class="text-sm inline">Font-Family</div>
      <!-- down arrow icon -->
      <div class="inline arrow-icon">
        <svg class="w-5 h-5 md:w-6 md:h-6 inline" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24"
          height="24" aria-hidden="true" fill="currentColor" focusable="false">
          <path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path>
        </svg>
      </div>
    </button>
  
    <template>
      <div v-show="toggleFontFamily">
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
import fontFamily from '../fontFamily';

export default {
  props: ['editor'],
  data() {
    return {
      toggleFontFamily: false,
      fontFamily: fontFamily,
    }
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
  position: absolute;
  bottom: 40px;
  font-size: smaller;
  left: 10;
  background-color: #fff;
  color: #000;
  padding: 5px;
  border-radius: 3px;
  width: max-content;
  box-shadow: 0px 4px 16px 2px rgba(0, 0, 0, 0.15);
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

</style>