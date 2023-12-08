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
        default: 'Enter summary...',
        parseHTML: element => ({ summary: element.getAttribute('summary') }),
        renderHTML: attributes => ({
          summary: attributes.summary || 'Enter summary...',
        }),
      },
      details: {
        default: 'Enter details...',
        parseHTML: element => ({ details: element.getAttribute('details') }),
        renderHTML: attributes => ({
          details: attributes.details || 'Enter details...',
        }),
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
