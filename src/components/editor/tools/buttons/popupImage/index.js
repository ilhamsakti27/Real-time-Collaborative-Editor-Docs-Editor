/* eslint-disable  */
import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import popupImage from './popupImage.vue'

let floatingComponent = null // Declare a variable to hold the VueRenderer instance

let popup
export function PopupImage(editor) {
    if (floatingComponent == null && editor != null) {
        const props = {
            editor
        }
        floatingComponent = new VueRenderer(popupImage, {
            parent: this,
            propsData: props,
        })
        popup = tippy('#popup', {
            content: floatingComponent.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
        })

    } else if (floatingComponent != null) {
        popup[0].destroy()
        floatingComponent = null
    }
}
