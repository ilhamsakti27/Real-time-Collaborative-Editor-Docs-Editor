<template>
  <div class="flex">
    <!-- user name & avatar -->
    <div class="absolute top-20 left-4 w-[15%]">
      <div class="">
        Online: {{ total }}
      </div>
      <div>Status: {{ status }}</div>
      <div>Your Name: {{ currentUser.name }}</div>
      <div class="my-4">
        <button
          class="bg-gray-200 border border-black px-2"
          @click="gantiNama"
        >
          Ganti Nama
        </button>
      </div>
      <div class="">
        <button
          class="bg-gray-200 border border-black px-2"
          @click="updateCurrentUser({ avatar: getRandomAvatar() })"
        >
          Ganti Avatar
        </button>
      </div>
    </div>

    <div
      v-if="editor"
      class="editor-canvas w-full"
    >
      <floating-menu
        v-if="editor"
        :should-show="shouldShowFloatingMenu"
        :editor="editor"
        :class="{ 'mouse:pointer-events-none mouse:opacity-0': isTyping, }"
        :tippy-options="floatingTippy"
      >
        <div
          v-if="topLevelNodeType !== 'title' && topLevelNodeType !== 'loading'"
          class="flex flex-row"
          pluginKey=""
          :draggable="dragging"
          @dragend="endDragging($event)"
        >
          <!-- sub menu wrapper -->
          <div
            id="submenu"
          />
          <!-- new node menu -->
          <!-- <button ref="newNodeMenu" @click="handleNewNode($event)" @mouseup="
            " class="ml-1 my-2 hover:bg-slate-100 rounded">
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24">
                    <path d="M16 9h-5V4H9v5H4v2h5v5h2v-5h5V9z" />
                </svg>
            </button> -->
          <!-- action menu -->
          <button
            ref="actionMenu"
            class="ml-1 my-2 hover:bg-slate-100 rounded"
            :class="{
              'cursor-grab': !dragging,
              'cursor-grabbing': dragging,
            }"
            aria-label="Drag"
            :action-tooltip="actionDataTooltip()"
            @click="handleActionMenu($event)"
            @mousedown="startDragging($event)"
            @mouseup="draggedNodePosition = false; dragging = false;"
          >
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              class="w-5 h-5 md:w-6 md:h-6"
            >
              <path
                d="M8 7h2V5H8v2zm0 6h2v-2H8v2zm0 6h2v-2H8v2zm6-14v2h2V5h-2zm0 8h2v-2h-2v2zm0 6h2v-2h-2v2z"
              />
            </svg>
          </button>
        </div>
      </floating-menu>

      <BubbleMenu
        v-if="editor"
        v-show="shouldRenderBubbleMenu"
        id="bubbleMenu"
        class="flex items-center"
        plugin-key="mainBubleMenu"
        :editor="editor"
        :tippy-options="{
          duration: 500, placement: 'top-start'
        }"
      >
        <div
          v-if="topLevelNodeType !== 'table'"
          class="flex"
        >
          <ColorButton
            v-if="!isLink"
            class="bubble-menu-btn border-r bored-black"
            :editor="editor"
          />
          <inlineToolsBtn :editor="editor" />
          <FontFamilyButton
            v-if="!isLink"
            class="bubble-menu-btn border-r"
            :editor="editor"
          />
        </div>
      </BubbleMenu>

      <BubbleMenu
        v-if="editor && (tableRowTools || tableColumnTools)"
        id="bubbleMenu"
        class="flex items-center mb-[-2vh] ml-[2vh]"
        plugin-key="tableBubbleMenu"
        :editor="editor"
        :tippy-options="{
          duration: 500, placement: 'top-start', getReferenceClientRect: getMenuCoords,
        }"
        :should-show="tableIsActive"
      >
        <TableCellMenu :editor="editor" />
      </BubbleMenu>

      <!-- table row menu -->
      <bubble-menu
        v-if="editor && tableRowTools"
        :editor="editor"
        class="ml-[-2.5vh]"
        plugin-key="tableRowMenu"
        :should-show="tableIsActive"
        :tippy-options="{
          placement: 'right',
          animation: 'fade',
          zIndex: 1,
          duration: 500,
          getReferenceClientRect: getTableRowMenuCoords,
        }"
      >
        <menu-item
          :action="Row"
          class="py-1 border bg-white border-black/30 shadow rounded-md hover:bg-slate-100"
        >
          <menu-button
            title="Row tools"
            class="rounded-full text-slate-400 hover:text-slate-800 "
            :content="rowIconTable"
          />
          <template #dropdown>
            <div class="flex flex-col gap-y-1">
              <menu-dropdown-button
                v-for="( tool ) in tableRowTools "
                :key="tool.title"
                :content="tool.icon"
                :label="tool.title"
                :editor="editor"
                :tool="tool"
              />
            </div>
          </template>
        </menu-item>
      </bubble-menu>

      <!-- table column menu -->
      <bubble-menu
        v-if="editor && tableColumnTools"
        :editor="editor"
        class="mt-[-5vh] "
        plugin-key="tableColumnMenu"
        :should-show="tableIsActive"
        :tippy-options="{
          placement: 'bottom',
          animation: 'fade',
          duration: 500,
          zIndex: 1,
          getReferenceClientRect: getTableColumnMenuCoords,
        }"
      >
        <menu-item
          :action="Column"
          class="px-1 border bg-white border-black/30 shadow rounded-md hover:bg-slate-100"
        >
          <menu-button
            title="Column tools"
            :content="colIconTable"
          />
          <template #dropdown>
            <div class="flex flex-col gap-y-1">
              <menu-dropdown-button
                v-for="( tool ) in tableColumnTools"
                :key="tool.title"
                :content="tool.icon"
                :label="tool.title"
                :editor="editor"
                :tool="tool"
              />
            </div>
          </template>
        </menu-item>
      </bubble-menu>

      <!-- editor -->
      <editor-content
        id="editor"
        :editor="editor"
        :value="editor.getAttributes('textStyle').color"
      />
    </div>
  </div>
</template>

<script>
// /* eslint-disable */
// tiptap extension
import { Editor } from '@tiptap/core'
import { BubbleMenu, EditorContent, FloatingMenu } from '@tiptap/vue-2'

// utils
import { uuid } from 'vue-uuid'

// collaboration
import { HocuspocusProvider } from '@hocuspocus/provider'
import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'

// tiptap extension
import defaultExtension from './extensions'

import { CollaborationCursor } from './extensions/collaborationCursor'

// buttons for bubble menu
import ColorButton from './tools/buttons/ColorButton.vue'
import FontFamilyButton from './tools/buttons/FontFamilyButton.vue'
import inlineToolsBtn from './tools/buttons/InlineButton.vue'

// buttons for slash menu
// import ImageView from './tools/buttons/popupImage/popupImage.vue'

// floating-menu
import { showActionMenu } from './tools/floating-menu/action'
import { showNewNode } from './tools/floating-menu/newnode'

// utils
import {
  DragNode,
  GetTopLevelBlockCoords,
  GetTopLevelNode,
  GetTableRowCoords,
  GetTableColumnCoords,
} from './utils/pm-utils'
import { mergeArrays } from './utils/utils'
import defaultBlockTools from './tools/utils/block-tools'
// import { uuid } from 'vue-uuid'
import { handleImageDrop, handleVideoDrop } from './utils/handleDrop'
import { tableRowTools, tableColumnTools } from './tools/utils/table'
import MenuItem from './tools/buttons/tableTools/MenuItem.vue'
import MenuButton from './tools/buttons/tableTools/MenuButton.vue'
import MenuDropdownButton from './tools/buttons/tableTools/MenuDropdownButton.vue'
import TableCellMenu from './tools/buttons/TableCellMenu.vue'

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
    // FontFamilyButton,
    // ImageView,
    MenuItem,
    MenuButton,
    MenuDropdownButton,
    TableCellMenu,
  },
  props: {
    editorClass: {
      type: String,
      default: null, // no default
    },
    blockTools: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      Column: 'Column',
      Row: 'Row',
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
        duration: 500,
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
      currentNodeType: null,
      showMainToolbar: false,
      isActionMenu: false,
      isNewNode: false,
      currentBlockTool: null,
      isLink: false,
      allBlockTools: mergeArrays(defaultBlockTools(), this.blockTools),
      tableRowTools: tableRowTools(),
      tableColumnTools: tableColumnTools(),
      rowIconTable:
        '<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="#000000" fill-opacity="0.6" viewBox="0 0 24 24" ><path d="M8 7h2V5H8v2zm0 6h2v-2H8v2zm0 6h2v-2H8v2zm6-14v2h2V5h-2zm0 8h2v-2h-2v2zm0 6h2v-2h-2v2z"></path></svg>',
      colIconTable:
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  width="20" height="20" viewBox="0 0 1080 1080" xml:space="preserve">s<g transform="matrix(1 0 0 1 540 540)" id="dffe12cd-379f-4c7f-809c-4df8310a30e8"></g><g transform="matrix(1 0 0 1 540 540)" id="9f349ec6-c8b5-4016-b84a-996103897a35"></g><g transform="matrix(0 45 -45 0 540 540)"><path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgba(0,0,0,0.6); fill-rule: nonzero; opacity: 1;" transform=" translate(-12, -12)" d="M 8 7 L 10 7 L 10 5 L 8 5 L 8 7 z M 8 13 L 10 13 L 10 11 L 8 11 L 8 13 z M 8 19 L 10 19 L 10 17 L 8 17 L 8 19 z M 14 5 L 14 7 L 16 7 L 16 5 L 14 5 z M 14 13 L 16 13 L 16 11 L 14 11 L 14 13 z M 14 19 L 16 19 L 16 17 L 14 17 L 14 19" stroke-linecap="round"/></g><g transform="matrix(NaN NaN NaN NaN 0 0)"><g style=""></g></g></svg>',
    }
  },
  computed: {
    activeAlignmentTools() {
      if (this.topLevelNodeType) {
        return this.allAlignmentTools.filter(alignmentToolGroup => alignmentToolGroup.find(tool => tool.isActiveTest(this.editor, this.topLevelNodeType)))
      }

      return null
    },
    shouldRenderBubbleMenu() {
      const excludedNodeTypes = [
        'title', 'image', 'codeBlock', 'bookmark',
        'loading', 'video', 'horizontalRule', 'youtube', 'linkPage',
      ]

      return !excludedNodeTypes.includes(this.currentNodeType)
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
  created() {
    // const path = this.$route.path
    const { path } = this.$route
    // eslint-disable-next-line prefer-destructuring
    this.documentId = path.split('/')[2]

    this.provider = new HocuspocusProvider({
      // url: 'ws://localhost:1234/',
      url: 'wss://editorhocus.oriens.my.id',
      name: this.documentId,
      document: ydoc,
      token: 'test-token', // auth token
    })
  },
  mounted() {
    // FOR RESET COLOR, ALIGN, HIGLIGHT FOR NEW LINE
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
      this.$emit('update:dataUsers', this.users)
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
        /* eslint-disable */
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
      /* eslint-enable */
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
      const mediaNodeTypes = ['image', 'video', 'bookmark', 'youtube']

      return mediaNodeTypes.includes(this.topLevelNodeType)
        ? 'Drag component for move'
        : 'Hold for dragging'
    },
    getTopLevelNodeType() {
      this.isLink = this.editor.view.state.selection.$head.parent.content.content[0]?.marks[0]?.type.name === 'link'
      const child = this.editor.view.state.selection
      if (child.node !== undefined) this.currentNodeType = child.node.type.name
      else this.currentNodeType = GetTopLevelNode(this.editor.view)?.type.name
      console.log(this.currentNodeType)

      return GetTopLevelNode(this.editor.view)?.type.name
    },
    updateToolbar() {
      this.topLevelNodeType = this.getTopLevelNodeType()
    },
    getCurrentBlockTool() {
      return this.allBlockTools.find(
        // eslint-disable-next-line
        tool => tool.name === this.topLevelNodeType || tool.tools?.find(tool => tool.name === this.topLevelNodeType),
      )
    },
    handleNewNode() {
      this.isNewNode = true
      if (this.topLevelNodeType !== 'title') { showNewNode(this.editor, this.topLevelNodeType, this.isNewNode) }
    },
    handleActionMenu() {
      this.isActionMenu = true
      if (this.topLevelNodeType !== 'title') { showActionMenu(this.editor, this.topLevelNodeType, this.isActionMenu) }
    },
    filterUsers(dataMap) {
      /* eslint-disable */
      const mapBaru = new Map()
      for (const [key, value] of dataMap) {
        const userId = value.user.id
        if (!mapBaru.has(userId)) {
          mapBaru.set(userId, value)
        }
      }
      // dataMap.forEach(([value]) => {
      //   const userId = value.user.id
      //   if (!mapBaru.has(userId)) {
      //     mapBaru.set(userId, value)
      //   }
      // })
      /* eslint-enable */

      return mapBaru
    },
    shouldShowFloatingMenu() {
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

      return null // add return
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
      // if (this.topLevelNodeType === "image") {
      //     return this.dragging = false
      // }
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
      return this.getTopLevelNodeType() === 'table'
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
</style>./tools/utils/block-tools./tools/utils/table
