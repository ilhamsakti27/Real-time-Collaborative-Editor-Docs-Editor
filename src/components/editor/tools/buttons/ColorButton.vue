<!-- eslint-disable -->
<template>
  <div id="color-menu" class="dropbtn">
    <div ref="colorMenu" class="">
      <button>
        <!-- text color icon -->
        <div class="flex gap-x-2 items-center">
          <div class="inline">
            <span v-html="selectedIndex === null ? defaultIcon : colorFonts[selectedIndex].mainIcon" :class="['border rounded-md pad', isHighlight && selectedIndex !== null ?
              colorFonts[selectedIndex].name !== 'Default' ?
                `bg-[${colorFonts[selectedIndex].setColor}]/20` : ''
              : ''
            ]" />
          </div>
          <div class="text-sm">Paragraph</div>

          <!-- down arrow icon -->
          <div class="inline arrow-icon">
            <svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24"
              height="24" aria-hidden="true" fill="currentColor" focusable="false">
              <path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path>
            </svg>
          </div>
        </div>
      </button>
    </div>

    <template>
      <div ref="colorTools" id="dropdownMenu" class="dropdownContent">
        <!-- Latest Color -->
        <div class="pb-3 border-b">
          <div class="px-3 py-2 text-black/40 text-xs font-semibold">
            Latest use
          </div>
          <button
            @click="selectedIndex !== null ?
              isHighlight ? setHighlight(colorFonts[selectedIndex].setColor, selectedIndex) : setColor(colorFonts[selectedIndex].setColor, selectedIndex) : ''"
            class="">
            <span v-html="selectedIndex === null ? defaultIcon : colorFonts[selectedIndex].mainIcon" :class="['border rounded-md pad', isHighlight && selectedIndex !== null ?
              colorFonts[selectedIndex].name !== 'Default' ?
                `bg-[${colorFonts[selectedIndex].setColor}]/20` : ''
              : ''
            ]" />
            <span class="space-x-1">
              {{ selectedIndex === null ? 'Default' : colorFonts[selectedIndex].name }}
            </span>
          </button>
        </div>

        <!-- dropdown menu text color -->
        <div class="pb-3 pt-2 border-b">
          <div class="px-3 py-2 text-black/40 text-xs font-semibold">Text Color</div>
          <button v-for="(  item, index  ) in colorFonts" :key="index"
            :class="{ 'is-active': editor.isActive('textStyle', { color: item.setColor }) }"
            @click="setColor(item.setColor, index)">
            <span v-html="item.mainIcon" class="border rounded-md pad" />
            <span class="space">{{ item.name }}</span>
          </button>
        </div>

        <!-- dropdown menu highlight color -->
        <div class="pb-3 pt-2 ">
          <div class="text-black/40 text-xs font-semibold px-3 py-2">Highlight Color</div>
          <button v-for="(  item, index  ) in colorFonts" :key="index" @click="setHighlight(item.setColor, index)">
            <span v-html="item.mainIcon"
              :class="['border rounded-md pad', item.name !== 'Default' ? `bg-[${item.setColor}]/20` : '']" />
            <span class=" space">{{ item.name }}</span>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
/* eslint-disable */
import colorFonts from "../colorFonts"
import tippy from 'tippy.js';

export default {
  props: ['editor'],
  data() {
    return {
      colorFonts: colorFonts,
      isHighlight: false,
      selectedIndex: null,
      defaultIcon: '<svg class="inline" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none"><g clip-path="url(#clip0_15_219)"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.856 34.918C16.6079 35.6697 16.0728 36.293 15.3672 36.6519C14.6616 37.0107 13.8427 37.0762 13.0891 36.834C12.3354 36.5917 11.7081 36.0614 11.3437 35.3586C10.9794 34.6558 10.9076 33.8375 11.144 33.082L19.838 6.03399C20.1214 5.15296 20.677 4.38458 21.425 3.83949C22.1729 3.29439 23.0745 3.0007 24 3.0007C24.9255 3.0007 25.8271 3.29439 26.575 3.83949C27.323 4.38458 27.8786 5.15296 28.162 6.03399L36.856 33.082C36.9801 33.458 37.0285 33.8548 36.9985 34.2496C36.9685 34.6444 36.8606 35.0293 36.6811 35.3822C36.5016 35.7351 36.254 36.049 35.9527 36.3057C35.6513 36.5625 35.3021 36.757 34.9251 36.8782C34.5482 36.9994 34.151 37.0447 33.7565 37.0116C33.362 36.9786 32.9779 36.8677 32.6264 36.6855C32.2749 36.5033 31.9629 36.2533 31.7085 35.9499C31.4541 35.6466 31.2622 35.2958 31.144 34.918L28.598 27H19.402L16.856 34.918ZM21.33 21H26.67L24 12.692L21.33 21ZM7 42C7 41.2043 7.31607 40.4413 7.87868 39.8787C8.44129 39.3161 9.20435 39 10 39H38C38.7956 39 39.5587 39.3161 40.1213 39.8787C40.6839 40.4413 41 41.2043 41 42C41 42.7956 40.6839 43.5587 40.1213 44.1213C39.5587 44.6839 38.7956 45 38 45H10C9.20435 45 8.44129 44.6839 7.87868 44.1213C7.31607 43.5587 7 42.7956 7 42Z" fill="#272829" fill-opacity="0.85" /></g><defs><clipPath id="clip0_15_219"><rect width="48" height="48" fill="white" /></clipPath></defs></svg>'
    };
  },
  mounted() {
    tippy(this.$refs.colorMenu, {
      content: this.$refs.colorTools,
      appendTo: () => this.$refs.colorMenu,
      placement: 'bottom-start',
      trigger: 'mouseenter',
      interactive: true,
    });
  },
  methods: {
    setColor(color, index) {
      this.selectedIndex = index
      this.isHighlight = false
      if (color === '#000') {
        this.editor.chain().focus().unsetColor().blur().run();
      } else {
        this.editor.chain().focus().setColor(color).blur().run();
      }
    },
    setHighlight(color, index) {
      this.selectedIndex = index
      this.isHighlight = true
      if (color === '#000') {
        this.editor.chain().focus().unsetHighlight().blur().run();
      } else {
        this.editor.chain().focus().toggleHighlight({ color }).blur().run();
      }
    }
  },

}
</script>

<style scoped>
/* text color button */
#color-menu {
  display: inline;
  position: sticky;
}

.inline {
  display: inline;
}

.arrow-icon {
  margin-left: -2px;
}

/* dropdown text color menu */
.dropdownContent {
  background-color: rgb(255, 255, 255);
  border-radius: 0 0 4px 4px;
  margin-top: -5px;
  padding: 0.5vh 0.5vh;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 16px 2px rgba(0, 0, 0, 0.35);
  width: 150px;
  max-height: 50vh;
  margin-left: -10px;
  @apply shadow-md overflow-y-auto
}

.dropdownContent::-webkit-scrollbar {
  width: 3px;
}

.dropdownContent::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 50px;
}

.dropdownContent::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 20px;
  border: 7px solid transparent;
}

.dropdownContent button {
  padding: 4px 8px;
  text-align: left;
  margin: 2px 0;
  width: 100%;
}

.dropdownContent button:hover {
  background-color: #ececec;
  border-radius: 4px;
}

.space {
  margin-left: 4px;
}

.pad {
  padding: 4px;
}
</style>
