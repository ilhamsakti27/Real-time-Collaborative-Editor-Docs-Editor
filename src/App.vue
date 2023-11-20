<!-- eslint-disable  -->
<template>
  <div id="app" class=" w-full ">
    <NavBar :users="dataUsers" />

    <div class="flex w-full">
      <div class="w-full">
        <!-- main editor -->
        <div class="w-full mt-24">
          <Tiptap v-model="content" :contentUpdate="contentUpdate" :dataUsers="dataUsers"
            @update:dataUsers="handleDataUsersUpdate" @update:contentUpdate="handleUpdateEditor" mode="json" />
          <div class="">
          </div>
        </div>

      </div>
      <div class="fixed p-2 top-1/3">
        <div class="flex flex-col gap-y-4">
          <button @click="createSnapshots" class="bg-gray-200 text-sm p-2 rounded">Create Snapshots</button>
          <button @click="showSnapshots" class="bg-gray-200 text-sm p-2 rounded">Show Snapshots</button>
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