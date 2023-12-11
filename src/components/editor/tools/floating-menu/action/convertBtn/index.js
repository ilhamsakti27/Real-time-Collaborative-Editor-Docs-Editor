import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import convertBtn from './convertBtn.vue'
import items from './convertItems'

let floatingComponent = null // Declare a variable to hold the VueRenderer instance
let popup = null

export function ConvertBtn(editor, isHover) {
  console.log(popup)
  if (isHover) {
    if (floatingComponent === null) {
      const props = {
        editor,
        items,
      }
      floatingComponent = new VueRenderer(convertBtn, {
        parent: this,
        propsData: props,
      })
      popup = tippy('#convert', {
        content: floatingComponent.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'mouseenter',
        placement: 'right-end',
      })
    }
  } else {
    if (popup) {
      popup[0].destroy()
      popup = null
    }
    floatingComponent = null
  }
}
