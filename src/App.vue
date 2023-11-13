<!-- eslint-disable  -->
<template>
  <div id="app" class=" w-full ">
    <NavBar :users="dataUsers" />

    <div class="flex w-full">
      <div class="w-full">
        <!-- editor -->
        <div class="w-full mt-24">
          <Tiptap v-model="content" :dataUsers="dataUsers" @update:dataUsers="handleDataUsersUpdate" mode="json" />
          <div class="">
          </div>
        </div>
      </div>
      <!-- output file -->
      <!-- <div class="json absolute right-0 py-20 max-h-screen ">
        <div class="">
          <h3>
            Output file
          </h3>
          <h3>
            total blocks : {{ content.length }}
          </h3>
        </div>

        <div class="overflow-x-auto  overflow-y-auto max-h-[100%]">
          <pre>
            {{ content }}
          </pre>
        </div>

      </div> -->
    </div>

  </div>
</template>

<!-- eslint-disable  -->
<script>
import Tiptap from './components/editor/TipTap.vue'
import SampleContent from './content.json'
import NavBar from './components/NavBar.vue'

export default {
  components: {
    Tiptap,
    NavBar
  },
  data() {
    return {
      content: SampleContent,
      dataUsers: new Map(),
      ogUrl: "https://tiptap.dev/extensions?pro=true",
    }
  },
  methods: {
    handleDataUsersUpdate(updatedDataUsers) {
      // Handle the updated dataUsers here, you can log it
      this.dataUsers = updatedDataUsers; // Update the dataUsers in the parent component if needed
    },

  }

}

</script>
<style>
.json {
  max-width: 15%;
}
</style>