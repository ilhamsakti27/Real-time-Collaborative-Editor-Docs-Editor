import { Node, mergeAttributes } from '@tiptap/core'
import { NodeViewWrapper } from '@tiptap/vue-2'
import ToggleComponent from '../../tools/buttons/toggle/index.vue'

export const Toggle = Node.create({
  name: 'toggle',
  group: 'block',
  content: 'block+',

  parseHTML() {
    return [{ tag: 'div[data-type="toggle"]' }]
  },

  addCommands() {
    return {
      setToggleList: () => ({ commands }) => {
        const command = commands.wrapIn(this.name)

        return command
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['toggle-component', mergeAttributes(HTMLAttributes, { 'data-type': 'toggle' }), 0]
  },

  addNodeView() {
    return NodeViewWrapper(ToggleComponent)
  },
})
