/* eslint-disable */
import { VueRenderer } from '@tiptap/vue-2'
import tippy from 'tippy.js'
import popupImage from './popupImage.vue'

let floatingComponent = null; // Declare a variable to hold the VueRenderer instance
let popup = null;

export function PopupImage(editor) {
  if (floatingComponent === null && editor !== null) {
    const props = {
      editor
    }
    floatingComponent = new VueRenderer(popupImage, {
      parent: this,
      propsData: props
    });

    // Create the tippy instance when the component is created
    popup = tippy('#popup', {
      content: floatingComponent.element,
      showOnCreate: true,
      interactive: true,
      trigger: 'manual',
      placement: 'top',
    });
  } else if (floatingComponent !== null) {

    // Check if popup is defined before destroying it
    if (popup) {
      popup[0].destroy();
      //   popup.destroy();
      popup = null;
    }

    floatingComponent = null;
  }
}
