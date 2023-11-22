/* eslint-disable  */
import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';

const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;
export const Video = Node.create({
    name: 'video',
    draggable: true,
    allowGapCursor: true,
    content: 'inline*',
    atom: true,
    draggable: true,
    isolating: true,

    // Your code goes here
    addOptions() {
        return {
            HTMLAttributes: {},
            inline: false
        };
    },
    inline() {
        return this.options.inline
    },
    group() {
        return this.options.inline ? 'inline' : 'block'
    },
    addAttributes() {
        return {
            src: {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
        };
    },
    parseHTML() {
        return [
            { tag: 'video[data-type="embed"]' },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        const { src } = HTMLAttributes
        return [
            'div',
            {
                class: "videoNode"
            },
            ['iframe',
                mergeAttributes(this.options.HTMLAttributes,
                    {
                        width: '640',
                        height: '360',
                        frameborder: 0,
                        allowfullscreen: true,
                        src: src
                    },
                ),
            ],
            ['div', { class: 'emptyNode' }, 0]
        ]
    },
    addCommands() {
        return {
            setVideo: options => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                });
            },
        };
    },

    addInputRules() {
        return [
            nodeInputRule({
                find: inputRegex,
                type: this.type,
                getAttributes: match => {
                    const [, , alt, src, title] = match;
                    return { src, alt, title };
                },
            }),
        ];
    },

})

