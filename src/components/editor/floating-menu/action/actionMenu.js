/* eslint-disable no-unused-vars */
import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import actionMenuItems from './actionMenuItems' // Assuming you have a file named floating.js
import actionMenuList from './actionMenuList.vue'

let floatingComponent = null // Declare a variable to hold the VueRenderer instance

export function showActionMenu(editor, topLevelNodeType, isSubMenu) {
  if (isSubMenu) {
    const props = {
      items: actionMenuItems,
      editor,
      topLevelNodeType,
      isSubMenu,
    }

    floatingComponent = new VueRenderer(actionMenuList, {
      parent: this,
      propsData: props,
    })

    const popup = tippy('#submenu', {
      content: floatingComponent.element,
      showOnCreate: true,
      interactive: true,
      trigger: 'manual',
      placement: 'bottom-start',
    })
  }
}
