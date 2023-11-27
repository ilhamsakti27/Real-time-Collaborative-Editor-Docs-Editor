<!-- eslint-disable  -->
<template>
  <div id="app" style="width: 100%;">
    <NavBar :users="dataUsers" />

    <div style="display: flex; width: 100%;">
      <div style="width: 100%;">
        <!-- main editor -->
        <div style="width: 100%; margin-top: 100px;">
          <Tiptap v-model="content" :contentUpdate="contentUpdate" :dataUsers="dataUsers"
            @update:dataUsers="handleDataUsersUpdate" @update:contentUpdate="handleUpdateEditor" mode="json" />
          <div style="width: 100%;"></div>
        </div>
      </div>
      <div style="position: fixed; padding: 8px; top: 33%;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <button @click="createSnapshots"
            style="background-color: #e2e8f0; font-size: 0.875rem; padding: 8px; border-radius: 0.375rem;">Create
            Snapshots</button>
          <button @click="showSnapshots"
            style="background-color: #e2e8f0; font-size: 0.875rem; padding: 8px; border-radius: 0.375rem;">Show
            Snapshots</button>
        </div>
      </div>
      <div style="position: fixed; top: 100px; display: flex; justify-content: flex-end; right: 0;">
        <div style="width: 250px; overflow-x: auto; overflow-y: auto; max-height: 90vh;">
          <h3 style="font-weight: bold; margin-bottom: 8px; font-size: 1.5rem;">Editor output</h3>
          <pre style="display: block; font-size: 1rem; width: 100%;">{{ content }}</pre>
        </div>
      </div>
    </div>

    <!-- snapshots preview -->
    <div v-if="isShowSnapshots">
      <EditorPreview :isShowSnapshots="isShowSnapshots" :mainEditor="mainEditor" :history="history">
      </EditorPreview>
    </div>
  </div>
</template>

<!-- eslint-disable  -->
<script>
import Tiptap from './components/editor/TipTap.vue'
import SampleContent from './content.json'
import NavBar from './components/NavBar.vue'
import EditorPreview from './components/editor/snapshots/EditorPreview.vue'
export default {
  components: {
    Tiptap,
    NavBar,
    EditorPreview
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
      this.dataUsers = updatedDataUsers;
    },
    handleUpdateEditor(mainEditor) {
      this.snapshots = mainEditor.getJSON()
      this.mainEditor = mainEditor
    },
    createSnapshots() {
      let title = (window.prompt('Name') || '')
        .trim()
        .substring(0, 32)
      if (title == '') title = 'Untitled'
      const data = {
        title,
        snapshots: this.snapshots,
        timestamp: new Date().toLocaleString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      }
      this.history.push(data)
    },
    showSnapshots() {
      this.isShowSnapshots = !this.isShowSnapshots
    }
  }

}

</script>
<style>
.json {
  max-width: 15%;
}
</style>