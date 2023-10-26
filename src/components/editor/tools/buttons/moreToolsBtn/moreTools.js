/* eslint-disable  */
import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import moreListTools from './moreListTools.vue'

let floatingComponent = null // Declare a variable to hold the VueRenderer instance

let popup
export function moreTools(editor, moreTools, isMoreTools, title) {
    if (floatingComponent == null && editor != null && isMoreTools) {
        const props = {
            items: moreTools,
            editor,
            isMoreTools,
            title
        }
        console.log(isMoreTools)

        floatingComponent = new VueRenderer(moreListTools, {
            parent: this,
            propsData: props,
        })

        popup = tippy('#more', {
            content: floatingComponent.element,
            showOnCreate: true,
            interactive: true,
            trigger: 'manual',
            placement: 'bottom-start',
        })

    } else if (isMoreTools) {
        popup
    } else {
        popup[0].destroy()
        floatingComponent = null
    }
}
