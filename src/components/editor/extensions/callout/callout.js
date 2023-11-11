/* eslint-disable  */
import { Node, wrappingInputRule } from '@tiptap/core'

const inputRegex = /^\s*>\s$/;
export const Callout = Node.create({
    name: 'callout',
    group: 'block',
    content: 'block+',
    defining: true,
    marks: '',
    // Your code goes here.
    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },
    parseHTML() {
        return [
            { tag: 'callout' },
        ];
    },

    addCommands() {
        return {
            setCallout: () => ({ commands }) => {
                console.log(this.name)
                const command = commands.wrapIn(this.name);
                return command
            },
        };
    },
    addInputRules() {
        return [
            wrappingInputRule({
                find: inputRegex,
                type: this.type,
            }),
        ];
    },
    addNodeView() {
        return () => {
            const container = document.createElement('callout')
            const emoji = document.createElement('div')
            const content = document.createElement('div')
            emoji.classList.add('callout-emoji')
            content.classList.add('callout-content')

            container.append(emoji)
            container.append(content)
            return {
                dom: container,
                contentDOM: content,
            }

        }
    },

})

