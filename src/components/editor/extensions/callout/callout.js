import { Node, mergeAttributes } from '@tiptap/core'

export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: 'inline*',
  defining: true,
  draggable: true,
  marks: '',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },
  parseHTML() {
    return [
      { tag: 'callout' },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'callout',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      [
        'div',
        { class: 'callout-emoji' },
      ],
      [
        'div',
        { class: 'callout-content' },
      ],
      ['div', 0],
    ]
  },
  addCommands() {
    return {
      setCallout: () => ({ commands }) => commands.setNode(this.name),
    }
  },
})
