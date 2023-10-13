<template>
  <div id="app">
    <!-- editor -->
    <Editor
      v-model="content"
      mode="json"
    />

    <!-- output file -->
    <div>
      <h3>
        Output file
      </h3>
      <pre>
        {{ content }}
      </pre>
    </div>
  </div>
</template>

<script>
import Editor from './components/editor/Editor.vue'
import SampleContent from './content.json'

export default {
  components: {
    Editor,
  },
  data() {
    return {
      content: SampleContent,
    }
  },
}

</script>
