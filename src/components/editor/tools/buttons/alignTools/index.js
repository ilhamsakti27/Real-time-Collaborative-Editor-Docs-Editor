import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import alignTools from './alignTools.vue'

let floatingComponent = null
// let popup
export function alignFormat(editor, moreTools, isMoreTools, title) {
  if (floatingComponent == null) {
    const props = {
      items: moreTools,
      editor,
      isMoreTools,
      title,
    }
    floatingComponent = new VueRenderer(alignTools, {
      parent: this,
      propsData: props,
    })

    // eslint-disable-next-line no-unused-vars
    const popup = tippy('#align', {
      content: floatingComponent.element,
      showOnCreate: true,
      interactive: true,
      trigger: 'mouseenter',
      placement: 'bottom-start',
    })
  }
}
