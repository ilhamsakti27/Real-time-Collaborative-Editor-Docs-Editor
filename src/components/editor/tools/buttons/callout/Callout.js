/* eslint-disable */
import { Node } from '@tiptap/core'

export default class CalloutNode extends Node {
  // Define the name of the node
  name() {
    return 'calloutNode'
  }

  // Define the default attributes for the node
  defaultAttributes() {
    return {
      // Define your node's attributes here
      // For example, you can define a text attribute like this:
      content: 'My custom content',
    };
  }

  // Define the schema for the node
  schema() {
    return {
      content: 'inline*',
      attrs: {
        // Define the attributes and their types here
        class: {
          default: 'callout',
        },
      },
      // You can specify other schema properties like marks, content, etc. here
    };
  }

  // Define the HTML representation of the node
  toDOM(node) {
    // Return a DOM representation for the node
    // return ['div', { class: 'my-custom-node' }, node.attrs.content];
    return ['h1', { class: 'my-custom-node' }, 0]
  }

  // Define the ProseMirror JSON representation of the node
  parseDOM() {
    return [
      {
        tag: 'div.my-custom-node',
        getAttrs: (dom) => ({ content: dom.textContent }),
      },
    ];
  }
}
