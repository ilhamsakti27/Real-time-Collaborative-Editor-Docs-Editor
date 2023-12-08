<template>
  <node-view-wrapper class="vue-component dom">
    <div
      style="cursor: grab;"
      class="drag-handle content"
      contenteditable="false"
      draggable="true"
      data-drag-handle
    >
      <div class="toggle-list">
        <div class="toggle-btn">
          <button @click="toggleFunction">
            <span v-html="arrowIcon" />
          </button>
          <input
            ref="summary"
            :value="node.attrs.summary"
            class="toggle-heading"
            contenteditable="true"
            @input="handleSummaryChange"
          >
        </div>
        <div
          ref="toggleDesc"
          class="hide toggle-desc"
          contenteditable="true"
        >
          <textarea
            class="content"
            style="width: 100%;height: 10vh;border-radius: 10px;padding: 2vh;"
            :value="node.attrs.details"
            @input="handleDetailsChange"
          />
        </div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-2'

export default {
  components: {
    NodeViewWrapper,
  },

  props: nodeViewProps,

  data() {
    return {
      isToggled: false,
      arrowRight: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none"> <path d="M11.3644 25.2053L23.4127 18.2491C24.9518 17.3622 24.9518 15.9081 23.4127 15.0201L11.3633 8.0639C9.82416 7.17486 8.56702 7.90245 8.56702 9.67837V23.5909C8.56702 25.3668 9.82631 26.0944 11.3633 25.2053H11.3644Z" fill="black"/> </svg>',
      arrowDown: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none"> <path d="M8.06389 11.3644L15.02 23.4127C15.9079 24.9518 17.3609 24.9518 18.2489 23.4127L25.205 11.3633C26.094 9.82416 25.3664 8.56702 23.5906 8.56702H9.67834C7.90244 8.56702 7.17487 9.82523 8.06389 11.3644Z" fill="black"/> </svg>',
    }
  },
  computed: {
    arrowIcon() {
      return this.isToggled ? this.arrowDown : this.arrowRight
    },
  },
  mounted() {
    console.log(nodeViewProps)
  },
  methods: {
    toggleFunction() {
      this.isToggled = !this.isToggled
      const { toggleDesc } = this.$refs

      if (toggleDesc) {
        toggleDesc.classList.toggle('hide')
      }
    },
    handleSummaryChange(event) {
      const summary = event.target.value
      console.log('Summary changed:', summary)
      this.updateAttributes({
        summary: this.node.attrs.summary = summary,
      })
    },
    handleDetailsChange(event) {
      const details = event.target.value
      this.updateAttributes({
        details: this.node.attrs.details = details,
      })
      console.log(details)
    },
  },
}
</script>

<style lang="scss" scoped>
textarea:focus{
  outline: none;
}
.toggle-list {
  padding: 0.3rem;
}
.toggle-btn {
  border-radius: 0.25rem;
  height: 26px;
  display: flex;
  align-items: center;

  button {
    border-radius: 4px;
    height: 26px;
  }
}
.toggle-heading {
  margin-left: 4px;
  :focus,input:focus {
    outline: none;
  }
}
input.toggle-heading {
  width: 100%;
  // border: 1px solid black;
}
.toggle-heading:focus {
  outline: none;
}
.toggle-desc {
  margin-left: 1.8rem;
}
.hide {
  display: none;
}
.content {
  padding: 0.5rem;
  border: 2px dashed #0D0D0D20;
  border-radius: 0.5rem;
}
</style>
