<!-- eslint-disable -->
<template>
  <div id="color-menu" class="dropbtn" @mouseenter="openColorMenu" @mouseleave="closeColorMenu">
    <button>
      <!-- text color icon -->
      <div class="inline">
        <svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none">
          <g clip-path="url(#clip0_15_219)">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M16.856 34.918C16.6079 35.6697 16.0728 36.293 15.3672 36.6519C14.6616 37.0107 13.8427 37.0762 13.0891 36.834C12.3354 36.5917 11.7081 36.0614 11.3437 35.3586C10.9794 34.6558 10.9076 33.8375 11.144 33.082L19.838 6.03399C20.1214 5.15296 20.677 4.38458 21.425 3.83949C22.1729 3.29439 23.0745 3.0007 24 3.0007C24.9255 3.0007 25.8271 3.29439 26.575 3.83949C27.323 4.38458 27.8786 5.15296 28.162 6.03399L36.856 33.082C36.9801 33.458 37.0285 33.8548 36.9985 34.2496C36.9685 34.6444 36.8606 35.0293 36.6811 35.3822C36.5016 35.7351 36.254 36.049 35.9527 36.3057C35.6513 36.5625 35.3021 36.757 34.9251 36.8782C34.5482 36.9994 34.151 37.0447 33.7565 37.0116C33.362 36.9786 32.9779 36.8677 32.6264 36.6855C32.2749 36.5033 31.9629 36.2533 31.7085 35.9499C31.4541 35.6466 31.2622 35.2958 31.144 34.918L28.598 27H19.402L16.856 34.918ZM21.33 21H26.67L24 12.692L21.33 21ZM7 42C7 41.2043 7.31607 40.4413 7.87868 39.8787C8.44129 39.3161 9.20435 39 10 39H38C38.7956 39 39.5587 39.3161 40.1213 39.8787C40.6839 40.4413 41 41.2043 41 42C41 42.7956 40.6839 43.5587 40.1213 44.1213C39.5587 44.6839 38.7956 45 38 45H10C9.20435 45 8.44129 44.6839 7.87868 44.1213C7.31607 43.5587 7 42.7956 7 42Z"
              fill="#272829" fill-opacity="0.85" />
          </g>
          <defs>
            <clipPath id="clip0_15_219">
              <rect width="48" height="48" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <!-- down arrow icon -->
      <div class="inline arrow-icon">
        <svg class="inline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 10L12 15L17 10" stroke="#272829" fill-opacity="0.85" stroke-opacity="0.85" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </button>

    <!-- dropdown menu text color -->
    <template>
      <div id="dropdownMenu" class="dropdownContent" v-show="showColorDropdown">
        <button v-for="(item, index) in colorFonts" :key="index"
          :class="{ 'is-active': editor.isActive('textStyle', { color: item.setColor }) }"
          @click="setColor(item.setColor)">
          <span v-html="item.mainIcon" />
          <span class="space">{{ item.name }}</span>
        </button>
      </div>
    </template>
  </div>
</template>

<script>
/* eslint-disable */
import colorFonts from "../colorFonts"
export default {
  props: ['editor'],
  data() {
    return {
      showColorDropdown: false,
      colorFonts: colorFonts,
    };
  },
  methods: {
    openColorMenu() {
      this.showColorDropdown = true;
    },
    closeColorMenu() {
      this.showColorDropdown = false;
    },
    setColor(color) {
      this.editor.chain().focus().setColor(color).run();
      this.showColorDropdown = false;
    },
  },

}
</script>

<style scoped>
/* text color button */
#color-menu {
  display: inline;
}
.inline {
  display: inline;
}
.arrow-icon {
  margin-left: -2px;
}

/* dropdown text color menu */
.dropdownContent {
  overflow: auto;
  position: absolute;
  background-color: rgb(253, 253, 253);
  left: 0;
  z-index: 1;
  border-radius: 0 0 4px 4px;
  padding: 0.5vh 0.5vh;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  /* border: 1px solid rgba(0, 0, 0, 0.5);; */
  box-shadow: 0px 4px 16px 2px rgba(0, 0, 0, 0.35);
  width: 120px;
  @apply shadow-md

  /* Add the top property to move the dropdown downward */
}
.dropdownContent button {
  padding: 2px 8px;
  min-width: 110px;
  text-align: left;
}
.dropdownContent button:hover {
  background-color: #ececec;
  border-radius: 4px;
}
.space {
  margin-left: 4px;
}
</style>
