import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import moreListTools from './moreListTools.vue'

let floatingComponent = null // Declare a variable to hold the VueRenderer instance
// let popup

export function moreTools(editor, MoreTools, isMoreTools, title) {
  if (floatingComponent == null) {
    const props = {
      items: MoreTools,
      editor,
      isMoreTools,
      title,
    }
    floatingComponent = new VueRenderer(moreListTools, {
      parent: this,
      propsData: props,
    })

    tippy('#more', {
      content: floatingComponent.element,
      showOnCreate: true,
      interactive: true,
      trigger: 'mouseenter',
      placement: 'bottom-start',
    })
  }
}
