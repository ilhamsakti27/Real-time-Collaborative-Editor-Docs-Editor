/* eslint-disable  */
import { Node, mergeAttributes } from '@tiptap/core'

export const Page = Node.create({
    name: 'linkPage',
    group: 'block',
    content: 'inline*',
    atom: true,
    draggable: true,
    isolating: true,
    // Your code goes here.
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
            docId: {
                default: null,
            },
            title: {
                default: 'Untitled',
            },
        };
    },
    parseHTML() {
        return [
            { tag: 'div[data-type="draggable-item"]' },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        const { docId,title } = HTMLAttributes
        const clickHandler = `window.open('${docId}   ', '_blank')`;
        const onClickAttribute = clickHandler;
        const pageIcon = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 256 256" opacity="0.8" enable-background="new 0 0 256 256" xml:space="preserve"><g><g><path fill="#272829" d="M69,246c-16.3,0-29.5-13.2-29.5-29.5v-177C39.5,23.2,52.7,10,69,10h68.8c5.4,0,9.8,4.4,9.8,9.8c0,5.4-4.4,9.8-9.8,9.8H69c-5.4,0-9.8,4.4-9.8,9.8v177c0,5.4,4.4,9.8,9.8,9.8c5.4,0,9.8,4.4,9.8,9.8C78.8,241.6,74.4,246,69,246z" /><path fill="#272829" d="M187,246h-78.7c-5.4,0-9.8-4.4-9.8-9.8c0-5.4,4.4-9.8,9.8-9.8H187c5.4,0,9.8-4.4,9.8-9.8V88.7c0-5.4,4.4-9.8,9.8-9.8c5.4,0,9.8,4.4,9.8,9.8v127.8C216.5,232.8,203.3,246,187,246z" /><path fill="#272829" d="M206.7,98.5h-49.2C141.2,98.5,128,85.3,128,69V19.8c0-4,2.4-7.6,6.1-9.1s7.9-0.7,10.7,2.1l68.8,68.8c2.8,2.8,3.7,7,2.1,10.7C214.2,96.1,210.6,98.5,206.7,98.5z M147.7,43.6V69c0,5.4,4.4,9.8,9.8,9.8h25.4L147.7,43.6z" /><path fill="#272829" d="M157.2,187H79.1c-0.1,0-0.3-0.1-0.3-0.3v-19.1c0-0.1,0.1-0.3,0.3-0.3h78.1c0.1,0,0.3,0.1,0.3,0.3v19.1C157.5,186.9,157.4,187,157.2,187z" /><path fill="#272829" d="M176.9,147.7H79.1c-0.1,0-0.3-0.1-0.3-0.3v-19.1c0-0.1,0.1-0.3,0.3-0.3h97.8c0.1,0,0.3,0.1,0.3,0.3v19.1C177.2,147.6,177.1,147.7,176.9,147.7z" /></g></g></svg >'
        const parser = new DOMParser();
        const svgElement = parser.parseFromString(pageIcon, 'image/svg+xml').documentElement;
        console.log(svgElement)

        return [
            'div',
            { class: 'linkPage',onclick: onClickAttribute },
            [
                'div',
                { class: 'linkPage-content' },
                [
                    'div',
                    { class: "linkPage-icon" },
                    svgElement
                ],
                [
                    'div',
                    title
                ]
            ],
            ['div', 0]
        ]
    },
    addCommands() {
        return {
            setPage: options => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                });
            },
        };
    },
})

