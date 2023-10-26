/* eslint-disable  */
const floatingItems = [
    {
        title: 'MoveUp',
        operation: ['movenode', 'up'],
        ref: 'moveUpBtn',
        desc: 'Move up current block',
        icon: '<svg width="24" height="24"  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" focusable="false"><path d="M6.5 12.4L12 8l5.5 4.4-.9 1.2L12 10l-4.5 3.6-1-1.2z"></path></svg>',
    },
    {
        title: 'MoveDown',
        operation: ['movenode', 'down'],
        ref: 'moveDownBtn',
        desc: 'Move down current block',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" ><path d="M17.5 11.6 12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" /></svg>',
    },
    {
        title: 'Delete',
        operation: ['delete', ''],
        ref: 'deleteBtn',
        desc: 'Delete current block',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 -4 24 34 " stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>',
    },
    {
        title: 'Turn Into',
        operation: ['convert', ''],
        ref: 'convertBtn',
        desc: 'Convert current block',
        icon: '<svg fill="#000000" width="12" height="12" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 423.755 423.755" xml:space="preserve"><g><path d="M43.84,281.457c-18.585-44.869-18.586-94.29,0-139.159c10.649-25.709,26.678-48.152,46.86-66.135l60.86,60.86V15.099H29.635l39.88,39.88c-64.293,58.426-88.5,153.2-53.391,237.959c14.167,34.202,37.07,64.159,66.234,86.634c28.275,21.789,61.873,36.201,97.162,41.677l4.601-29.646C120.778,381.774,68.337,340.597,43.84,281.457z"/><path d="M407.516,292.938c21.652-52.272,21.652-109.848,0-162.12c-14.167-34.202-37.071-64.159-66.234-86.633C313.007,22.395,279.409,7.983,244.12,2.507l-4.601,29.646c63.342,9.829,115.783,51.005,140.28,110.146c18.586,44.869,18.586,94.29,0,139.159c-10.649,25.709-26.678,48.152-46.859,66.135l-60.86-60.86v121.924h121.924l-39.801-39.801C377.118,348.099,395.334,322.348,407.516,292.938z"/></g></svg>',
    },
]

export default floatingItems
