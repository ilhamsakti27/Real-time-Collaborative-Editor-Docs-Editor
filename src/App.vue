<template>
  <div
    id="app"
    style="width: 100%;"
  >
    <NavBar :users="dataUsers" />

    <div style="display: flex; width: 100%;">
      <div style="width: 100%;">
        <!-- main editor -->
        <div style="width: 100%; margin-top: 100px;">
          <Tiptap
            v-model="content"
            :data-users="dataUsers"
            :content-update="contentUpdate"
            mode="json"
            @update:dataUsers="handleDataUsersUpdate"
            @update:contentUpdate="handleUpdateEditor"
          />
          <div style="width: 100%;" />
        </div>
      </div>
      <div style="position: fixed; padding: 8px; top: 33%;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <button
            class="button-snapshots"
            @click="createSnapshots"
          >
            Create Snapshots
          </button>
          <button
            class="button-snapshots"
            @click="showSnapshots"
          >
            Show Snapshots
          </button>
        </div>
      </div>
    </div>

    <!-- snapshots preview -->
    <div v-if="isShowSnapshots">
      <EditorPreview
        :is-show-snapshots="isShowSnapshots"
        :main-editor="mainEditor"
        :history="history"
      />
    </div>
  </div>
</template>

<script>
import Tiptap from './components/editor/TipTap.vue'
import SampleContent from './content.json'
import NavBar from './components/NavBar.vue'
import EditorPreview from './components/editor/snapshots/EditorPreview.vue'

export default {
  components: {
    Tiptap,
    NavBar,
    EditorPreview,
  },
  data() {
    return {
      history: [],
      mainEditor: null,
      snapshots: null,
      isShowSnapshots: false,
      content: SampleContent,
      contentUpdate: null,
      dataUsers: new Map(),
    }
  },
  methods: {
    handleDataUsersUpdate(updatedDataUsers) {
      this.dataUsers = updatedDataUsers
    },
    handleUpdateEditor(mainEditor) {
      this.snapshots = mainEditor.getJSON()
      this.mainEditor = mainEditor
    },
    createSnapshots() {
      // eslint-disable-next-line no-alert
      let title = (window.prompt('Name') || '')
        .trim()
        .substring(0, 32)
      if (title === '') title = 'Untitled'
      const data = {
        title,
        snapshots: this.snapshots,
        timestamp: new Date().toLocaleString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      }
      this.history.push(data)
    },
    showSnapshots() {
      this.isShowSnapshots = !this.isShowSnapshots
    },
  },

}

</script>
<style>
.json {
  max-width: 15%;
}
.button-snapshots {
  margin: 0.3rem 0;
  border-radius: 4px;
  border: 1px solid rgb(203 213 225);
  background-color: #fff;
  padding: 0.3rem 0.8rem;
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
}
</style>
