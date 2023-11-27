import {
  MoveNode,
} from '@/components/editor/utils/pm-utils'

const floatingItems = [
  {
    title: 'MoveUp',
    ref: 'moveUpBtn',
    desc: 'Move up current block',
    icon: '<svg width="24" height="24"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" focusable="false"><path d="M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"></path></svg>',
    command: editor => {
      MoveNode({
        view: editor.view,
        dir: 'UP',
        currentResolved: editor.view.state.selection.$from,
      })
    },
  },
  {
    title: 'MoveDown',
    ref: 'moveDownBtn',
    desc: 'Move down current block',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" ><path d="M17.5 11.6 12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" /></svg>',
    command: editor => {
      MoveNode({
        view: editor.view,
        dir: 'DOWN',
        currentResolved: editor.view.state.selection.$from,
      })
    },
  },
  {
    title: 'Delete',
    ref: 'deleteBtn',
    desc: 'Delete current block',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="20" height="20"  viewBox="0 0 24 24 " stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>',
    command: (editor, node) => {
      editor.commands.deleteNode(node)
    },
  },
  {
    title: 'Turn Into',
    ref: 'convertBtn',
    desc: 'Convert current block',
    icon: '<svg fill="#272829" width="16" height="16" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 423.755 423.755" style=" display:flex; align-items:center; justify-content:center;"  xml:space="preserve"><g><path d="M43.84,281.457c-18.585-44.869-18.586-94.29,0-139.159c10.649-25.709,26.678-48.152,46.86-66.135l60.86,60.86V15.099H29.635l39.88,39.88c-64.293,58.426-88.5,153.2-53.391,237.959c14.167,34.202,37.07,64.159,66.234,86.634c28.275,21.789,61.873,36.201,97.162,41.677l4.601-29.646C120.778,381.774,68.337,340.597,43.84,281.457z"/><path d="M407.516,292.938c21.652-52.272,21.652-109.848,0-162.12c-14.167-34.202-37.071-64.159-66.234-86.633C313.007,22.395,279.409,7.983,244.12,2.507l-4.601,29.646c63.342,9.829,115.783,51.005,140.28,110.146c18.586,44.869,18.586,94.29,0,139.159c-10.649,25.709-26.678,48.152-46.859,66.135l-60.86-60.86v121.924h121.924l-39.801-39.801C377.118,348.099,395.334,322.348,407.516,292.938z"/></g></svg>',
    /* eslint-disable-next-line */
    command: (editor, node) => {
      // editor.commands.deleteNode(node)
    /* eslint-disable-next-line */
      alert('On Progress')
    },
  },
  {
    title: 'Unset Highlight',
    ref: 'unsetHghlBtn',
    desc: 'Clear current highlight',
    icon: '<svg enable-background="new 0 0 24 24"  width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m6.41 19 3.29 3.29-1.41 1.41-3.29-3.29-3.29 3.29-1.41-1.41 3.29-3.29-3.29-3.29 1.41-1.41 3.29 3.29 3.29-3.29 1.41 1.41z"/><path d="m24 13.25-10.33-5.96 5.4-7.29h-2.49l-5.83 7.87-.02.01v.01.01l.01.01c1.53 2.57 1.7 3.72.87 5.85l-.31.8.87.51-3.17 5.93h7.26l1.48-2.69.83.48.51-.83c1.15-1.86 2.6-2.43 4.92-2.22zm-8.92 5.75h-2.74l1.57-2.93 2.11 1.23zm2.85-2.9-4.17-2.43c.46-1.51.43-2.74.03-4l7.31 4.22c-1.26.35-2.29 1.06-3.17 2.21z"/></svg>',
    command: editor => {
      editor.chain().focus().unsetHighlight().run()
    },
  },
  {
    title: 'Unset Color',
    ref: 'unsetColorBtn',
    desc: 'Clear current text color',
    icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" data-name="Layer 1" viewBox="0 0 100 100" x="0px" y="0px"><title>Artboard 32</title><path d="M27.17,27.31l-2.83,2.83L35.82,41.61C32.74,46.94,30.39,52.24,30.39,56A19.58,19.58,0,0,0,63.94,69.74l8.89,8.89,2.83-2.83Z"/><path d="M69.61,56C69.61,45.16,50,21.38,50,21.38s-5.36,6.5-10.47,14.25L67.89,64A19.51,19.51,0,0,0,69.61,56Z"/></svg>',
    command: editor => {
      editor.chain().focus().unsetColor().run()
    },
  },
  {
    title: 'Change title',
    ref: 'pageTitle',
    desc: 'Change page title',
    icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 256 256" enable-background="new 0 0 256 256" xml:space="preserve">< g > <g><path fill="#000000" d="M39.1,10v236l88.9-75.2l88.9,75.2V10H39.1z M204.1,59H53.5V27.4h150.6L204.1,59L204.1,59z" /></g></g ></svg > ',
    command: editor => {
      const title = (window.prompt('Page Title') || '')
        .trim()
        .substring(0, 32)
      if (title !== '') { editor.chain().focus().updateAttributes('Page', { title }).run() }
    },
  },

]

export default floatingItems
