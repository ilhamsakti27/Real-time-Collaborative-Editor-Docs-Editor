<template>
  <div id="app" class="flex w-full">
    <!-- editor -->
    <div class="w-[90%]">
      <Tiptap v-model="content" mode="json" />
    </div>
    <!-- output file -->
    <div class="w-[30%] py-20 max-h-screen">
      <h3>
        Output file
      </h3>
      <div class="  overflow-y-auto max-h-[100%]">
        <pre>
          {{ content }}
        </pre>
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable  -->
<script>
import Editor from './components/editor/Editor.vue'
import Tiptap from './components/editor/TipTap.vue'
import SampleContent from './content.json'

export default {
  components: {
    Editor,
    Tiptap,
  },
  data() {
    return {
      content: SampleContent,
    }
  },
}

</script>
