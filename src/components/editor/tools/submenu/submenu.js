/* eslint-disable no-unused-vars */
import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import subMenuItems from './subMenuItems' // Assuming you have a file named floating.js
import submenu from './submenu.vue'

let floatingComponent = null // Declare a variable to hold the VueRenderer instance

export function showSubMenu(editor, topLevelNodeType) {
  console.log('n: ', topLevelNodeType)
  const props = {
    items: subMenuItems,
    editor,
    topLevelNodeType,
  }

  floatingComponent = new VueRenderer(submenu, {
    parent: this,
    propsData: props,
  })

  console.log(floatingComponent)

  const popup = tippy('#submenu', {
    content: floatingComponent.element,
    showOnCreate: true,
    interactive: true,
    trigger: 'manual',
    placement: 'left-start',
  })
}
