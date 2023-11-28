<<<<<<< HEAD
=======
/* eslint-disable no-void */

>>>>>>> f0d79645e59bd37b57a868aaee760dcdbb5c8c58
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

const Placeholder = Extension.create({
  name: 'placeholder',
  addOptions() {
    return {
      emptyEditorClass: 'is-editor-empty',
      emptyNodeClass: 'is-empty',
      placeholder: 'Write something …',
      showOnlyWhenEditable: true,
      showOnlyCurrent: true,
      includeChildren: false,
    }
  },
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('placeholder'),
        props: {
          decorations: ({ doc, selection }) => {
            const active = this.editor.isEditable || !this.options.showOnlyWhenEditable
            const { anchor } = selection
            const decorations = []
            if (!active) {
              return null
            }
            // only calculate isEmpty once due to its performance impacts (see issue #3360)
            const emptyDocInstance = doc.type.createAndFill()
<<<<<<< HEAD
            const isEditorEmpty = (emptyDocInstance === null || emptyDocInstance).sameMarkup(doc)
=======
            const isEditorEmpty = (emptyDocInstance === null || emptyDocInstance === void 0 ? void 0 : emptyDocInstance.sameMarkup(doc))
>>>>>>> f0d79645e59bd37b57a868aaee760dcdbb5c8c58
                            && emptyDocInstance.content.findDiffStart(doc.content) === null
            doc.descendants((node, pos) => {
              const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize
              const isEmpty = !node.isLeaf && !node.childCount
              if ((hasAnchor || !this.options.showOnlyCurrent) && isEmpty && node.type.name !== 'paragraph') {
                const classes = [this.options.emptyNodeClass]
                if (isEditorEmpty) {
                  classes.push(this.options.emptyEditorClass)
                }
                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: classes.join(' '),
                  'data-placeholder': typeof this.options.placeholder === 'function'
                    ? this.options.placeholder({
                      editor: this.editor,
                      node,
                      pos,
                      hasAnchor,
                    })
                    : this.options.placeholder,
                })
                decorations.push(decoration)
              } else if ((hasAnchor || this.options.showOnlyCurrent) && isEmpty && node.type.name === 'paragraph') {
                const classes = [this.options.emptyNodeClass]
                if (isEditorEmpty) {
                  classes.push(this.options.emptyEditorClass)
                }
                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: classes.join(' '),
                  'data-placeholder': typeof this.options.placeholder === 'function'
                    ? this.options.placeholder({
                      editor: this.editor,
                      node,
                      pos,
                      hasAnchor,
                    })
                    : this.options.placeholder,
                })
                decorations.push(decoration)
              }

              return this.options.includeChildren
            })

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})

export { Placeholder, Placeholder as default }
