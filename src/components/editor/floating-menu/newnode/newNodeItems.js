/* eslint-disable  */
import { PopupImage } from '../../tools/buttons/popupImage'

const blockTools = [
    {
        name: 'paragraph',
        title: 'Paragraph',
        desc: 'Create a simple text',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 28 32" fill="none"> <path d="M9 0C4 0 0 4 0 9C0 14 4 18 9 18H14V32H18V4H20V32H24V4H28V0H9Z" fill="#272829" fill-opacity="0.8"/> </svg>',
        command: ({ editor, range }) => {
            editor.commands.enter()
            editor.commands.setNode('paragraph')
        },
    },
    {
        name: 'heading1',
        title: 'Heading 1',
        desc: 'Big section heading',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 50" fill="none"> <g filter="url(#filter0_d_12_47)"> <path d="M6 8V40M25 8V40M6 24H25M34.226 24L39 19.017V40" stroke="#272829" stroke-opacity="0.8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/> </g> <defs> <filter id="filter0_d_12_47" x="-4" y="0" width="56" height="56" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"> <feFlood flood-opacity="0" result="BackgroundImageFix"/> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/> <feOffset dy="4"/> <feGaussianBlur stdDeviation="2"/> <feComposite in2="hardAlpha" operator="out"/> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12_47"/> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_12_47" result="shape"/> </filter> </defs> </svg>',
        command: ({ editor, range }) => {
            editor.commands.enter()
            editor.commands.setNode('heading', { level: 1 })
        },
    },
    {
        name: 'heading2',
        title: 'Heading 2',
        desc: 'Medium section heading',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none"> <path d="M6 8V40M24 8V40M7 24H23M32 25C32 21.833 34.667 20 37 20C39.333 20 42 21.833 42 25C42 30.7 32 34.933 32 40H42" stroke="#272829" stroke-opacity="0.8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
        command: ({ editor, range }) => {
            editor.commands.enter()
            editor.commands.setNode('heading', { level: 2 })
        },
    },
    {
        name: 'heading3',
        title: 'Heading 3',
        desc: 'Small section heading',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none"> <path d="M6 8V40M24 8V40M7 24H23M32 20H42L35 29C39 29 42 31 42 35C42 39 39 40 37 40C34.619 40 33 39 32 37.9" stroke="#272829" stroke-opacity="0.8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/> </svg>',
        command: ({ editor, range }) => {
            editor.commands.enter()
            editor.commands.setNode('heading', { level: 3 })
        },
    },
    {
        name: 'numberedList',
        title: 'Numbered List',
        desc: 'Create a list with numbering',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none"> <path d="M7.208 6.17801C7.44726 6.3061 7.64728 6.49671 7.78675 6.72952C7.92623 6.96233 7.99993 7.22861 8 7.50001V17H9.5C9.89782 17 10.2794 17.158 10.5607 17.4393C10.842 17.7207 11 18.1022 11 18.5C11 18.8978 10.842 19.2794 10.5607 19.5607C10.2794 19.842 9.89782 20 9.5 20H3.5C3.10218 20 2.72064 19.842 2.43934 19.5607C2.15804 19.2794 2 18.8978 2 18.5C2 18.1022 2.15804 17.7207 2.43934 17.4393C2.72064 17.158 3.10218 17 3.5 17H5V10.302L4.332 10.748C4.00098 10.9635 3.59833 11.0397 3.21147 10.9601C2.8246 10.8805 2.48474 10.6515 2.26565 10.3229C2.04656 9.99427 1.96593 9.59249 2.04126 9.20477C2.11659 8.81706 2.3418 8.47469 2.668 8.25201L5.668 6.25201C5.89396 6.10144 6.15655 6.01504 6.42776 6.002C6.69898 5.98897 6.96865 6.0498 7.208 6.17801ZM17.5 11C17.1022 11 16.7206 11.158 16.4393 11.4393C16.158 11.7206 16 12.1022 16 12.5C16 12.8978 16.158 13.2794 16.4393 13.5607C16.7206 13.842 17.1022 14 17.5 14H40.5C40.8978 14 41.2794 13.842 41.5607 13.5607C41.842 13.2794 42 12.8978 42 12.5C42 12.1022 41.842 11.7206 41.5607 11.4393C41.2794 11.158 40.8978 11 40.5 11H17.5ZM17.5 23C17.1022 23 16.7206 23.158 16.4393 23.4393C16.158 23.7207 16 24.1022 16 24.5C16 24.8978 16.158 25.2794 16.4393 25.5607C16.7206 25.842 17.1022 26 17.5 26H40.5C40.8978 26 41.2794 25.842 41.5607 25.5607C41.842 25.2794 42 24.8978 42 24.5C42 24.1022 41.842 23.7207 41.5607 23.4393C41.2794 23.158 40.8978 23 40.5 23H17.5ZM17.5 35C17.1022 35 16.7206 35.158 16.4393 35.4393C16.158 35.7206 16 36.1022 16 36.5C16 36.8978 16.158 37.2794 16.4393 37.5607C16.7206 37.842 17.1022 38 17.5 38H40.5C40.8978 38 41.2794 37.842 41.5607 37.5607C41.842 37.2794 42 36.8978 42 36.5C42 36.1022 41.842 35.7206 41.5607 35.4393C41.2794 35.158 40.8978 35 40.5 35H17.5ZM11 31.5C11 30.092 10.458 28.928 9.56 28.128C8.7118 27.3912 7.62347 26.99 6.5 27C5.43 27 4.312 27.356 3.44 28.13C2.542 28.928 2 30.094 2 31.5C2 31.8978 2.15804 32.2794 2.43934 32.5607C2.72064 32.842 3.10218 33 3.5 33C3.89782 33 4.27936 32.842 4.56066 32.5607C4.84196 32.2794 5 31.8978 5 31.5C5 30.908 5.208 30.572 5.434 30.372C5.73278 30.1234 6.11141 29.9913 6.5 30C6.93 30 7.312 30.144 7.566 30.37C7.792 30.572 8 30.906 8 31.5C8 32.164 7.862 32.46 7.58 32.814C7.396 33.04 7.148 33.294 6.774 33.652L6.48 33.932C6.176 34.22 5.82 34.558 5.44 34.94L2.44 37.94C2.15862 38.221 2.00035 38.6023 2 39V39.5C2 40.328 2.672 41 3.5 41H10C10.3978 41 10.7794 40.842 11.0607 40.5607C11.342 40.2794 11.5 39.8978 11.5 39.5C11.5 39.1022 11.342 38.7206 11.0607 38.4393C10.7794 38.158 10.3978 38 10 38H6.62L7.56 37.06C7.912 36.708 8.226 36.412 8.52 36.13L8.85 35.818C9.23157 35.4644 9.58967 35.0863 9.922 34.686C10.638 33.792 11 32.836 11 31.5Z" fill="#272829" fill-opacity="0.8"/> </svg>',
        command: ({ editor, range }) => {
            editor.commands.enter()
            editor.commands.toggleOrderedList()
        },
    },
    {
        name: 'bulletedList',
        title: 'Bulleted List',
        desc: 'Create a simple bullet list',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none"> <path d="M18 38V34H42V38H18ZM18 26V22H42V26H18ZM18 14V10H42V14H18ZM10 40C8.9 40 7.958 39.608 7.174 38.824C6.39 38.04 5.99867 37.0987 6 36C6 34.9 6.392 33.958 7.176 33.174C7.96 32.39 8.90134 31.9987 10 32C11.1 32 12.042 32.392 12.826 33.176C13.61 33.96 14.0013 34.9013 14 36C14 37.1 13.608 38.042 12.824 38.826C12.04 39.61 11.0987 40.0013 10 40ZM10 28C8.9 28 7.958 27.608 7.174 26.824C6.39 26.04 5.99867 25.0987 6 24C6 22.9 6.392 21.958 7.176 21.174C7.96 20.39 8.90134 19.9987 10 20C11.1 20 12.042 20.392 12.826 21.176C13.61 21.96 14.0013 22.9013 14 24C14 25.1 13.608 26.042 12.824 26.826C12.04 27.61 11.0987 28.0013 10 28ZM10 16C8.9 16 7.958 15.608 7.174 14.824C6.39 14.04 5.99867 13.0987 6 12C6 10.9 6.392 9.958 7.176 9.174C7.96 8.39 8.90134 7.99867 10 8C11.1 8 12.042 8.392 12.826 9.176C13.61 9.96 14.0013 10.9013 14 12C14 13.1 13.608 14.042 12.824 14.826C12.04 15.61 11.0987 16.0013 10 16Z" fill="#272829" fill-opacity="0.8"/> </svg>',
        command: ({ editor, range }) => {
            editor.commands.enter()
            editor.commands.toggleBulletList()
        },
    },
    {
        name: '2 column',
        title: 'Column',
        desc: 'Create 2 column of blocks',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none"> <path d="M6 12C6 11.4696 6.21071 10.9609 6.58579 10.5858C6.96086 10.2107 7.46957 10 8 10H20C20.5304 10 21.0391 10.2107 21.4142 10.5858C21.7893 10.9609 22 11.4696 22 12C22 12.5304 21.7893 13.0391 21.4142 13.4142C21.0391 13.7893 20.5304 14 20 14H8C7.46957 14 6.96086 13.7893 6.58579 13.4142C6.21071 13.0391 6 12.5304 6 12ZM6 20C6 19.4696 6.21071 18.9609 6.58579 18.5858C6.96086 18.2107 7.46957 18 8 18H20C20.5304 18 21.0391 18.2107 21.4142 18.5858C21.7893 18.9609 22 19.4696 22 20C22 20.5304 21.7893 21.0391 21.4142 21.4142C21.0391 21.7893 20.5304 22 20 22H8C7.46957 22 6.96086 21.7893 6.58579 21.4142C6.21071 21.0391 6 20.5304 6 20ZM6 28C6 27.4696 6.21071 26.9609 6.58579 26.5858C6.96086 26.2107 7.46957 26 8 26H20C20.5304 26 21.0391 26.2107 21.4142 26.5858C21.7893 26.9609 22 27.4696 22 28C22 28.5304 21.7893 29.0391 21.4142 29.4142C21.0391 29.7893 20.5304 30 20 30H8C7.46957 30 6.96086 29.7893 6.58579 29.4142C6.21071 29.0391 6 28.5304 6 28ZM6 36C6 35.4696 6.21071 34.9609 6.58579 34.5858C6.96086 34.2107 7.46957 34 8 34H20C20.5304 34 21.0391 34.2107 21.4142 34.5858C21.7893 34.9609 22 35.4696 22 36C22 36.5304 21.7893 37.0391 21.4142 37.4142C21.0391 37.7893 20.5304 38 20 38H8C7.46957 38 6.96086 37.7893 6.58579 37.4142C6.21071 37.0391 6 36.5304 6 36ZM26 12C26 11.4696 26.2107 10.9609 26.5858 10.5858C26.9609 10.2107 27.4696 10 28 10H40C40.5304 10 41.0391 10.2107 41.4142 10.5858C41.7893 10.9609 42 11.4696 42 12C42 12.5304 41.7893 13.0391 41.4142 13.4142C41.0391 13.7893 40.5304 14 40 14H28C27.4696 14 26.9609 13.7893 26.5858 13.4142C26.2107 13.0391 26 12.5304 26 12ZM26 20C26 19.4696 26.2107 18.9609 26.5858 18.5858C26.9609 18.2107 27.4696 18 28 18H40C40.5304 18 41.0391 18.2107 41.4142 18.5858C41.7893 18.9609 42 19.4696 42 20C42 20.5304 41.7893 21.0391 41.4142 21.4142C41.0391 21.7893 40.5304 22 40 22H28C27.4696 22 26.9609 21.7893 26.5858 21.4142C26.2107 21.0391 26 20.5304 26 20ZM26 28C26 27.4696 26.2107 26.9609 26.5858 26.5858C26.9609 26.2107 27.4696 26 28 26H40C40.5304 26 41.0391 26.2107 41.4142 26.5858C41.7893 26.9609 42 27.4696 42 28C42 28.5304 41.7893 29.0391 41.4142 29.4142C41.0391 29.7893 40.5304 30 40 30H28C27.4696 30 26.9609 29.7893 26.5858 29.4142C26.2107 29.0391 26 28.5304 26 28ZM26 36C26 35.4696 26.2107 34.9609 26.5858 34.5858C26.9609 34.2107 27.4696 34 28 34H40C40.5304 34 41.0391 34.2107 41.4142 34.5858C41.7893 34.9609 42 35.4696 42 36C42 36.5304 41.7893 37.0391 41.4142 37.4142C41.0391 37.7893 40.5304 38 40 38H28C27.4696 38 26.9609 37.7893 26.5858 37.4142C26.2107 37.0391 26 36.5304 26 36Z" fill="#272829" fill-opacity="0.8"/> </svg>',
        command: ({ editor, range }) => {
            editor.commands.enter()
            editor.commands.setColumns(2)
        },
    },
    {
        name: 'codeBlock',
        title: 'Code Block',
        desc: 'Create a code snippet',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 38 38" fill="none"> <path d="M36.25 0.25H1.75C0.920312 0.25 0.25 0.920312 0.25 1.75V36.25C0.25 37.0797 0.920312 37.75 1.75 37.75H36.25C37.0797 37.75 37.75 37.0797 37.75 36.25V1.75C37.75 0.920312 37.0797 0.25 36.25 0.25ZM19.0516 19.2859L10.0516 26.8328C9.80781 27.0391 9.4375 26.8656 9.4375 26.5469V23.6078C9.4375 23.5 9.48906 23.3922 9.57344 23.3219L14.7203 19L9.57344 14.6781C9.53035 14.6441 9.49568 14.6006 9.47211 14.551C9.44853 14.5014 9.43669 14.4471 9.4375 14.3922V11.4531C9.4375 11.1344 9.80781 10.9609 10.0516 11.1672L19.0516 18.7094C19.2344 18.8594 19.2344 19.1359 19.0516 19.2859ZM28.5625 26.5469C28.5625 26.7531 28.4031 26.9219 28.2109 26.9219H19.5391C19.3469 26.9219 19.1875 26.7531 19.1875 26.5469V24.2969C19.1875 24.0906 19.3469 23.9219 19.5391 23.9219H28.2109C28.4031 23.9219 28.5625 24.0906 28.5625 24.2969V26.5469Z" fill="#272829" fill-opacity="0.8"/> </svg>',
        command: ({ editor, range }) => {
            editor.commands.enter()
            editor.commands.toggleCodeBlock()

        },
    },
    {
        name: 'blockquote',
        title: 'Blockquote',
        desc: 'Capture a quote',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 47 47" fill="none"> <path d="M35 36C35.7957 36 36.5587 35.6839 37.1213 35.1213C37.6839 34.5587 38 33.7956 38 33V25.674C38 24.8783 37.6839 24.1153 37.1213 23.5527C36.5587 22.9901 35.7957 22.674 35 22.674H30.836C30.836 21.621 30.899 20.565 31.022 19.512C31.208 18.396 31.52 17.403 31.952 16.536C32.387 15.666 32.945 14.985 33.629 14.487C34.31 13.929 35.177 13.65 36.233 13.65V9C34.496 9 32.978 9.372 31.673 10.116C30.3794 10.8525 29.2671 11.8694 28.418 13.092C27.5658 14.4399 26.9376 15.9171 26.558 17.466C26.1755 19.1753 25.9883 20.9225 26 22.674V33C26 33.7956 26.3161 34.5587 26.8787 35.1213C27.4413 35.6839 28.2044 36 29 36H35ZM17 36C17.7957 36 18.5587 35.6839 19.1213 35.1213C19.6839 34.5587 20 33.7956 20 33V25.674C20 24.8783 19.6839 24.1153 19.1213 23.5527C18.5587 22.9901 17.7957 22.674 17 22.674H12.836C12.836 21.621 12.899 20.565 13.022 19.512C13.208 18.396 13.52 17.403 13.952 16.536C14.387 15.666 14.945 14.985 15.629 14.487C16.31 13.929 17.177 13.65 18.233 13.65V9C16.496 9 14.978 9.372 13.673 10.116C12.3794 10.8525 11.2671 11.8694 10.418 13.092C9.56578 14.4399 8.93763 15.9171 8.558 17.466C8.17546 19.1753 7.98826 20.9225 8 22.674V33C8 33.7956 8.31607 34.5587 8.87868 35.1213C9.44129 35.6839 10.2044 36 11 36H17Z" fill="#272829" fill-opacity="0.8"/> </svg>',
        command: ({ editor, range }) => {
            editor.commands.enter()
            editor.commands.toggleBlockquote()
        },
    },
    {
        name: 'todoList',
        title: 'Todo List',
        desc: 'Track task with to-do list',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 40 40" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 33.75C7.16848 33.75 6.85054 33.6183 6.61612 33.3839C6.3817 33.1495 6.25 32.8315 6.25 32.5V7.5C6.25 7.16848 6.3817 6.85054 6.61612 6.61612C6.85054 6.3817 7.16848 6.25 7.5 6.25H30.625C31.1223 6.25 31.5992 6.05246 31.9508 5.70083C32.3025 5.34919 32.5 4.87228 32.5 4.375C32.5 3.87772 32.3025 3.40081 31.9508 3.04917C31.5992 2.69754 31.1223 2.5 30.625 2.5H7.5C6.17392 2.5 4.90215 3.02678 3.96447 3.96447C3.02678 4.90215 2.5 6.17392 2.5 7.5V32.5C2.5 33.8261 3.02678 35.0979 3.96447 36.0355C4.90215 36.9732 6.17392 37.5 7.5 37.5H32.5C33.8261 37.5 35.0979 36.9732 36.0355 36.0355C36.9732 35.0979 37.5 33.8261 37.5 32.5V24.375C37.5 23.8777 37.3025 23.4008 36.9508 23.0492C36.5992 22.6975 36.1223 22.5 35.625 22.5C35.1277 22.5 34.6508 22.6975 34.2992 23.0492C33.9475 23.4008 33.75 23.8777 33.75 24.375V32.5C33.75 32.8315 33.6183 33.1495 33.3839 33.3839C33.1495 33.6183 32.8315 33.75 32.5 33.75H7.5ZM39.45 11.7C39.7812 11.3446 39.9615 10.8744 39.9529 10.3887C39.9444 9.90294 39.7476 9.43948 39.4041 9.09595C39.0605 8.75241 38.5971 8.55563 38.1113 8.54706C37.6256 8.53849 37.1554 8.7188 36.8 9.05L22.905 22.9425L18.2225 18.1025C18.0517 17.924 17.8472 17.781 17.6209 17.6818C17.3946 17.5825 17.151 17.529 16.9039 17.5242C16.6569 17.5195 16.4113 17.5636 16.1814 17.6541C15.9515 17.7445 15.7417 17.8796 15.5641 18.0514C15.3865 18.2232 15.2447 18.4284 15.1467 18.6552C15.0487 18.8821 14.9965 19.126 14.9931 19.3731C14.9897 19.6201 15.0351 19.8654 15.1268 20.0949C15.2186 20.3243 15.3547 20.5334 15.5275 20.71L21.535 26.92C21.7079 27.0993 21.9147 27.2423 22.1434 27.3408C22.3722 27.4392 22.6182 27.4912 22.8673 27.4935C23.1163 27.4958 23.3633 27.4485 23.5938 27.3543C23.8244 27.2602 24.0338 27.121 24.21 26.945L39.45 11.7Z" fill="#272829" fill-opacity="0.8"/> </svg>',
        command: ({ editor, range }) => {
            editor.commands.enter()
            editor.commands.toggleTaskList()
        },
    },
    {
        name: 'separator',
        title: 'Separator',
        desc: 'Divide a block',
        icon: '<svg class="w-5 h-5 md:w-6 md:h-6" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M20.2 7v4H3.8V7H2.2v9h1.6v-3.5h16.4V16h1.6V7z"></path></svg>',
        command: ({ editor, range }) => {
            editor.commands.enter()
            editor.commands.setHorizontalRule()
        },
    },
    {
        name: 'image',
        title: 'Image',
        desc: 'Upload or embed image',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36" fill="none"> <path d="M22.5 17C23.39 17 24.26 16.7361 25.0001 16.2416C25.7401 15.7471 26.3169 15.0443 26.6575 14.2221C26.9981 13.3998 27.0872 12.495 26.9135 11.6221C26.7399 10.7492 26.3113 9.94736 25.682 9.31802C25.0526 8.68869 24.2508 8.2601 23.3779 8.08647C22.505 7.91283 21.6002 8.00195 20.7779 8.34254C19.9557 8.68314 19.2529 9.25992 18.7584 9.99994C18.2639 10.74 18 11.61 18 12.5C18 13.6935 18.4741 14.8381 19.318 15.682C20.1619 16.5259 21.3065 17 22.5 17ZM22.5 11C22.7967 11 23.0867 11.088 23.3334 11.2528C23.58 11.4176 23.7723 11.6519 23.8858 11.926C23.9994 12.2001 24.0291 12.5017 23.9712 12.7926C23.9133 13.0836 23.7704 13.3509 23.5607 13.5607C23.3509 13.7704 23.0836 13.9133 22.7926 13.9712C22.5017 14.0291 22.2001 13.9994 21.926 13.8858C21.6519 13.7723 21.4176 13.58 21.2528 13.3334C21.088 13.0867 21 12.7967 21 12.5C21 12.1022 21.158 11.7206 21.4393 11.4393C21.7206 11.158 22.1022 11 22.5 11Z" fill="#272829" fill-opacity="0.8"/> <path d="M33 0H3C2.20435 0 1.44129 0.31607 0.87868 0.87868C0.31607 1.44129 0 2.20435 0 3V33C0 33.7956 0.31607 34.5587 0.87868 35.1213C1.44129 35.6839 2.20435 36 3 36H33C33.7956 36 34.5587 35.6839 35.1213 35.1213C35.6839 34.5587 36 33.7956 36 33V3C36 2.20435 35.6839 1.44129 35.1213 0.87868C34.5587 0.31607 33.7956 0 33 0ZM33 33H3V24L10.5 16.5L18.885 24.885C19.4471 25.4438 20.2074 25.7574 21 25.7574C21.7926 25.7574 22.5529 25.4438 23.115 24.885L25.5 22.5L33 30V33ZM33 25.755L27.615 20.37C27.0529 19.8112 26.2926 19.4976 25.5 19.4976C24.7074 19.4976 23.9471 19.8112 23.385 20.37L21 22.755L12.615 14.37C12.0529 13.8112 11.2926 13.4976 10.5 13.4976C9.70744 13.4976 8.94709 13.8112 8.385 14.37L3 19.755V3H33V25.755Z" fill="#272829" fill-opacity="0.8"/> </svg>',
        command: ({ editor, range }) => {
            PopupImage(editor)
        },
    },
]

export default blockTools
