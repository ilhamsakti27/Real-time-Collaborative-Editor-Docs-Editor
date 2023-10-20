<!-- eslint-disable vue/max-attributes-per-line -->
<!-- eslint-disable vue/html-indent -->
<!-- Note: -->
<!-- create function to close the dropdown if the user clicks outside of it   -->
<!-- dropdown menu for font family -->
<!-- styling superscript -->
<!-- styling subscript -->
<template>
    <div class="flex">
        <div class="pl-8 pt-20 w-[20%]">
            <div>Online: {{ total }}</div>
            <div>Status: {{ status }}</div>
            <div>Your Name: {{ this.currentUser.name }}</div>
            <div class="my-4">
                <button class="bg-gray-200 border border-black px-2" @click="gantiNama">
                    Ganti Nama
                </button>
            </div>
        </div>

        <div v-if="editor" class="editor-canvas w-full">
            <h1 id="page-title">
                Editor Block-based
            </h1>

            <BubbleMenu v-if="editor" id="bubbleMenu" :editor="editor" :tippy-options="{ duration: 10 }">
                <ColorButton class="bubble-menu-btn" :editor="editor" />
                <BoldButton class="bubble-menu-btn" :editor="editor" />
                <ItalicButton class="bubble-menu-btn" :editor="editor" />
                <StrikeButton class="bubble-menu-btn" :editor="editor" />
                <UnderlineButton class="bubble-menu-btn" :editor="editor" />
                <LinkButton class="bubble-menu-btn" :editor="editor" />
                <SuperscriptButton class="bubble-menu-btn" :editor="editor" />
                <SubscriptButton :editor="editor" />
            </BubbleMenu>
            <editor-content id="editor" :editor="editor" :value="editor.getAttributes('textStyle').color" />
        </div>
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

// slash menu
import Commands from './tools/commands/commands.js'
import suggestion from './tools/commands/suggestion.js'
// drag feature
import DraggableItem from './tools/drag/DraggableItem.js'

// collaboration
import Collaboration from '@tiptap/extension-collaboration'
import { HocuspocusProvider } from '@hocuspocus/provider'
// cursor collaboration
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
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
import * as Y from 'yjs'

const ydoc = new Y.Doc()
const getRandomElement = list => list[Math.floor(Math.random() * list.length)]

const provider = new HocuspocusProvider({
    url: 'wss://api.server.rosfandy.my.id',
    name: 'example-document',
    document: ydoc,
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
        SuperscriptButton,
        SubscriptButton
    },
    data() {
        return {
            currentUser: JSON.parse(localStorage.getItem('currentUser')) || {
                name: 'anonymous',
                color: this.getRandomColor(),
            },
            editor: null,
            isEditable: true,
            total: 0,
            status: ""
        }
    },
    watch: {
        isEditable(value) {
            this.editor.setEditable(value)
        },
    },
    mounted() {
        provider.awareness.on('change', () => {
            let awareness = this.buatMapBaru(provider.awareness.getStates())
            console.log(awareness.size)
            this.total = awareness.size
        })
        provider.on('status', evt => {
            console.log(evt.status)
            this.status = evt.status
        })
        this.editor = new Editor({
            extensions: [
                StarterKit.configure({
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
                CollaborationCursor.configure({
                    provider: provider,
                    user: this.currentUser
                }),

            ],
            onUpdate: () => {

                this.$emit('input', this.editor.getJSON().content) // jika mau langsung isi pada key 'content'nya
            },
        })

    },
    beforeDestroy() {
        this.editor.destroy()
    },
    methods: {
        buatMapBaru(dataMap) {
            const mapBaru = new Map();

            for (const [key, value] of dataMap) {
                if (Object.keys(value).length !== 0) {
                    mapBaru.set(key, value);
                }
            }

            return mapBaru;
        },

        gantiNama() {
            const name = (window.prompt('Name') || '')
                .trim()
                .substring(0, 32)

            if (name) {
                return this.updateCurrentUser({
                    name,
                })
            }
        },
        updateCurrentUser(attributes) {
            this.currentUser = { ...this.currentUser, ...attributes }
            this.editor.chain().focus().updateUser(this.currentUser).run()

            localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
        },
        getRandomColor() {
            return getRandomElement([
                '#958DF1',
                '#F98181',
                '#FBBC88',
                '#FAF594',
                '#70CFF8',
                '#94FADB',
                '#B9F18D',
            ])
        },
        addImage() {
            const url = window.prompt('URL')

            if (url) {
                this.editor.chain().focus().setImage({ src: url }).run()
            }
        },
    },
}
</script>

<style>
@import 'style.css';

/* ============ STYLING CURSOR ============ */
/* Give a remote user a caret */
.collaboration-cursor__caret {
    position: relative;
    margin-left: -1px;
    margin-right: -1px;
    border-left: 1px solid #0D0D0D;
    border-right: 1px solid #0D0D0D;
    word-break: normal;
    pointer-events: none;
}

/* Render the username above the caret */
.collaboration-cursor__label {
    position: absolute;
    top: -1.4em;
    left: -1px;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    user-select: none;
    color: #0D0D0D;
    padding: 0.1rem 0.3rem;
    border-radius: 3px 3px 3px 0;
    white-space: nowrap;
}
</style>
