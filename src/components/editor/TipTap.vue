<!-- eslint-disable -->
<template>
    <div class="flex">
        <div class=" absolute top-4 left-4 w-[20%]">
            <div class="flex gap-x-3 mb-4 border p-2 w-max max-w-md overflow-x-scroll">
                <div v-for="(item, index) in users" :key="index" class="flex gap-x-2 items-center">
                    <span v-html="item[1].user.avatar" class="rounded-[50%] w-[20px] h-[20px]" />
                    <div class="">{{ index === 0 ? 'Me' : item[1].user.name }}</div>
                </div>
            </div>
            <div class="">Online: {{ total }}</div>
            <div>Status: {{ status }}</div>
            <div>Your Name: {{ currentUser.name }}</div>
            <div class="my-4">
                <button class="bg-gray-200 border border-black px-2" @click="gantiNama">
                    Ganti Nama
                </button>
            </div>
        </div>


        <div v-if="editor" class="editor-canvas w-full">
            <floating-menu pluginKey="" @dragend="endDragging($event)" :draggable="dragging"
                :should-show="shouldShowMainToolbar" v-if="editor" :editor="editor" :class="{
                    'mouse:pointer-events-none mouse:opacity-0': isTyping,
                }" :tippy-options="{
    maxWidth: '350',
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
                <div v-if="topLevelNodeType !== 'title'" class="flex flex-row">
                    <div class="" id="submenu"></div>
                    <div class="">
                        <button ref="newLineBtn" @keydown.enter.prevent @click="handleNewLine($event)" @mouseup="
                            draggedNodePosition = false;
                        dragging = false;
                        " class="ml-1 my-2 hover:bg-slate-100 rounded">
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24">
                                <path d="M16 9h-5V4H9v5H4v2h5v5h2v-5h5V9z" />
                            </svg>
                        </button>
                        <button ref="subMenuBtn" @keydown.enter.prevent @click="handleSubMenu($event)" @mouseup="
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

            <BubbleMenu :editor="editor" :tippy-options="{
                duration: 100, placement: 'top-start',
            }" v-if="editor" id="bubbleMenu" class="flex items-center">
                <ColorButton class="bubble-menu-btn border-r bored-black" :editor="editor" />
                <inlineToolsBtn :editor="editor" class=""></inlineToolsBtn>
                <LinkButton class="bubble-menu-btn" :editor="editor" />
                <!-- <StrikeButton class="bubble-menu-btn" :editor="editor" /> -->
                <!-- <UnderlineButton class="bubble-menu-btn" :editor="editor" /> -->
                <!-- <SuperscriptButton class="bubble-menu-btn" :editor="editor" /> -->
                <!-- <SubscriptButton class="bubble-menu-btn" :editor="editor" /> -->
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
import Placeholder from './custom-extension/placeholder'
import Focus from '@tiptap/extension-focus'
import Heading from '@tiptap/extension-heading'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import { ColumnExtension, } from "./custom-extension/column"
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
import Highlight from '@tiptap/extension-highlight'
// import Document from "@tiptap/extension-document";

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
import CollaborationCursor from './custom-extension/collaborationCursor'

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
import inlineToolsBtn from './tools/buttons/InlineButton.vue'
import Document from '@tiptap/extension-document'

import * as Y from 'yjs'

import {
    DragNode,
    MoveNode,
    GetTopLevelBlockCoords,
    GetTableColumnCoords,
    GetTableRowCoords,
    GetTopLevelNode,
} from "./utils/pm-utils.js";
import { showActionMenu } from "./floating-menu/action/actionMenu"
import { showNewNode } from "./floating-menu/newnode/newNode"
import { mergeArrays } from "./utils/utils";
import defaultBlockTools from "./tools/block-tools";
import { DocumentWithTitle, Title, TitleExtension } from './custom-extension/title'
import { v4 as uuidv4 } from 'uuid';

const ydoc = new Y.Doc()
const getRandomElement = list => list[Math.floor(Math.random() * list.length)]

const provider = new HocuspocusProvider({
    url: 'wss://editorhocus.oriena.my.id/',
    name: 'example-document',
    document: ydoc,
})

export default {
    props: {
        editorClass: {
            type: String,
        },
        blockTools: {
            type: Array,
            default: () => [],
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
        SubscriptButton,
        inlineToolsBtn
    },
    data() {
        return {
            currentUser: JSON.parse(localStorage.getItem('currentUser')) || {
                id: uuidv4(),
                name: 'anonymous',
                color: this.getRandomColor(),
                avatar: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"> <g fill="#54595d"> <path d="M10 11c-5.92 0-8 3-8 5v3h16v-3c0-2-2.08-5-8-5z"/> <circle cx="10" cy="5.5" r="4.5"/> </g> </svg>',
            },
            editor: null,
            isEditable: true,
            total: 0,
            users: '',
            status: "",
            dragging: false,
            draggedNodePosition: null,
            isMenuVisible: false,
            awareness: '',
            bubbleShow: false,
            isTyping: false,
            topLevelNodeType: null,
            showMainToolbar: false,
            isSubMenu: false,
            isNewNode: false,
            currentBlockTool: null,
            allBlockTools: mergeArrays(defaultBlockTools(), this.blockTools),
        }
    },
    watch: {
        isEditable(value) {
            this.editor.setEditable(value)
        },
        topLevelNodeType() {
            this.currentBlockTool = this.getCurrentBlockTool();
        },
    },
    computed: {
        activeAlignmentTools() {
            if (this.topLevelNodeType) {
                return this.allAlignmentTools.filter((alignmentToolGroup) =>
                    alignmentToolGroup.find((tool) =>
                        tool.isActiveTest(this.editor, this.topLevelNodeType)
                    )
                );
            } else {
                return null;
            }
        },
    },
    mounted() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (this.editor.isActive('highlight') && this.editor.isActive('textStyle')) {
                    this.editor.chain().focus().unsetHighlight().unsetColor().run();
                } else if (this.editor.isActive('highlight')) {
                    this.editor.chain().focus().unsetHighlight().run();
                } else if (this.editor.isActive('textStyle')) {
                    this.editor.chain().focus().unsetColor().run();
                }
            }
        })
        provider.awareness.on('change', () => {
            this.awareness = this.buatMapBaru(provider.awareness.getStates())
            console.log(this.awareness)
            this.users = this.awareness
            this.total = this.awareness.size
        })
        provider.on('status', evt => {
            this.status = evt.status
        })
        this.editor = new Editor({
            extensions: [
                DocumentWithTitle,
                Title,
                StarterKit.configure({
                    history: false,
                    blockquote: false,
                    document: false,
                }),
                Highlight.configure({ multicolor: true }),
                Placeholder.configure({
                    placeholder: ({ node }) => {
                        console.log(node)
                        let text = `Write something … or type '/' to choose block`
                        switch (node.type.name) {
                            case 'title':
                                text = 'Untitled'
                                break;
                            case 'heading':
                                text = 'Heading'
                                break;
                            case 'codeBlock':
                                text = 'place your code'
                                break;
                            default:
                                break;
                        }
                        return text
                    },
                    showOnlyCurrent: false,
                    includeChildren: true
                }),
                // Focus.configure({
                //     className: 'has-focus',
                //     mode: 'deepest'
                // }),
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
                this.updateToolbar();
                this.$emit('input', this.editor.getJSON().content) // jika mau langsung isi pada key 'content'nya
            },
            onSelectionUpdate: () => {
                this.updateToolbar();
                // this.nodeTree = GetNodeTree(this.editor.view);
            },
        })

    },
    beforeDestroy() {
        this.editor.destroy()
    },
    methods: {
        getTopLevelNodeType() {
            return GetTopLevelNode(this.editor.view)?.type.name;
        },
        updateToolbar() {
            this.topLevelNodeType = this.getTopLevelNodeType();
        },
        getCurrentBlockTool() {
            return this.allBlockTools.find(
                (tool) =>
                    tool.name == this.topLevelNodeType ||
                    tool.tools?.find((tool) => tool.name == this.topLevelNodeType)
            );
        },
        handleNewLine(event) {
            if (event.target.tagName.toLowerCase() === 'svg') {
                // Hide the submenu when there's a click outside the component
                this.isNewNode = true;
                if (this.topLevelNodeType !== 'title')
                    showNewNode(this.editor, this.topLevelNodeType, this.isNewNode);
            } else {
                // Show the submenu when there's a click inside the component
                this.isNewNode = false;
                if (this.topLevelNodeType !== 'title')
                    showNewNode(this.editor, this.topLevelNodeType, this.isNewNode);
            }
        },
        handleSubMenu(event) {
            if (event.target.tagName.toLowerCase() === 'svg') {
                // Hide the submenu when there's a click outside the component
                this.isSubMenu = true;
                if (this.topLevelNodeType !== 'title')
                    showActionMenu(this.editor, this.topLevelNodeType, this.isSubMenu);
            } else {
                // Show the submenu when there's a click inside the component
                this.isSubMenu = false;
                if (this.topLevelNodeType !== 'title')
                    showActionMenu(this.editor, this.topLevelNodeType, this.isSubMenu);
            }
        },
        buatMapBaru(dataMap) {
            const mapBaru = new Map();

            for (const [key, value] of dataMap) {
                const userId = value.user.id;

                if (!mapBaru.has(userId) && Object.keys(value).length !== 0) {
                    mapBaru.set(userId, value);
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
                    avatar: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"> <g fill="#54595d"> <path d="M10 11c-5.92 0-8 3-8 5v3h16v-3c0-2-2.08-5-8-5z"/> <circle cx="10" cy="5.5" r="4.5"/> </g> </svg>',
                })
            }
        },
        updateCurrentUser(attributes) {
            console.log(attributes)
            this.currentUser = { ...this.currentUser, ...attributes }
            console.log(this.currentUser)
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
            let coord = GetTopLevelBlockCoords(this.editor.view)
            console.log(this.editor.view)
            let val = coord.left - 12
            let updatedCoord = {
                bottom: coord.bottom,
                height: coord.height,
                left: val,
                right: coord.right,
                top: coord.top,
                width: coord.width,
                x: coord.x,
                y: coord.y,
            };
            return updatedCoord;
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

<style >
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
</style>./floating-menu/submenu/actionMenu./floating-menu/action/submenu