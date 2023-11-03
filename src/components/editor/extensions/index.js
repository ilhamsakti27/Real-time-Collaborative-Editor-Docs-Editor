/* eslint-disable  */
// tiptap extension
import StarterKit from '@tiptap/starter-kit'
import Focus from '@tiptap/extension-focus'
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
import { createLowlight } from './lowlight'

// custom extensions
import { ColumnExtension } from './column'
import Placeholder from './placeholder'
import { DocumentWithTitle, Title } from './title'

// slash menu extension
import Commands from '../tools/commands/commands'
import suggestion from '../tools/commands/suggestion'

// highlight js
import bash from 'highlight.js/lib/languages/bash'
import c from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import python from 'highlight.js/lib/languages/python'
import scss from 'highlight.js/lib/languages/scss'
import typescript from 'highlight.js/lib/languages/typescript'

const lowlight = createLowlight()
lowlight.register({ javascript })
lowlight.register({ json })
lowlight.register({ typescript })
lowlight.register({ python })
lowlight.register({ bash })
lowlight.register({ c })
lowlight.register({ cpp })
lowlight.register({ markdown })
lowlight.register({ css })
lowlight.register({ scss })

const defaultExtension = [
    DocumentWithTitle,
    Title,
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
        placeholder: ({ node }) => {
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
                default:
                    break
            }

            return text
        },
        showOnlyCurrent: false,
        includeChildren: true,
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
]

export default defaultExtension