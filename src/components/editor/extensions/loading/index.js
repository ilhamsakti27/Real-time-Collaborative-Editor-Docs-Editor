import { Extension } from '@tiptap/core'
import { Loading } from './loading'

export const LoadingExtension = Extension.create({
  name: 'loadingExtension',
<<<<<<< HEAD

  addExtensions() {
    const extensions = []
    extensions.push(Loading)

=======
  addExtensions() {
    const extensions = []
    extensions.push(Loading)

>>>>>>> f0d79645e59bd37b57a868aaee760dcdbb5c8c58
    return extensions
  },
})

export default LoadingExtension
