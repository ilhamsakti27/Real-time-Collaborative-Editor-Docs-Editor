<template>
  <div
    v-if="shouldShow"
    class="snapshot"
  >
    <div class="snapshot-title">
      Version Preview
    </div>
    <div class="snapshot-body">
      <div class="snapshot-body-editor">
        <editor-content
          id="editor"
          :editor="editor"
        />
      </div>
      <div
        v-if="history.length"
        class="snapshot-body-history"
      >
        <div
          v-for="(item, index) in history"
          :key="index"
        >
          <div
            class="snapshot-body-preview"
            :class="{ 'snapshot-body-gray' : selectedIndex === index }"
            @click="setPreview(index)"
          >
            <div>{{ item.title }}</div>
            <div class="snapshot-body-timestamp">
              {{ item.timestamp }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="snapshot-btn-container">
      <button
        class="snapshot-btn btn-cancel"
        @click="cancelVersion"
      >
        Cancel
      </button>
      <button
        class="snapshot-btn"
        @click="commitVersion"
      >
        Apply
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-types */

import { Editor } from '@tiptap/core'
import { EditorContent } from '@tiptap/vue-2'
import defaultExtension from '../extensions'

export default {
  components: {
    EditorContent,
  },
  props: {
    history: {
      required: true,
    },
    mainEditor: {
      required: true,
    },
  },
  data() {
    return {
      shouldShow: true,
      selectedIndex: 0,
      editor: null,
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        ...defaultExtension,
      ],
      content: this.history[0].snapshots,
      editable: false,
    })
  },
  methods: {
    setPreview(index) {
      this.selectedIndex = index
      this.editor.commands.setContent(this.history[index].snapshots)
    },
    commitVersion() {
      const snapshot = this.history[this.selectedIndex].snapshots
      this.mainEditor.commands.setContent(snapshot)
      this.shouldShow = false
    },
    cancelVersion() {
      this.shouldShow = !this.shouldShow
    },
  },
}

</script>

<style scoped>
.snapshot {
  /* transform -translate-x-1/2 -translate-y-1/2 */
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 50%;
  background-color: rgb(255 255 255);
  top: 50%;
  left: 50%;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-width: 1px;
  border-radius: 0.25rem; /* 4px */
  height: fit-content;
  padding-left: 1rem; /* 16px */
  padding-right: 1rem; /* 16px */
  padding-top: 1rem; /* 16px */
  padding-bottom: 1rem; /* 16px */
}
.snapshot-title {
  padding-bottom: 0.5rem;
  padding-left: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
}
.snapshot-body {
  display: flex;
  width: 100%;
}
.snapshot-body-editor {
  border-width: 1px;
  padding: 0.5rem; /* 8px */
  width: 75%;
  height: 40vh;
  overflow-y: auto;
  border: 1px solid rgb(203 213 225);
  border-radius: 4px;
}
.snapshot-body-history {
  display: flex;
  overflow-y: auto;
  padding-left: 1rem;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 25%;
  height: 40vh;
}
.snapshot-body-gray {
  background-color: rgb(209 213 219);
  border-radius: 4px;
}
.snapshot-body-timestamp {
  font-size: 0.75rem; /* 12px */
  line-height: 1rem; /* 16px */
  color: rgb(0, 0, 0, 0.5);
}
.snapshot-body-preview {
  border-radius: 4px;
  cursor: pointer;
  padding-left: 0.5rem; /* 8px */
  padding-right: 0.5rem; /* 8px */
  padding-top: 0.25rem; /* 4px */
  padding-bottom: 0.25rem; /* 4px */
  width: 100%;
  /* color: white; */
}
.snapshot-body-preview:hover {
  background-color: rgb(107 114 128);
  /* color: white; */
}
.snapshot-btn-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
.snapshot-btn {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 2rem;
  padding-right: 2rem;
  /* margin-top: 0.5rem; */
  margin-left: 10px;
  /* background-color: rgb(229, 231, 235); */
  background-color: rgb(37 99 235);
  color: white;
  border-radius: 4px;
}
.btn-cancel {
  background-color: rgb(237, 237, 237, 0.7);
  color: black;
}
.snapshot-btn:hover {
  background-color: rgb(30 64 175);
}
.btn-cancel:hover {
  background-color: rgb(214, 214, 214);
}
</style>
