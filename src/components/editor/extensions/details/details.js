import { Node, mergeAttributes } from '@tiptap/core'

export const Details = Node.create({
  name: 'details',

  group: 'inline*',

  atom: true,

  addAttributes() {
    return {
      count: {
        default: 0,
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
      setDetails: () => ({ commands }) => {
        const command = commands.setNode(this.name)

        return command
      },
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['vue-component', mergeAttributes(HTMLAttributes)]
  },
})
