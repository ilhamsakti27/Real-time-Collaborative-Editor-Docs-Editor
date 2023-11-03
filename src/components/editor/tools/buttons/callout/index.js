/* eslint-disable  */
import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import CalloutComponent from './CalloutButton.vue'

console.log("Helllo Semua")

export default Node.create({
    // configuration …
    name: 'Callout',
    group: 'block',
    atom: true,
    parseHTML() {
      return [
        {
          tag: 'callout-component',
        },
      ]
    },
    renderHTML({ HTMLAttributes }) {
      return ['callout-component', mergeAttributes(HTMLAttributes)]
    },
    addNodeView() {
      return VueNodeViewRenderer(CalloutComponent)
    },
  })
