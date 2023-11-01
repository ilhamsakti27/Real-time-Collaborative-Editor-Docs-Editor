<!-- eslint-disable  -->
<template>
  <div id="app" class=" w-full ">
    <NavBar :users="dataUsers" />

    <div class="flex w-full">
      <div class="w-full">
        <!-- editor -->
        <div class="w-full mt-24">
          <Tiptap v-model="content" :dataUsers="dataUsers" @update:dataUsers="handleDataUsersUpdate" mode="json" />
        </div>
      </div>
      <!-- output file -->
      <div class="json py-20 max-h-screen ">
        <div class="">
          <h3 @click="handleClick">
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

      </div>
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
    }
  },
  methods: {
    handleClick() {
      console.log(this.dataUsers)
      console.log('test')
    },
    handleDataUsersUpdate(updatedDataUsers) {
      // Handle the updated dataUsers here, you can log it
      console.log('Updated dataUsers:', updatedDataUsers);
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