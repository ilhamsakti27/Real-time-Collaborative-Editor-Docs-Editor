import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import moreListTools from './moreListTools.vue'

let floatingComponent = null // Declare a variable to hold the VueRenderer instance
// let popup

// eslint-disable-next-line no-shadow
export function moreTools(editor, moreTools, isMoreTools, title) {
  if (floatingComponent == null) {
    const props = {
      items: moreTools,
      editor,
      isMoreTools,
      title,
    }
    floatingComponent = new VueRenderer(moreListTools, {
      parent: this,
      propsData: props,
    })

    // eslint-disable-next-line no-unused-vars
    const popup = tippy('#more', {
      content: floatingComponent.element,
      showOnCreate: true,
      interactive: true,
      trigger: 'mouseenter',
      placement: 'bottom-start',
    })
  }
}
