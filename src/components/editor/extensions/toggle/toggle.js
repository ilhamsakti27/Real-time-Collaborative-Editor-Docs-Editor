import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-2'
import ToggleComponent from '../../tools/buttons/toggle/index.vue'

export const Toggle = Node.create({
  name: 'toggle',
  atom: true,
  draggable: true,
  isolating: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      inline: false,
    }
  },
  inline() {
    return this.options.inline
  },
  group() {
    return this.options.inline ? 'inline' : 'block'
  },
  addAttributes() {
    return {
      summary: {
        default: 'title',
      },
      details: {
        default: 'details content',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'vue-component',
      },
    ]
  },
  addCommands() {
    return {
      setToggle: options => ({ commands }) => commands.insertContent({
        type: this.name,
        attrs: options,
      }),
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['vue-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(ToggleComponent)
  },
})
