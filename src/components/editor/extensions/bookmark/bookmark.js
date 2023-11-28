import { Node, mergeAttributes } from '@tiptap/core'

export const Bookmark = Node.create({
  name: 'bookmark',
  content: 'inline*',
  atom: true,
  draggable: true,
  isolating: true,

  // Your code goes here.
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
      src: {
        default: null,
      },
      img: {
        default: null,
      },
      title: {
        default: null,
      },
    }
  },
  parseHTML() {
    return [
      { tag: 'div[data-type="draggable-item"]' },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    const { src, img, title } = HTMLAttributes
    const clickHandler = `window.open('${src}', '_blank')`
    const onClickAttribute = clickHandler

    return [
      'div',
      {
        class: 'bookmark',
      },
      [
        'div',
        { class: 'bookmark-content flex', onclick: onClickAttribute },
        [
          'img',
          mergeAttributes({ class: 'bookmark-thumbnail', src: img }),
        ],
        [
          'div',
          { class: 'bookmark-desc ' },
          [
            'h3',
            { class: 'bookmark-title' },
            title,
          ],
          [
            'div',
            { class: 'bookmark-link' },
            src,
          ],
        ],
      ],
      ['div', 0],
    ]
  },
  addCommands() {
    return {
      setBookmark: options => ({ commands }) => commands.insertContent({
        type: this.name,
        attrs: options,
      })
      ,
    }
  },
})
