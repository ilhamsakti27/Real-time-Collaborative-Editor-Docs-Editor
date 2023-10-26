/* eslint-disable */

import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'

import CommandsList from './CommandsList.vue'
import slashMenu from '../slashMenu'

export default {
  items: ({ query }) => {
    return slashMenu.filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase())).slice(0, 15)
  },

  render: () => {
    let component
    let popup

    return {
      onStart: (props) => {
        console.log(props)
        component = new VueRenderer(CommandsList, {
          // using vue 2:
          parent: this,
          propsData: props,
          // props,
          // editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.getElementById('app'),
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
