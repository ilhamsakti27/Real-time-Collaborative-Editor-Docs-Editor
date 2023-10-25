<!-- eslint-disable -->
<template>
    <div class="flex">
        <div class="pl-8 pt-20 w-[20%]">
            <div>Online: {{ total }}</div>
            <div>Status: {{ status }}</div>
            <div>Your Name: {{ currentUser.name }}</div>
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
            <floating-menu pluginKey="" @dragend="endDragging($event)" :draggable="dragging"
                :should-show="shouldShowMainToolbar" v-if="editor" :editor="editor" :class="{
                    'mouse:pointer-events-none mouse:opacity-0': isTyping,
                }" :tippy-options="{
    maxWidth: 'none',
    placement: 'left-start',
    animation: 'fade',
    duration: 300,
    getReferenceClientRect: getMenuCoords,
    onCreate: (instance) =>
        instance.popper.classList.add(
            'max-md:!sticky',
            'max-md:!bottom-0',
            'max-md:!top-auto',
            'max-md:!transform-none'
        ),
}">
                <div class="flex flex-row">
                    <div class="" id="submenu"></div>
                    <div class="">
                        <button ref="subMenuBtn" @keydown.enter.prevent @click="handleSubMenu"
                            @mousedown="startDragging($event)" @mouseup="
                                draggedNodePosition = false;
                            dragging = false;
                            " class="ml-1 my-2 hover:bg-slate-100 rounded" :class="{
    'cursor-grab': !dragging,
    'cursor-grabbing mr-1': dragging,
}" aria-label="Drag" data-tooltip="Drag">
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                aria-hidden="true" focusable="false" class="w-5 h-5 md:w-6 md:h-6">
                                <path
                                    d="M8 7h2V5H8v2zm0 6h2v-2H8v2zm0 6h2v-2H8v2zm6-14v2h2V5h-2zm0 8h2v-2h-2v2zm0 6h2v-2h-2v2z">
                                </path>
                            </svg>
                        </button>

                    </div>
                </div>

            </floating-menu>

            <BubbleMenu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor" id="bubbleMenu">
                <ColorButton class="bubble-menu-btn" :editor="editor" />
                <BoldButton class="bubble-menu-btn" :editor="editor" />
                <ItalicButton class="bubble-menu-btn" :editor="editor" />
                <StrikeButton class="bubble-menu-btn" :editor="editor" />
                <UnderlineButton class="bubble-menu-btn" :editor="editor" />
                <LinkButton class="bubble-menu-btn" :editor="editor" />
                <SuperscriptButton class="bubble-menu-btn" :editor="editor" />
                <SubscriptButton class="bubble-menu-btn" :editor="editor" />
            </BubbleMenu>
            <editor-content id="editor" :editor="editor" :value="editor.getAttributes('textStyle').color" />
        </div>
    </div>
</template>

<script>
/* eslint-disable */
// tiptap extension
import { Editor } from '@tiptap/core'
import { BubbleMenu, EditorContent, FloatingMenu } from '@tiptap/vue-2'
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

import {
    DragNode,
    MoveNode,
    GetTopLevelBlockCoords,
    GetTableColumnCoords,
    GetTableRowCoords,
    GetTopLevelNode,
} from "./utils/pm-utils.js";
import { showSubMenu } from "./tools/floating/submenu"

const ydoc = new Y.Doc()
const getRandomElement = list => list[Math.floor(Math.random() * list.length)]

const provider = new HocuspocusProvider({
    url: 'wss://api.server.rosfandya.my.id',
    name: 'example-document',
    document: ydoc,
})

export default {
    props: {
        editorClass: {
            type: String,
        },
    },
    components: {
        EditorContent,
        BubbleMenu,
        FloatingMenu,
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
                avatar: 'https://unavatar.io/github/ueberdosis',
            },
            editor: null,
            isEditable: true,
            total: 0,
            status: "",
            dragging: false,
            draggedNodePosition: null,
            isMenuVisible: false,
            awareness: '',
            bubbleShow: false,
            isTyping: false,
            topLevelNodeType: null,
            showMainToolbar: false,
            isSubMenu: false

        }
    },
    watch: {
        isEditable(value) {
            this.editor.setEditable(value)
        },
    },
    mounted() {
        provider.awareness.on('change', () => {
            this.awareness = this.buatMapBaru(provider.awareness.getStates())
            console.log(this.awareness)
            this.total = this.awareness.size
        })
        provider.on('status', evt => {
            console.log(evt.status)
            this.status = evt.status
        })
        this.editor = new Editor({
            extensions: [
                StarterKit.configure({
                    history: false,
                    blockquote: false
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
        handleSubMenu() {
            showSubMenu(this.editor)
        },
        buatMapBaru(dataMap) {
            const mapBaru = new Map();

            for (const [key, value] of dataMap) {
                if (Object.keys(value).length !== 0) {
                    mapBaru.set(key, value);
                }
            }

            return mapBaru;
        },
        shouldShowMainToolbar() {
            return this.editor.isActive();
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
        startDragging(event) {
            let coords = { left: event.clientX + 48, top: event.clientY };
            if (this.editor.view.posAtCoords(coords)) {
                this.draggedNodePosition = this.editor.view.posAtCoords(coords).pos;
                console.log("node drag pos: ", this.draggedNodePosition)
                this.dragging = true;
            }
        },
        endDragging(event) {
            let targetNodeFromCoords = this.editor.view.posAtCoords({
                left: event.clientX + 20,
                top: event.clientY,
            });
            alert('test')
            if (targetNodeFromCoords) {
                DragNode({
                    view: this.editor.view,
                    state: this.editor.state,
                    draggedNodePosition: this.draggedNodePosition,
                    targetNodePosition: targetNodeFromCoords.pos,
                });
            }

            this.dragging = false;
            this.draggedNode = null;
        },
        getMenuCoords() {
            return GetTopLevelBlockCoords(this.editor.view);
        },
        getTableRowMenuCoords() {
            return GetTableRowCoords(this.editor.view);
        },
        getTableColumnMenuCoords() {
            return GetTableColumnCoords(this.editor.view);
        },
        moveNode(dir = "UP") {
            MoveNode({
                view: this.editor.view,
                dir: dir,
                currentResolved: this.editor.view.state.selection.$from,
            });
        },
        canMoveNodeDown() {
            const selectionStart = this.editor.view.state.selection.$from;
            return selectionStart.index(0) < selectionStart.node(0).childCount - 1;
        },

        canMoveNodeUp() {
            const selectionStart = this.editor.view.state.selection.$from;
            return selectionStart.index(0) > 0;
        },
    },
    directives: {
        draggableItem: {
            inserted: function (el) {
                el.setAttribute('data-type', 'draggable-item');
            }
        }
    }
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
