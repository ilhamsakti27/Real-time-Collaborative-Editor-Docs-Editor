/* eslint-disable */
export function tableRowTools() {
  return [
    {
      title: "Add row up",
      name: "addRowBefore",
      icon: '<svg class="w-5 h-5 md:w-6 md:h-6 inline" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" height="24" aria-hidden="true"  fill="#272829" fill-opacity="0.9" focusable="false"><path d="M6.656 6.464h2.88v2.88h1.408v-2.88h2.88V5.12h-2.88V2.24H9.536v2.88h-2.88zM0 17.92V0h20.48v17.92H0zm7.68-2.56h5.12v-3.84H7.68v3.84zm-6.4 0H6.4v-3.84H1.28v3.84zM19.2 1.28H1.28v9.024H19.2V1.28zm0 10.24h-5.12v3.84h5.12v-3.84zM6.656 6.464h2.88v2.88h1.408v-2.88h2.88V5.12h-2.88V2.24H9.536v2.88h-2.88zM0 17.92V0h20.48v17.92H0zm7.68-2.56h5.12v-3.84H7.68v3.84zm-6.4 0H6.4v-3.84H1.28v3.84zM19.2 1.28H1.28v9.024H19.2V1.28zm0 10.24h-5.12v3.84h5.12v-3.84z"></path></svg>',
      command: (editor) => {
        editor.chain().focus().addRowBefore().run()

      },
    },
    {
      title: "Add row down",
      name: "addRowAfter",
      icon: '<svg class="w-5 h-5 md:w-6 md:h-6 inline" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" height="24" aria-hidden="true"  fill="#272829" fill-opacity="0.9" focusable="false"><path d="M13.824 10.176h-2.88v-2.88H9.536v2.88h-2.88v1.344h2.88v2.88h1.408v-2.88h2.88zM0 17.92V0h20.48v17.92H0zM6.4 1.28H1.28v3.84H6.4V1.28zm6.4 0H7.68v3.84h5.12V1.28zm6.4 0h-5.12v3.84h5.12V1.28zm0 5.056H1.28v9.024H19.2V6.336z"></path></svg>',
      command: (editor) => {
        console.log('Add row after')
        editor.commands.addRowAfter()
      },
    },
    {
      title: "Delete row",
      name: "deleteRow",
      icon: '<svg class="w-5 h-5 md:w-6 md:h-6 inline" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" height="24" aria-hidden="true"  fill="#272829" fill-opacity="0.9" focusable="false"><path d="M17.728 11.456L14.592 8.32l3.2-3.2-1.536-1.536-3.2 3.2L9.92 3.648 8.384 5.12l3.2 3.2-3.264 3.264 1.536 1.536 3.264-3.264 3.136 3.136 1.472-1.536zM0 17.92V0h20.48v17.92H0zm19.2-6.4h-.448l-1.28-1.28H19.2V6.4h-1.792l1.28-1.28h.512V1.28H1.28v3.84h6.208l1.28 1.28H1.28v3.84h7.424l-1.28 1.28H1.28v3.84H19.2v-3.84z"></path></svg>',
      command: (editor) => {
        console.log('Delete row')
        editor.commands.deleteRow()
      },
    },
  ];
}
export function tableColumnTools() {
  return [
    {
      title: "Add column left",
      name: "addColumnBefore",
      icon: '<svg class="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" height="24" aria-hidden="true"  fill="#272829" fill-opacity="0.8" focusable="false"><path d="M6.4 3.776v3.648H2.752v1.792H6.4v3.648h1.728V9.216h3.712V7.424H8.128V3.776zM0 17.92V0h20.48v17.92H0zM12.8 1.28H1.28v14.08H12.8V1.28zm6.4 0h-5.12v3.84h5.12V1.28zm0 5.12h-5.12v3.84h5.12V6.4zm0 5.12h-5.12v3.84h5.12v-3.84z"></path></svg>',
      command: (editor) => {
        editor.commands.addColumnBefore();
      },
    },
    {
      title: "Add column right",
      name: "addColumnAfter",
      icon: '<svg class="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" height="24" aria-hidden="true"  fill="#272829" fill-opacity="0.8" focusable="false"><path d="M14.08 12.864V9.216h3.648V7.424H14.08V3.776h-1.728v3.648H8.64v1.792h3.712v3.648zM0 17.92V0h20.48v17.92H0zM6.4 1.28H1.28v3.84H6.4V1.28zm0 5.12H1.28v3.84H6.4V6.4zm0 5.12H1.28v3.84H6.4v-3.84zM19.2 1.28H7.68v14.08H19.2V1.28z"></path></svg>',
      command: (editor) => {
        editor.commands.addColumnAfter();
      },
    },

    {
      title: "Delete column",
      name: "deleteColumn",
      icon: '<svg class="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" height="24" aria-hidden="true"  fill="#272829" fill-opacity="0.8" focusable="false"><path d="M6.4 9.98L7.68 8.7v-.256L6.4 7.164V9.98zm6.4-1.532l1.28-1.28V9.92L12.8 8.64v-.192zm7.68 9.472V0H0v17.92h20.48zm-1.28-2.56h-5.12v-1.024l-.256.256-1.024-1.024v1.792H7.68v-1.792l-1.024 1.024-.256-.256v1.024H1.28V1.28H6.4v2.368l.704-.704.576.576V1.216h5.12V3.52l.96-.96.32.32V1.216h5.12V15.36zm-5.76-2.112l-3.136-3.136-3.264 3.264-1.536-1.536 3.264-3.264L5.632 5.44l1.536-1.536 3.136 3.136 3.2-3.2 1.536 1.536-3.2 3.2 3.136 3.136-1.536 1.536z"></path></svg>',
      command: (editor) => {
        editor.commands.deleteColumn();
      },
    },
  ];
}
export function tableCellTools() {
  return [
    {
      title: "Merge cells",
      name: "mergeCells",
      icon: '<svg fill="none" height="22" width="22" viewBox="0 0 48 48" stroke="currentColor" opacity="0.9" xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-width="3"><path d="m20 14v-9c0-.55228-.4477-1-1-1h-14c-.55228 0-1 .44772-1 1v38c0 .5523.44772 1 1 1h14c.5523 0 1-.4477 1-1v-9"/><path d="m28 34v9c0 .5523.4477 1 1 1h14c.5523 0 1-.4477 1-1v-38c0-.55228-.4477-1-1-1h-14c-.5523 0-1 .44772-1 1v9"/><path d="m28 24h16"/><path d="m5 24h15"/><path d="m32.7485 28.8183-1.591-1.5909-3.1819-3.182 3.1819-3.182 1.591-1.591" stroke-linejoin="round"/><path d="m15.375 28.8183 1.591-1.5909 3.182-3.182-3.182-3.182-1.591-1.591" stroke-linejoin="round"/></g></svg>',
      command: (editor) => {
        editor.chain().focus().mergeOrSplit().run();
      },
    },
    {
      title: "Toggle header cells",
      name: "headerCells",
      icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22" height="22" opacity="0.6" viewBox="0 0 256 256" enable-background="new 0 0 256 256" xml:space="preserve">< g > <g><path fill="#000000" d="M25.4,10v236h205.2V10H25.4z M210.1,225.5H45.9v-30.8h164.2V225.5L210.1,225.5z M210.1,174.2H45.9V92.1h164.2V174.2L210.1,174.2z" /></g></g ></svg > ',
      command: (editor) => {
        editor.chain().focus().toggleHeaderCell().run()
      },
    },
    {
      title: "Header column",
      name: "toggleHeaderColumn",
      desc: 'Toggle header in column',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" opacity="0.6"  width="22" height="22" viewBox="0 0 24 24" transform="rotate(90)"><g><path fill="none" d="M0 0h24v24H0z"/><path fill-rule="nonzero" d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zm-1 13H4v3h16v-3zM8 5H4v9h4V5zm6 0h-4v9h4V5zm6 0h-4v9h4V5z"/></g></svg>',
      command: (editor) => {
        editor.commands.toggleHeaderColumn();
      },
    },
    {
      title: "Header row",
      name: "toggleHeaderRow",
      desc: 'Toggle header in row',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" opacity="0.6" width="22" height="22" viewBox="0 0 24 24" transform="rotate(180)"><g><path fill="none" d="M0 0h24v24H0z"/><path fill-rule="nonzero" d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zm-1 13H4v3h16v-3zM8 5H4v9h4V5zm6 0h-4v9h4V5zm6 0h-4v9h4V5z"/></g></svg>',
      command: (editor) => {
        editor.commands.toggleHeaderRow();
      },
    },
  ]
}
