<template>
  <div style="display: flex;">
    <!-- user name & avatar -->
    <div
      class="username-and-avatar"
    >
      <div class="">
        Online: {{ total }}
      </div>
      <div>Status: {{ status }}</div>
      <div>Your Name: {{ currentUser.name }}</div>
      <div
        style="margin-top: 1rem;"
        class="button-ganti-nama-avatar"
      >
        <button
          @click="gantiNama"
        >
          Ganti Nama
        </button>
      </div>
      <div class="button-ganti-nama-avatar">
        <button
          @click="updateCurrentUser({ avatar: getRandomAvatar() })"
        >
          Ganti Avatar
        </button>
      </div>
    </div>

    <div
      v-if="editor"
      class="editor-canvas"
    >
      <floating-menu
        v-if="editor"
        :should-show="shouldShowFloatingMenu"
        :editor="editor"
        :class="{ 'isTyping': isTyping, }"
        :tippy-options="floatingTippy"
      >
        <div
          v-if="topLevelNodeType !== 'title' && topLevelNodeType !== 'loading'"
          style="display: flex;flex-direction: row;"
          pluginKey=""
          :draggable="dragging"
          @click="handleActionMenu($event)"
          @dragend="endDragging($event)"
        >
          <button
            id="submenu"
            ref="actionMenu"
            style="margin-left: 0.25rem; padding-top: 0.3rem; border-radius: 0.375rem;"
            aria-label="Drag"
            action-tooltip="Hold for dragging"
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
              <path d="M8 7h2V5H8v2zm0 6h2v-2H8v2zm0 6h2v-2H8v2zm6-14v2h2V5h-2zm0 8h2v-2h-2v2zm0 6h2v-2h-2v2z" />
            </svg>
          </button>
        </div>
      </floating-menu>

      <BubbleMenu
        v-if="editor"
        v-show="shouldRenderBubbleMenu"
        id="bubbleMenu"
        plugin-key="mainBubleMenu"
        :editor="editor"
        :tippy-options="{
          duration: 500, placement: 'top-start'
        }"
      >
        <div
          style="display: flex; align-items: center;"
        >
          <ColorButton
            style="border-radius: 8px 0 0 8px;"
            class="bubble-menu-btn"
            :editor="editor"
          />
          <inlineToolsBtn
            :editor="editor"
            :node="topLevelNodeType"
          />
          <FontFamilyButton
            style="border: none; border-radius: 0 8px 8px 0;"
            class="bubble-menu-btn"
            :editor="editor"
          />
        </div>
      </BubbleMenu>

      <BubbleMenu
        v-if="editor && (tableRowTools || tableColumnTools)"
        id="bubbleMenuTable"
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
        id="tableRowMenu"
        :editor="editor"
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
          id="menuItem"
          :action="Row"
        >
          <menu-button
            id="menuButton"
            title="Row tools"
            :content="rowIconTable"
          />
          <template #dropdown>
            <div id="dropdown">
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
        id="tableColMenu"
        :editor="editor"
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
          class="menu-item"
        >
          <menu-button
            title="Column tools"
            :content="colIconTable"
          />
          <template #dropdown>
            <div style="display: flex; flex-direction: column;   row-gap: 0.25rem; ">
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
// tiptap extension
import { Editor } from '@tiptap/core'
import { BubbleMenu, EditorContent, FloatingMenu } from '@tiptap/vue-2'

// utils
import { uuid } from 'vue-uuid'

// collaboration
import { HocuspocusProvider } from '@hocuspocus/provider'
import * as Y from 'yjs'
import Collaboration from '@tiptap/extension-collaboration'
import { ToggleExtension } from './extensions/toggle'

// tiptap extension
import defaultExtension from './extensions'

import { CollaborationCursor } from './extensions/collaborationCursor'

// buttons for bubble menu
import ColorButton from './tools/buttons/ColorButton.vue'
import FontFamilyButton from './tools/buttons/FontFamilyButton.vue'
import inlineToolsBtn from './tools/buttons/InlineButton.vue'

// floating-menu
import { showActionMenu } from './tools/floating-menu/action'

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
        'loading', 'video', 'horizontalRule', 'youtube', 'Page', 'toggle',
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
    const { path } = this.$route
    const [, , documentId] = path.split('/')
    this.documentId = documentId
    // backend for collab
    this.provider = new HocuspocusProvider({
      // url: 'wss://editorhocus.oriens.my.id',
      url: 'wss://lorem',
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
        ToggleExtension,
        Collaboration.configure({
          document: this.provider.document,
        }),
        CollaborationCursor.configure({
          provider: this.provider,
          user: this.currentUser,
        }),
      ],
      editorProps: {
        handleDrop(view, event, slice, moved) {
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
                // eslint-disable-next-line no-alert
                alert(`Max Image size is ${LimitSize} mb`)
              }
            }
            if ((file.type === 'video/mp4')) {
              const LimitSize = 100 // max size for video = 100 Mb
              if (fileSize < LimitSize) {
                handleVideoDrop(view, event, file, documentId)
              } else {
                // eslint-disable-next-line no-alert
                alert(`Max Video size is ${LimitSize} mb`)
              }
            }

            return true
          }

          return false
        },
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
    getTopLevelNodeType() {
      const child = this.editor.view.state.selection
      if (child.node !== undefined) this.currentNodeType = child.node.type.name
      else this.currentNodeType = GetTopLevelNode(this.editor.view)?.type.name

      return GetTopLevelNode(this.editor.view)?.type.name
    },
    updateToolbar() {
      this.topLevelNodeType = this.getTopLevelNodeType()
    },
    getCurrentBlockTool() {
      return this.allBlockTools.find(
        tool => {
          if (tool.name === this.topLevelNodeType) {
            return true
          }
          if (tool.tools && tool.tools.length > 0) {
            return tool.tools.find(
              childTool => childTool.name === this.topLevelNodeType,
            ) !== undefined
          }

          return false
        },
      )
    },

    handleActionMenu() {
      this.isActionMenu = !this.isActionMenu
      this.$nextTick(() => {
        if (this.topLevelNodeType !== 'title') {
          showActionMenu(this.editor, this.topLevelNodeType, this.isActionMenu)
        }
      })
    },
    filterUsers(dataMap) {
      const dataArray = Array.from(dataMap.values())

      const mapBaru = new Map()
      dataArray.forEach(value => {
        const userId = value.user.id
        if (!mapBaru.has(userId)) {
          mapBaru.set(userId, value)
        }
      })

      return mapBaru
    },
    shouldShowFloatingMenu() {
      return this.editor.isActive()
    },
    gantiNama() {
      // eslint-disable-next-line no-alert
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

      return null
    },
    updateCurrentUser(attributes) {
      this.currentUser = { ...this.currentUser, ...attributes }
      this.editor.chain().focus().updateUser(this.currentUser).run()
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    },
    getRandomAvatar() {
      return RandomAvatar([
        'brook',
        'chopper',
        'franky',
        'jimbei',
        'nami',
        'robin',
        'sanji',
        'usopp',
        'zoro',
        'luffy',
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

.isTyping {
  pointer-events: none;
  opacity: 0;
}

button:hover {
  background-color: #e1e1e1;
}
#bubbleMenuTable{
  display: flex;
  align-items: center;
  margin-bottom: -2vh;
  margin-left: 1vh;
  border-radius: 4px;
  background: #fff;
  width: -moz-max-content;
  width: max-content;
  border-width: 1px;
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 transparent), var(--tw-ring-shadow, 0 0 transparent), var(--tw-shadow);
}
/* #bubbleMenu {
  background-color: pink;
} */
#tableRowMenu{
  margin-left: -2.5vh;
}

#tableColMenu {
  margin-top: -5vh;
  margin-bottom: -20vh;
}

#tableRowMenu {
  padding: 4px 0px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 6px;
  background-color: white;
}

#tableColMenu {
  padding: 0px 2px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 6px;
}

#tableRowMenu:hover,
#tableColMenu:hover {
  background-color: #e1e1e1;
}

#menuButton {
  border-radius: 9999px;
  color: rgb(148 163 184);
}

#menuButton:hover {
  color: rgb(30 41 59);
}

#dropdown {
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
  /* 4px */
}

.menu-item {
  padding-left: 0.25rem;
  /* 4px */
  padding-right: 0.25rem;
  /* 4px */
  border-width: 1px;
  border-color: rgb(0 0 0);
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  border-radius: 0.25rem;
  /* 4px */
}

.details {
  display: flex;
  margin: 1rem 0;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;

  >button {
    display: flex;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;

    &::before {
      content: '\25B6';
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.5em;
      height: 1.5em;
    }
  }

  &.is-open>button::before {
    content: '\25BC';
  }

  >div {
    flex: 1 1 auto;
  }

  :last-child {
    margin-bottom: 0;
  }
}
.button-ganti-nama-avatar {
  margin: 0.3rem 0;
}
.button-ganti-nama-avatar button {
  border-radius: 4px;
  border: 1px solid rgb(203 213 225);
  background-color: #fff;
  padding: 0.2rem 0.8rem;
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
}
.username-and-avatar {
  position: absolute;
  top: 5rem;
  left: 1rem;
  width: 15%;
}
</style>
