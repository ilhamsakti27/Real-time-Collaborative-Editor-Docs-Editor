<template>
  <div
    v-if="editor"
    class="editor-canvas"
  >
    <h1 id="page-title">
      Editor Block-based
    </h1>

    <BubbleMenu
      v-if="editor"
      id="bubbleMenu"
      :editor="editor"
      :tippy-options="{ duration: 10 }"
    >
      <ColorButton
        :editor="editor"
      />
      <BoldButton
        :editor="editor"
      />
      <ItalicButton
        :editor="editor"
      />
      <StrikeButton
        :editor="editor"
      />
      <UnderlineButton
        :editor="editor"
      />
      <LinkButton
        :editor="editor"
      />
      <FontFamilyButton
        :editor="editor"
      />
    </BubbleMenu>
    <editor-content
      :editor="editor"
      :value="editor.getAttributes('textStyle').color"
    />
  </div>
</template>

<script>
/* eslint-disable */
// tiptap extension
import { Editor } from '@tiptap/core'
import { BubbleMenu, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Focus from '@tiptap/extension-focus'
import Heading from '@tiptap/extension-heading'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import { ColumnExtension } from "@gocapsule/column-extension"
import Blockquote from '@tiptap/extension-blockquote'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Underline from '@tiptap/extension-underline'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import FontFamily from '@tiptap/extension-font-family'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'

// slash menu
import Commands from './tools/commands/commands.js'
import suggestion from './tools/commands/suggestion.js'
// drag feature
import DraggableItem from './tools/drag/DraggableItem.js'

// collaboration
import Collaboration from '@tiptap/extension-collaboration'
import { HocuspocusProvider } from '@hocuspocus/provider' 

// buttons for bubble menu
import BoldButton from './tools/buttons/BoldButton.vue'
import ItalicButton from './tools/buttons/ItalicButton.vue'
import StrikeButton from './tools/buttons/StrikeButton.vue'
import UnderlineButton from './tools/buttons/UnderlineButton.vue'
import ColorButton from './tools/buttons/ColorButton.vue'
import LinkButton from './tools/buttons/LinkButton.vue'
import FontFamilyButton from './tools/buttons/FontFamilyButton.vue'


const provider = new HocuspocusProvider({
  url: 'wss://api.server.rosfandy.my.id/',
  name: 'example-document',
})


export default {
  components: {
    EditorContent,
    BubbleMenu,
    BoldButton,
    ItalicButton,
    StrikeButton,
    UnderlineButton,
    ColorButton,
    LinkButton,
    FontFamilyButton,
  },
  data() {
    return {
      // provider: null,
      editor: null,
      isEditable: true,
    }
  },
  watch: {
    isEditable(value) {
      this.editor.setEditable(value)
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          // The Collaboration extension comes with its own history handling
          history: false,
        }),
        Placeholder.configure({
          placeholder: "Write something … or type '/' to choose block",
        }),
        Focus.configure({
          className: 'has-focus',
          mode: 'deepest'
        }),
        Heading.configure({
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: 'heading',
          },
        }),
        Commands.configure({
          suggestion,
        }),
        OrderedList.configure({
          HTMLAttributes: {
            class: 'orderedList',
          },
        }),
        BulletList.configure({
          HTMLAttributes: {
            class: 'bulletedList',
          },
        }),
        ColumnExtension,
        ListItem,
        Blockquote.configure({
          HTMLAttributes: {
            class: 'blockquote',
          },
        }),
        DraggableItem,
        HorizontalRule.configure({
          HTMLAttributes: {
            class: 'separator',
          },
        }),
        TaskList,
        TaskItem.configure({
          HTMLAttributes: {
            class: 'todoList',
          },
          nested: true,
        }),
        Underline,
        Collaboration.configure({
          document: provider.document,
        }),
        TextStyle,
        Color,
        Link,
        FontFamily,
        Image,
        Dropcursor
      ],
      // content: `
      // <p>This is a boring paragraph.</p>
      //   <div data-type="draggable-item">
      //     <p>Followed by a fancy draggable item.</p>
      //   </div>
      //   <div data-type="draggable-item">
      //     <p>And another draggable item.</p>
      //     <div data-type="draggable-item">
      //       <p>And a nested one.</p>
      //       <div data-type="draggable-item">
      //         <p>But can we go deeper?</p>
      //       </div>
      //     </div>
      //   </div>
      //   <p>Let’s finish with a boring paragraph.</p>
      // `,
      // autofocus: true,
      onUpdate: () => {
        // HTML
        // this.$emit('input', this.editor.getHTML())
        // console.log(this.editor.getHTML())
        // JSON
        // this.$emit('input', this.editor.getJSON()) // jika mau raw JSONnya
        this.$emit('input', this.editor.getJSON().content) // jika mau langsung isi pada key 'content'nya
        // console.log(this.editor.getJSON())
      },
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    addImage() {
      const url = window.prompt('URL')

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run()
      }
    }
  },
}
</script>

<style>
@import 'style.css';
</style>
