<!-- eslint-disable  -->
<template>
  <div id="app" class="flex w-full ">
    <div class="w-full">
      <!-- editor -->
      <div class="w-full mt-24">
        <Tiptap v-model="content" mode="json" />
      </div>
    </div>
    <!-- output file -->
    <div class="json py-20 max-h-screen ">
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
    </div>
  </div>
</template>

<!-- eslint-disable  -->
<script>
import Tiptap from './components/editor/TipTap.vue'
import SampleContent from './content.json'
export default {
  components: {
    Tiptap,
  },
  data() {
    return {
      content: SampleContent,
    }
  },
}

</script>
<style>
.json {
  max-width: 15%;
}
</style>