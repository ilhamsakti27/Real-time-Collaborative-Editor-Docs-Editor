import { Extension } from '@tiptap/core'

import { Column } from './column'
import { ColumnBlock } from './columnBlock'

export const ColumnExtension = Extension.create({
  name: 'columnExtension',

  addExtensions() {
    const extensions = []

    extensions.push(Column)
    extensions.push(ColumnBlock)

    return extensions
  },
})

export { Column, ColumnBlock }

export default ColumnExtension
