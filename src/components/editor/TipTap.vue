<!-- eslint-disable -->
<template>
    <div class="flex">
        <div class="absolute top-20 left-4 w-[15%]">
            <div class="">Online: {{ total }}</div>
            <div>Status: {{ status }}</div>
            <div>Your Name: {{ currentUser.name }}</div>
            <div class="my-4">
                <button class="bg-gray-200 border border-black px-2" @click="gantiNama">
                    Ganti Nama
                </button>
            </div>
            <div class="">
                <button class="bg-gray-200 border border-black px-2"
                    @click="updateCurrentUser({ avatar: getRandomAvatar() })">
                    Ganti Avatar
                </button>
            </div>
        </div>

        <div v-if="editor" class="editor-canvas w-full">
            <floating-menu :should-show="shouldShowMainToolbar" v-if="editor" :editor="editor" :class="{
                'mouse:pointer-events-none mouse:opacity-0': isTyping,
            }" :tippy-options=floatingTippy>
                <div v-if="topLevelNodeType !== 'title' && topLevelNodeType !== 'loading'" class="flex flex-row"
                    pluginKey="" @dragend="endDragging($event)" :draggable="dragging">

                    <!-- sub menu wrapper -->
                    <div class="" id="submenu"></div>
                    <!-- new node menu -->
                    <button ref="newNodeMenu" @click="handleNewNode($event)" @mouseup="
                    " class="ml-1 my-2 hover:bg-slate-100 rounded">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24">
                            <path d="M16 9h-5V4H9v5H4v2h5v5h2v-5h5V9z" />
                        </svg>
                    </button>
                    <!-- action menu -->
                    <button id="action" ref="actionMenu" @click="handleActionMenu($event)"
                        @mousedown="startDragging($event)" @mouseup="
                            draggedNodePosition = false;
                        dragging = false;
                        " class="ml-1 my-2 hover:bg-slate-100 rounded" :class="{
    'cursor-grab': !dragging,
    'cursor-grabbing': dragging,
}" aria-label="Drag" :action-tooltip="actionDataTooltip()">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            aria-hidden="true" focusable="false" class="w-5 h-5 md:w-6 md:h-6">
                            <path
                                d="M8 7h2V5H8v2zm0 6h2v-2H8v2zm0 6h2v-2H8v2zm6-14v2h2V5h-2zm0 8h2v-2h-2v2zm0 6h2v-2h-2v2z">
                            </path>
                        </svg>
                    </button>

                </div>
            </floating-menu>

            <BubbleMenu :editor="editor" :tippy-options="{
                duration: 100, placement: 'top-start',
            }" v-if="editor"
                v-show="topLevelNodeType !== 'title' && topLevelNodeType !== 'image' && topLevelNodeType !== 'codeBlock' && topLevelNodeType !== 'bookmark' && topLevelNodeType !== 'loading' && topLevelNodeType !== 'video' && topLevelNodeType !== 'horizontalRule' && topLevelNodeType !== 'youtube'"
                id="bubbleMenu" class="flex items-center">
                <ColorButton class="bubble-menu-btn border-r bored-black" :editor="editor" />
                <inlineToolsBtn :editor="editor" />
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

// buttons for slash menu
import ImageView from './tools/buttons/popupImage/popupImage.vue'

// floating-menu
import { showActionMenu } from './tools/floating-menu/action'
import { showNewNode } from './tools/floating-menu/newnode'

// utils
import {
    DragNode,
    GetTopLevelBlockCoords,
    GetTopLevelNode,
} from './utils/pm-utils.js'
import { mergeArrays } from './utils/utils'
import defaultBlockTools from './tools/block-tools'
import { uuid } from 'vue-uuid';
import { handleImageDrop, handleVideoDrop } from './utils/handleDrop'

const ydoc = new Y.Doc()
const RandomColor = list => list[Math.floor(Math.random() * list.length)]
const RandomAvatar = list => list[Math.floor(Math.random() * list.length)]
export default {
    components: {
        EditorContent,
        BubbleMenu,
        FloatingMenu,
        ColorButton,
        FontFamilyButton,
        inlineToolsBtn,
        FontFamilyButton,
        ImageView,
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
            documentId: null,
            provider: null,
            currentUser: JSON.parse(localStorage.getItem('currentUser')) || {
                id: uuid.v4(),
                name: 'anonymous',
                color: this.getRandomColor(),
                avatar: this.getRandomAvatar(),
            },
            floatingTippy: {
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
            status: 'disconnect',
            dragging: false,
            draggedNodePosition: null,
            isMenuVisible: false,
            awareness: '',
            bubbleShow: false,
            isTyping: false,
            topLevelNodeType: null,
            showMainToolbar: false,
            isActionMenu: false,
            isNewNode: false,
            currentBlockTool: null,
            isLink: false,
            allBlockTools: mergeArrays(defaultBlockTools(), this.blockTools),
        }
    },
    created() {
        const path = this.$route.path
        this.documentId = path.split('/')[2]
        this.provider = new HocuspocusProvider({
            // url: 'ws://localhost:1234/',
            url: 'wss://editorhocus.oriens.my.id',
            name: this.documentId,
            document: ydoc,
            token: 'test-token', // auth token
        })
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
                this.editor.commands.setTextAlign('left')
            }
        })
        this.provider.awareness.on('change', () => {
            this.awareness = this.filterUsers(this.provider.awareness.getStates())
            this.users = this.awareness
            this.total = this.awareness.size
            this.$emit('update:dataUsers', this.users);
        })
        this.provider.on('status', evt => {
            if (evt.status === 'disconnected') {
                this.status = 'unauthorized'
            } else {
                this.status = evt.status
            }
            console.log('status: ', evt.status)
        })
        this.editor = new Editor({
            extensions: [
                ...defaultExtension,
                Collaboration.configure({
                    document: this.provider.document,
                }),
                CollaborationCursor.configure({
                    provider: this.provider,
                    user: this.currentUser,
                }),
            ],
            editorProps: {
                handleDrop: function (view, event, slice, moved) {
                    if (!moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
                        const path = window.location.href
                        const documentId = path.split('/')[4]
                        const file = event.dataTransfer.files[0]
                        const fileSize = ((file.size / 1024) / 1024).toFixed(4) // fileSize in MB

                        if ((file.type === 'image/jpeg' || file.type === 'image/png')) {
                            const LimitSize = 5 // max size for image = 5 Mb
                            if (fileSize < 5) {
                                handleImageDrop(view, event, file, documentId)
                            } else {
                                alert(`Max Image size is ${LimitSize} mb`)
                            }
                        }
                        if ((file.type === 'video/mp4')) {
                            const LimitSize = 100 // max size for video = 100 Mb
                            if (fileSize < LimitSize) {
                                handleVideoDrop(view, event, file, documentId)
                            } else {
                                alert(`Max Video size is ${LimitSize} mb`)
                            }
                        }
                        return true
                    }
                    return false
                }
            },
            onUpdate: () => {
                this.updateToolbar()
                this.$emit('input', this.editor.getJSON().content)
                this.$emit('update:contentUpdate', this.editor)
            },
            onSelectionUpdate: () => {
                this.updateToolbar()
            },
        })
    },
    beforeDestroy() {
        this.editor.destroy()
    },
    methods: {
        actionDataTooltip() {
            return this.topLevelNodeType === 'image' || this.topLevelNodeType === 'video' || this.topLevelNodeType === 'bookmark' ? 'Drag component for move' : 'Hold for dragging'
        },
        getTopLevelNodeType() {
            this.isLink = this.editor.view.state.selection.$head.parent.content.content[0]?.marks[0]?.type.name === 'link'
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
        handleNewNode(event) {
            this.isNewNode = true
            if (this.topLevelNodeType !== 'title') { showNewNode(this.editor, this.topLevelNodeType, this.isNewNode) }
        },
        handleActionMenu(event) {
            this.isActionMenu = true
            if (this.topLevelNodeType !== 'title') { showActionMenu(this.editor, this.topLevelNodeType, this.isActionMenu) }
        },
        filterUsers(dataMap) {
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
        getRandomAvatar() {
            return RandomAvatar([
                'brook.svg',
                'chopper.svg',
                'franky.svg',
                'jimbei.svg',
                'nami.svg',
                'robin.svg',
                'sanji.svg',
                'usopp.svg',
                'zoro.svg',
                'luffy.svg',
            ])
        },
        getRandomColor() {
            return RandomColor([
                '#958DF1',
                '#F98181',
                '#FBBC88',
                '#FAF594',
                '#70CFF8',
                '#94FADB',
                '#B9F18D',
            ])
        },
        startDragging(event) {
            if (this.topLevelNodeType === "image") {
                return this.dragging = false
            }
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
        tableIsActive() {
            return this.getTopLevelNodeType() == "table";
        },
        getTableRowMenuCoords() {
            return GetTableRowCoords(this.editor.view);
        },

        getTableColumnMenuCoords() {
            return GetTableColumnCoords(this.editor.view);
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