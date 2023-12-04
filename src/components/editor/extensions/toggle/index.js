import { Extension } from '@tiptap/core'
import { Toggle } from './toggle'

export const ToggleExtension = Extension.create({
  name: 'toggleExtension',

  addExtensions() {
    const extensions = []
    extensions.push(Toggle)
    return extensions
  },
})

export default ToggleExtension
