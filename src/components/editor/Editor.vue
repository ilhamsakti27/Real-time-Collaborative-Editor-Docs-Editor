<template>
  <!-- eslint-disable -->
  <div v-if="editor" class="editor-canvas">
    <h1 id="page-title">
      Editor Block-based
    </h1>

    <p>
      Total user: {{ totalUser }}
    </p>

    <BubbleMenu v-if="editor" id="bubbleMenu" :editor="editor" :tippy-options="{ duration: 10 }">
      <ColorButton class="bubble-menu-btn" :editor="editor" />
      <BoldButton class="bubble-menu-btn" :editor="editor" />
      <ItalicButton class="bubble-menu-btn" :editor="editor" />
      <StrikeButton class="bubble-menu-btn" :editor="editor" />
      <UnderlineButton class="bubble-menu-btn" :editor="editor" />
      <LinkButton class="bubble-menu-btn" :editor="editor" />
      <!-- <FontFamilyButton
        class="bubble-menu-btn"
        :editor="editor"
      /> -->
      <SuperscriptButton class="bubble-menu-btn" :editor="editor" />
      <SubscriptButton :editor="editor" />
    </BubbleMenu>
    <editor-content id="editor" :editor="editor" :value="editor.getAttributes('textStyle').color" />
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
// import History from '@tiptap/extension-history'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Typography from '@tiptap/extension-typography'
import Gapcursor from '@tiptap/extension-gapcursor'
// import Paragraph from '@tiptap/extension-paragraph'
// callout component
import { Callout } from './tools/buttons/callout'
import VueComponent from './tools/buttons/vueComponent/Extension.js'

// slash menu
import Commands from './tools/commands/commands.js'
import suggestion from './tools/commands/suggestion.js'
// drag feature
import DraggableItem from './tools/drag/DraggableItem.js'

// collaboration
import Collaboration from '@tiptap/extension-collaboration'
import { HocuspocusProvider } from '@hocuspocus/provider'
// cursor collaboration
// import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
// import { WebrtcProvider } from 'y-webrtc'
// import * as Y from 'yjs'

// buttons for bubble menu
import BoldButton from './tools/buttons/BoldButton.vue'
import ItalicButton from './tools/buttons/ItalicButton.vue'
import StrikeButton from './tools/buttons/StrikeButton.vue'
import UnderlineButton from './tools/buttons/UnderlineButton.vue'
import ColorButton from './tools/buttons/ColorButton.vue'
import LinkButton from './tools/buttons/LinkButton.vue'
import FontFamilyButton from './tools/buttons/FontFamilyButton.vue'
import SuperscriptButton from './tools/buttons/SuperscriptButton.vue'
import SubscriptButton from './tools/buttons/SubcriptButton.vue'

// collaboration
const provider = new HocuspocusProvider({
  url: 'wss://editorhocus.oriens.my.id/',
  name: 'example-document',
})
// provider.awareness.on('change', () => {
//   let totalClients = provider.awareness.getStates().size;
//   this.totalUser =  totalClients
// });

// collaboration cursor
// const ydoc = new Y.Doc()
// const providerCollabCursor = new WebrtcProvider('tiptap-collaboration-cursor-extension', provider)


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
    SuperscriptButton,
    SubscriptButton
  },
  data() {
    return {
      editor: null,
      isEditable: true,
      totalUser: 0,
      // providerCollaborationCursor: null,
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
        TextStyle,
        Color,
        Link,
        FontFamily,
        Image,
        Dropcursor,
        // History,
        Superscript.configure({
          HTMLAttributes: {
            class: 'superscript',
          },
        }),
        Subscript.configure({
          HTMLAttributes: {
            class: 'subscript',
          },
        }),
        Typography,
        Collaboration.configure({
          document: provider.document,
        }),
        Gapcursor,
        VueComponent,
        
      ],
      // content for drag&drop
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
      
      // content for callout component
      // content: `
      //   <p>
      //     This is still the text editor you’re used to, but enriched with node views.
      //   </p>
      //   <vue-component>
      //     <p>This is editable.</p>
      //   </vue-component>
      //   <p>
      //     Did you see that? That’s a Vue component. We are really living in the future.
      //   </p>
      // `,
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

    this.seeTotalUser()
  },
  beforeDestroy() {
    this.editor.destroy()
    // this.provider.destroy()
  },
  methods: {
    addImage() {
      const url = window.prompt('URL')

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run()
      }
    },
    seeTotalUser() {
      provider.awareness.on('change', () => {
        let totalClients = provider.awareness.getStates().size;
        this.totalUser = totalClients
      });
    }

  },
}
</script>

<style>
@import 'style.css';
</style>
