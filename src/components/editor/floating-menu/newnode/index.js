/* eslint-disable no-unused-vars */
import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import newNodeItems from './newNodeItems' // Assuming you have a file named floating.js
import newNodeList from './newNodeList.vue'

let floatingComponent = null // Declare a variable to hold the VueRenderer instance

export function showNewNode(editor, topLevelNodeType, isNewNode) {
  if (isNewNode) {
    const props = {
      items: newNodeItems,
      editor,
      topLevelNodeType,
      isNewNode,
    }

    floatingComponent = new VueRenderer(newNodeList, {
      parent: this,
      propsData: props,
    })

    console.log(floatingComponent)

    const popup = tippy('#submenu', {
      content: floatingComponent.element,
      showOnCreate: true,
      interactive: true,
      trigger: 'manual',
      placement: 'bottom-start',
    })
  }
}
