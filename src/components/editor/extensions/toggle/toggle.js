/* eslint-disable  */
import { Node, wrappingInputRule } from '@tiptap/core'

const inputRegex = /^\s*>\s$/;

export const Toggle = Node.create({
  name: 'toggle',
  group: 'block',
  content: 'block+',
  defining: true,
  draggable: true,
  marks: '',
  addAttributes() {
    return {
      HTMLAttributes: {},
    };
  },
  parseHTML() {
    return [{ tag: 'toggle' }];
  },
  addCommands() {
    return {
      setToggleList: () => ({ commands }) => {
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
      const container = document.createElement('div');
      const heading = document.createElement('h1');

      container.className = 'toggle';
      container.appendChild(heading);

      return {
        dom: container,
        contentDOM: container,
      };
    };
  },
});
