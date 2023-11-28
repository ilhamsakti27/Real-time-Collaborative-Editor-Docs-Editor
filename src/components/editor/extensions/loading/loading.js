<<<<<<< HEAD
=======
// /* eslint-disable  */
>>>>>>> f0d79645e59bd37b57a868aaee760dcdbb5c8c58
import { Node } from '@tiptap/core'

export const Loading = Node.create({
  name: 'loading',
  group: 'block',
  content: 'inline*',
  defining: true,
  marks: '',
  // Your code goes here.
  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },
  addAttributes() {
    return {
      content: {
        default: null,
      },
    }
  },
  parseHTML() {
    return [
      { tag: 'loading' },
    ]
  },
  addCommands() {
    return {
      setLoading: options => ({ commands }) => commands.insertContent({
        type: this.name,
        attrs: options,
      }),
    }
  },
  addNodeView() {
    return options => {
      const container = document.createElement('div')

      container.classList.add('loading')

      container.innerText = options.HTMLAttributes.content

      return {
        dom: container,
      }
    }
  },

})
