import { Extension } from '@tiptap/core'

import { Column } from './column'
import { ColumnBlock } from './columnBlock'

export const ColumnExtension = Extension.create({
  name: 'columnExtension',

  addExtensions() {
    const extensions = []

<<<<<<< HEAD
    extensions.push(Column)
    extensions.push(ColumnBlock)

=======
    // if (this.options.column !== false) {
    // console.log('col: ', this.options.column)
    extensions.push(Column)
    // }

    // if (this.options.columnBlock !== false) {
    extensions.push(ColumnBlock)
    // }

>>>>>>> f0d79645e59bd37b57a868aaee760dcdbb5c8c58
    return extensions
  },
})

export { Column, ColumnBlock }

export default ColumnExtension
