/* eslint-disable */

import { Node } from '@tiptap/core';

const CalloutNode = Node.create({
  name: 'quote',

  defaultOptions: {
    // You can define default options for your node extension here
  },

  content: 'block+',

  addProseMirrorPlugins() {
    return [
      {
        name: 'quote',
        nodeType: 'blockquote',
        plugin: () => {
          return {
            // Add ProseMirror plugins or other custom behavior here
          };
        },
      },
    ];
  },

  addCommands() {
    return {
      toggleQuote: () => ({ commands }) => {
        return commands.toggleNode('quote', 'paragraph');
      },
    };
  },
});

export default CalloutNode;
