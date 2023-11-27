import { Node, mergeAttributes } from '@tiptap/core'
import { NodeSelection } from 'prosemirror-state'

import { Column } from './column'
import { ColumnSelection } from './columnSelection'
import {
  buildColumn,
  buildNColumns,
  buildColumnBlock,
  findParentNodeClosestToPos,
} from './utils'

export const ColumnBlock = Node.create({
  name: 'columnBlock',
  group: 'block',
  content: 'column{2,}',
  isolating: true,
  selectable: true,

  addOptions() {
    return {
      nestedColumns: false,
      columnType: Column,
    }
  },

  renderHTML({ HTMLAttributes }) {
    const attrs = mergeAttributes(HTMLAttributes, { class: 'column-block' })

    return ['div', attrs, 0]
  },

  addCommands() {
    const unsetColumns = () => ({ tr, dispatch }) => {
      try {
        if (!dispatch) {
          return
        }

        // find the first ancestor
        const pos = tr.selection.$from
        const where = ({ node }) => {
          if (!this.options.nestedColumns && node.type === this.type) {
            return true
          }

          return node.type === this.type
        }
        const firstAncestor = findParentNodeClosestToPos(pos, where)
        if (firstAncestor === undefined) {
          return
        }

        // find the content inside of all the columns
        let nodes = []
        firstAncestor.node.descendants((node, _, parent) => {
          if (parent?.type.name === Column.name) {
            nodes.push(node)
          }
        })
        nodes = nodes.reverse().filter(node => node.content.size > 0)

        // resolve the position of the first ancestor
        const resolvedPos = tr.doc.resolve(firstAncestor.pos)
        const sel = new NodeSelection(resolvedPos)

        // insert the content inside of all the columns and remove the column layout
        let newTr = tr.setSelection(sel)
        nodes.forEach(node => {
          newTr = newTr.insert(firstAncestor.pos, node)
        })
        newTr = newTr.deleteSelection()

        dispatch(newTr)
      } catch (error) {
        console.error(error)
      }
    }

    const setColumns = (n, keepContent = false) => ({ tr, dispatch }) => {
      try {
        const { doc, selection } = tr
        if (!dispatch) {
          console.log('no dispatch')

          return
        }

        const sel = new ColumnSelection(selection)
        sel.expandSelection(doc)

        const { openStart, openEnd } = sel.content()
        if (openStart !== openEnd) {
          console.warn('failed depth check')

          return
        }

        // create columns and put old content in the first column
        let columnBlock
        if (keepContent) {
          const content = sel.content().toJSON()
          const firstColumn = buildColumn(content)
          const otherColumns = buildNColumns(n - 1)
          columnBlock = buildColumnBlock({
            content: [firstColumn, ...otherColumns],
          })
        } else {
          const columns = buildNColumns(n)
          columnBlock = buildColumnBlock({ content: columns })
        }
        const newNode = doc.type.schema.nodeFromJSON(columnBlock)
        if (newNode === null) {
          return
        }

        let newTr = tr.setSelection(sel)
        newTr = tr.replaceSelectionWith(newNode, false)

        dispatch(newTr)
      } catch (error) {
        console.error(error)
      }
    }

    return {
      unsetColumns,
      setColumns,
    }
  },
})
