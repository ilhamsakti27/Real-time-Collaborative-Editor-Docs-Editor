import { Node, mergeAttributes } from '@tiptap/core'

export const CalloutEmoji = Node.create({
  name: 'emoji',
  group: 'callout',
  content: 'block*',
  isolating: true,
  selectable: false,

  renderHTML({ HTMLAttributes }) {
    const attrs = mergeAttributes(HTMLAttributes, { class: 'callout-emoji' })

    return ['div', attrs, '💡']
  },
})
