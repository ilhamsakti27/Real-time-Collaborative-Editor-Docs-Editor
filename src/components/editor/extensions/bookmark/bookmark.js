/* eslint-disable  */
import { Node } from '@tiptap/core'

export const Bookmark = Node.create({
    name: 'bookmark',
    group: 'block',
    defining: true,
    marks: '',
    draggable: false,
    // Your code goes here.
    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },
    addAttributes() {
        return {
            src: {
                default: null,
            },
            img: {
                default: null,
            },
            title: {
                default: null,
            },
        };
    },
    parseHTML() {
        return [
            { tag: 'bookmark' },
        ];
    },
    addCommands() {
        return {
            setBookmark: options => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                });
            },
        };
    },
    addNodeView() {
        return options => {
            const container = document.createElement('div');
            const thumbnail = document.createElement('img');
            const title = document.createElement('h3')
            const link = document.createElement('a')
            const wrapper = document.createElement('div')

            container.classList.add('bookmark');
            thumbnail.classList.add('bookmark-thumbnail')
            title.classList.add('bookmark-title')
            link.classList.add('bookmark-link')
            wrapper.classList.add('bookmark-desc')

            thumbnail.src = options.HTMLAttributes.img
            title.innerText = options.HTMLAttributes.title
            link.innerText = options.HTMLAttributes.src
            link.href = options.HTMLAttributes.src

            wrapper.appendChild(title)
            wrapper.appendChild(link)

            container.appendChild(thumbnail);
            container.appendChild(wrapper);

            container.addEventListener('click', () => {
                const src = options.HTMLAttributes.src;
                if (src) {
                    window.location.href = src;
                }
            });
            return {
                dom: container,
                contentDOM: wrapper,
            };

        }
    },

})

