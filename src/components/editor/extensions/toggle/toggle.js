import { Node, wrappingInputRule } from '@tiptap/core'

const inputRegex = /^\s*>\s$/

export const Toggle = Node.create({
  name: 'toggle',
  group: 'block',
  content: 'block+',
  defining: true,
  draggable: true,
  marks: '',
  addAttributes() {
    return {
      HTMLAttributes: {},
    }
  },
  parseHTML() {
    return [{ tag: 'toggle' }]
  },
  addCommands() {
    return {
      setToggleList: () => ({ commands }) => {
        const command = commands.wrapIn(this.name)

        return command
      },
    }
  },
  addInputRules() {
    return [
      wrappingInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ]
  },
  addNodeView() {
    return () => {
      const div = document.createElement('div')
      div.classList.add('toggle-list')

      const container = document.createElement('div')

      const toggleBtn = document.createElement('button')
      toggleBtn.classList.add('toggle-btn')

      const spanIcon = document.createElement('span')
      spanIcon.classList.add('material-symbols-outlined')
      spanIcon.innerHTML = '&#10158;'
      spanIcon.contentEditable = false

      const spanHeading = document.createElement('span')
      spanHeading.classList.add('toggle-heading')
      spanHeading.classList.add('content')

      const toggleDesc = document.createElement('div')
      toggleDesc.classList.add('toggle-desc')

      // const p = document.createElement('p')
      // p.classList.add('content')

      div.appendChild(container)
      container.appendChild(toggleBtn)
      toggleBtn.appendChild(spanIcon)
      container.appendChild(spanHeading)
      div.appendChild(toggleDesc)
      // toggleDesc.appendChild(p)

      toggleBtn.addEventListener('click', () => {
        toggleDesc.classList.add('show')
      })

      return {
        dom: div,
        // contentDOM: spanHeading,
        contentDOM: toggleDesc,
      }
    }
  },
})
