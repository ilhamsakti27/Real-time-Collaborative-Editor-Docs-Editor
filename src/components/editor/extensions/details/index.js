import { Extension } from '@tiptap/core'
import { Details } from './details'

export const DetailsExtension = Extension.create({
  name: 'detailsExtension',

  addExtensions() {
    const extensions = []
    extensions.push(Details)

    return extensions
  },
})

export default DetailsExtension
