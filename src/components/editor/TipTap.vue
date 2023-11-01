<!-- eslint-disable -->
<template>
    <div class="flex">
        <div class=" absolute top-20 left-4 w-[20%]">

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
            <floating-menu :should-show="shouldShowMainToolbar" v-if="editor" :editor="editor" :class="{
                'mouse:pointer-events-none mouse:opacity-0': isTyping,
            }" :tippy-options="tippy">
                <div class="" @dragend="endDragging($event)" pluginKey="" :draggable="dragging">
                    <div v-if="topLevelNodeType !== 'title'" class="flex flex-row">
                        <div class="" id="submenu"></div>
                        <div class="">
                            <button ref="newLineBtn" @keydown.enter.prevent @click="handleNewLine($event)"
                                class=" ml-1 my-2 hover:bg-slate-100 rounded" data-tooltip="Add new block">
                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24">
                                    <path d="M16 9h-5V4H9v5H4v2h5v5h2v-5h5V9z" />
                                </svg>
                            </button>
                            <button ref="subMenuBtn" @keydown.enter.prevent @click="handleSubMenu($event)"
                                @mousedown="startDragging($event)" @mouseup="
                                    draggedNodePosition = false;
                                dragging = false;
                                " class="ml-1 my-2 hover:bg-slate-100 rounded" :class="{
    'cursor-grab': !dragging, 'cursor-grabbing': dragging,
}" aria-label="Drag" data-tooltip="Drag or Menu">
                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    aria-hidden="true" focusable="false" class="w-5 h-5 md:w-6 md:h-6">
                                    <path
                                        d="M8 7h2V5H8v2zm0 6h2v-2H8v2zm0 6h2v-2H8v2zm6-14v2h2V5h-2zm0 8h2v-2h-2v2zm0 6h2v-2h-2v2z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </floating-menu>

            <BubbleMenu :editor="editor" :tippy-options="{
                duration: 100, placement: 'top-start',
            }" v-if="editor" v-show="topLevelNodeType !== 'title'" id="bubbleMenu" class="flex items-center">
                <ColorButton class="bubble-menu-btn border-r bored-black" :editor="editor" />
                <inlineToolsBtn :editor="editor" class="" />
                <FontFamilyButton class="bubble-menu-btn border-r" :editor="editor" />
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
import defaultExtension from './extensions'


// collaboration
import { HocuspocusProvider } from '@hocuspocus/provider'
import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from './extensions/collaborationCursor'

// buttons for bubble menu
import ColorButton from './tools/buttons/ColorButton.vue'
import FontFamilyButton from './tools/buttons/FontFamilyButton.vue'
import inlineToolsBtn from './tools/buttons/InlineButton.vue'

// floating-menu
import { showActionMenu } from './floating-menu/action'
import { showNewNode } from './floating-menu/newnode'

// utils
import {
    DragNode,
    GetTopLevelBlockCoords,
    GetTableColumnCoords,
    GetTableRowCoords,
    GetTopLevelNode,
} from './utils/pm-utils.js'
import { mergeArrays } from './utils/utils'
import defaultBlockTools from './tools/block-tools'

const ydoc = new Y.Doc()
const getRandomElement = list => list[Math.floor(Math.random() * list.length)]

const provider = new HocuspocusProvider({
    url: 'wss://api.server.rosfandy.my.id/',
    // url: 'ws://localhost:1234/',
    name: 'example-document',
    document: ydoc,
})

import { uuid } from 'vue-uuid';

export default {
    components: {
        EditorContent,
        BubbleMenu,
        FloatingMenu,
        ColorButton,
        FontFamilyButton,
        inlineToolsBtn,
        FontFamilyButton,
    },
    props: {
        editorClass: {
            type: String,
        },
        blockTools: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            currentUser: JSON.parse(localStorage.getItem('currentUser')) || {
                id: uuid.v4(),
                name: 'anonymous',
                color: this.getRandomColor(),
                avatar: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"> <g fill="#54595d"> <path d="M10 11c-5.92 0-8 3-8 5v3h16v-3c0-2-2.08-5-8-5z"/> <circle cx="10" cy="5.5" r="4.5"/></g></svg>',
            },
            tippy: {
                maxWidth: '350',
                placement: 'left-start',
                animation: 'fade',
                duration: 300,
                getReferenceClientRect: this.getMenuCoords,
                onCreate: instance => instance.popper.classList.add(
                    'max-md:!sticky',
                    'max-md:!bottom-0',
                    'max-md:!top-auto',
                    'max-md:!transform-none',
                ),
            },
            editor: null,
            isEditable: true,
            total: 0,
            users: '',
            status: '',
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
    computed: {
        activeAlignmentTools() {
            if (this.topLevelNodeType) {
                return this.allAlignmentTools.filter(alignmentToolGroup => alignmentToolGroup.find(tool => tool.isActiveTest(this.editor, this.topLevelNodeType)))
            }
            return null
        },
    },
    watch: {
        isEditable(value) {
            this.editor.setEditable(value)
        },
        topLevelNodeType() {
            this.currentBlockTool = this.getCurrentBlockTool()
        },
    },
    mounted() {
        document.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                if (this.editor.isActive('highlight') && this.editor.isActive('textStyle')) {
                    this.editor.chain().focus().unsetHighlight().unsetColor()
                        .run()
                } else if (this.editor.isActive('highlight')) {
                    this.editor.chain().focus().unsetHighlight().run()
                } else if (this.editor.isActive('textStyle')) {
                    this.editor.chain().focus().unsetColor().run()
                }
            }
        })
        provider.awareness.on('change', () => {
            this.awareness = this.buatMapBaru(provider.awareness.getStates())
            this.users = this.awareness
            this.total = this.awareness.size
            this.$emit('update:dataUsers', this.users);
        })
        provider.on('status', evt => {
            this.status = evt.status
        })
        this.editor = new Editor({
            extensions: [
                ...defaultExtension,
                Collaboration.configure({
                    document: provider.document,
                }),
                CollaborationCursor.configure({
                    provider,
                    user: this.currentUser,
                }),
            ],
            onUpdate: () => {
                this.updateToolbar()
                this.$emit('input', this.editor.getJSON().content)
            },
            onSelectionUpdate: () => {
                this.updateToolbar()
                // this.nodeTree = GetNodeTree(this.editor.view);
            },
        })
    },
    beforeDestroy() {
        this.editor.destroy()
    },
    methods: {
        getTopLevelNodeType() {
            return GetTopLevelNode(this.editor.view)?.type.name
        },
        updateToolbar() {
            this.topLevelNodeType = this.getTopLevelNodeType()
        },
        getCurrentBlockTool() {
            return this.allBlockTools.find(
                tool => tool.name == this.topLevelNodeType
                    || tool.tools?.find(tool => tool.name == this.topLevelNodeType),
            )
        },
        handleNewLine(event) {
            this.isNewNode = true
            if (this.topLevelNodeType !== 'title') { showNewNode(this.editor, this.topLevelNodeType, this.isNewNode) }
        },
        handleSubMenu(event) {
            this.isSubMenu = true
            if (this.topLevelNodeType !== 'title') { showActionMenu(this.editor, this.topLevelNodeType, this.isSubMenu) }
        },
        buatMapBaru(dataMap) {
            const mapBaru = new Map()
            for (const [key, value] of dataMap) {
                const userId = value.user.id
                if (!mapBaru.has(userId)) {
                    mapBaru.set(userId, value)
                }
            }
            return mapBaru
        },
        shouldShowMainToolbar() {
            return this.editor.isActive()
        },
        gantiNama() {
            const name = (window.prompt('Name') || '')
                .trim()
                .substring(0, 32)
            const id = uuid.v4()
            if (name) {
                return this.updateCurrentUser({
                    id,
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
            const coords = { left: event.clientX + 48, top: event.clientY }
            if (this.editor.view.posAtCoords(coords)) {
                this.draggedNodePosition = this.editor.view.posAtCoords(coords).pos
                this.dragging = true
            }
        },
        endDragging(event) {
            const targetNodeFromCoords = this.editor.view.posAtCoords({
                left: event.clientX + 20,
                top: event.clientY,
            })
            if (targetNodeFromCoords) {
                DragNode({
                    view: this.editor.view,
                    state: this.editor.state,
                    draggedNodePosition: this.draggedNodePosition,
                    targetNodePosition: targetNodeFromCoords.pos,
                })
            }
            this.dragging = false
            this.draggedNode = null
        },
        getMenuCoords() {
            const coord = GetTopLevelBlockCoords(this.editor.view)
            const val = coord.left - 12
            const updatedCoord = {
                bottom: coord.bottom,
                height: coord.height,
                left: val,
                right: coord.right,
                top: coord.top,
                width: coord.width,
                x: coord.x,
                y: coord.y,
            }

            return updatedCoord
        },
        getTableRowMenuCoords() {
            return GetTableRowCoords(this.editor.view)
        },
        getTableColumnMenuCoords() {
            return GetTableColumnCoords(this.editor.view)
        },
    },
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
</style>
