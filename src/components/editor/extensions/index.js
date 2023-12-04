// tiptap extension
import StarterKit from '@tiptap/starter-kit'
// import Focus from '@tiptap/extension-focus'
import Heading from '@tiptap/extension-heading'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
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
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import Typography from '@tiptap/extension-typography'
import Highlight from '@tiptap/extension-highlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { common, createLowlight } from './lowlight'

// custom extensions
import { ColumnExtension } from './column'
import { Placeholder } from './placeholder'
import Video from './video'
import { LoadingExtension } from './loading'
import { CalloutExtension } from './callout'
import { DocumentWithTitle, Title } from './title'
import { BookmarkExtension } from './bookmark'
import { YoutubeExtension } from './youtube'
import { LinkToPage } from './page'
import { ToggleExtension } from './toggle'
import { DetailsExtension } from './details'

// slash menu extension
import Commands from '../tools/commands/commands'
import suggestion from '../tools/commands/suggestion'

const lowlight = createLowlight()
lowlight.register(common)

const defaultExtension = [
  DocumentWithTitle,
  CalloutExtension,
  BookmarkExtension,
  LoadingExtension,
  YoutubeExtension,
  ToggleExtension,
  DetailsExtension,
  Video,
  Title,
  LinkToPage,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
  StarterKit.configure({
    history: false,
    blockquote: false,
    document: false,
  }),
  Highlight.configure({ multicolor: true }),
  Placeholder.configure({
    placeholder: ({ node, editor }) => {
      let text = 'Write something … or type \'/\' to choose block'
      switch (node.type.name) {
        case 'title':
          text = 'Untitled'
          break
        case 'heading':
          text = 'Heading'
          break
        case 'codeBlock':
          text = 'write code ...'
          break
        case 'tableCell':
          text = 'table cell'
          break
        case 'tableHeader':
          text = 'table header'
          break
        case 'orderedList':
          text = 'text'
          break

        default:
          break
      }
      if (editor.isActive('table')) text = ''

      return text
    },
    showOnlyCurrent: false,
    includeChildren: true,
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
    content: '(inline|hardBreak?)*',
    atom: true,
    isolating: true,
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
  Table.configure({
    resizable: true,
  }),
  TableRow.extend({
    allowGapCursor: true,
  }),
  TableHeader.extend({
    // content: "inline*",
    isolating: false,
  }),
  TableCell.extend({
    // content: "inline*",
    isolating: false,
  }),
]

export default defaultExtension
