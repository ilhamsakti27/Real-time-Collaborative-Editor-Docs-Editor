export default function () {
  return [
    {
      title: 'Bold',
      icon: '<svg class="w-5 h-5 md:w-6 md:h-6" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><path d="M14.7 11.3c1-.6 1.5-1.6 1.5-3 0-2.3-1.3-3.4-4-3.4H7v14h5.8c1.4 0 2.5-.3 3.3-1 .8-.7 1.2-1.7 1.2-2.9.1-1.9-.8-3.1-2.6-3.7zm-5.1-4h2.3c.6 0 1.1.1 1.4.4.3.3.5.7.5 1.2s-.2 1-.5 1.2c-.3.3-.8.4-1.4.4H9.6V7.3zm4.6 9c-.4.3-1 .4-1.7.4H9.6v-3.9h2.9c.7 0 1.3.2 1.7.5.4.3.6.8.6 1.5s-.2 1.2-.6 1.5z"></path></svg>',
      command: editor => {
        editor.chain().focus().toggleBold().run()
      },
      isActiveTest: editor => editor.isActive('bold'),
    },
    {
      title: 'Italic',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M10.0834 4.58333H15.5834M6.41669 17.4167H11.9167M12.8334 4.58333L9.16669 17.4167" stroke="#272829" stroke-opacity="0.85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      command: editor => {
        editor.chain().focus().toggleItalic().run()
      },
      isActiveTest: editor => editor.isActive('italic'),
    },
    {
      title: 'Underline',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none"><g clip-path="url(#clip0_69_398)"><path d="M24 37.56C30.7733 37.56 35.3067 33.4533 35.3067 25.56V11.3867C35.3067 10.98 35.1451 10.59 34.8576 10.3024C34.57 10.0149 34.18 9.85333 33.7733 9.85333C33.3667 9.85333 32.9767 10.0149 32.6891 10.3024C32.4015 10.59 32.24 10.98 32.24 11.3867V25.7867C32.24 31.7067 29.0667 34.7333 24.0667 34.7333C19.0667 34.7333 15.7867 31.44 15.7867 25.6V11.3867C15.7867 10.98 15.6251 10.59 15.3376 10.3024C15.05 10.0149 14.66 9.85333 14.2533 9.85333C13.8467 9.85333 13.4567 10.0149 13.1691 10.3024C12.8815 10.59 12.72 10.98 12.72 11.3867V25.7867C12.7067 33.4533 17.3333 37.56 24 37.56Z" fill="#272829" fill-opacity="0.85"/><path d="M41.3334 40H6.66671C6.30014 40.0349 5.95975 40.2052 5.71202 40.4777C5.4643 40.7501 5.32703 41.1051 5.32703 41.4733C5.32703 41.8416 5.4643 42.1966 5.71202 42.469C5.95975 42.7414 6.30014 42.9118 6.66671 42.9467H41.3334C41.6999 42.9118 42.0403 42.7414 42.2881 42.469C42.5358 42.1966 42.6731 41.8416 42.6731 41.4733C42.6731 41.1051 42.5358 40.7501 42.2881 40.4777C42.0403 40.2052 41.6999 40.0349 41.3334 40Z" fill="#272829" fill-opacity="0.85"/></g><defs><clipPath id="clip0_69_398"><rect width="48" height="48" fill="white"/></clipPath></defs></svg>',
      command: editor => {
        editor.chain().focus().toggleUnderline().run()
      },
      isActiveTest: editor => editor.isActive('underline'),
    },
    // {
    //   title: 'Link',
    //   icon: '<svg class="w-5 h-5 md:w-6 md:h-6" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"></path></svg>',
    //   command: editor => {
    //     const previousUrl = editor.getAttributes('link').href
    //     const url = window.prompt('URL', previousUrl)

    //     // cancelled
    //     if (url === null) {
    //       return
    //     }

    //     // empty
    //     if (url === '') {
    //       editor.chain().focus().extendMarkRange('link').unsetLink()
    //         .run()

    //       return
    //     }

    //     // update link
    //     editor
    //       .chain()
    //       .focus()
    //       .extendMarkRange('link')
    //       .setLink({ href: url })
    //       .run()
    //   },
    //   isActiveTest: editor => editor.isActive('link'),
    //   isActiveClass: 'hidden',
    // },
    // {
    //   title: 'Unlink',
    //   icon: '<svg class="w-5 h-5 md:w-6 md:h-6" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M15.6 7.3h-.7l1.6-3.5-.9-.4-3.9 8.5H9v1.5h2l-1.3 2.8H8.4c-2 0-3.7-1.7-3.7-3.7s1.7-3.7 3.7-3.7H10V7.3H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H9l-1.4 3.2.9.4 5.7-12.5h1.4c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.9 0 5.2-2.3 5.2-5.2 0-2.9-2.4-5.2-5.2-5.2z"></path></svg>',
    //   command: editor => editor.chain().focus().unsetLink().run(),
    //   isActiveTest: editor => !editor.isActive('link'),
    //   isActiveClass: 'hidden',
    // },
    {
      title: 'More inline tool',
      icon: '<svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" fill="currentColor" focusable="false"><path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"></path></svg>',
      isActiveTest: () => false,
      command: () => null,
      tools: [
        {
          title: 'Strikethrough',
          icon: '<svg class="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M9.1 9v-.5c0-.6.2-1.1.7-1.4.5-.3 1.2-.5 2-.5.7 0 1.4.1 2.1.3.7.2 1.4.5 2.1.9l.2-1.9c-.6-.3-1.2-.5-1.9-.7-.8-.1-1.6-.2-2.4-.2-1.5 0-2.7.3-3.6 1-.8.7-1.2 1.5-1.2 2.6V9h2zM20 12H4v1h8.3c.3.1.6.2.8.3.5.2.9.5 1.1.8.3.3.4.7.4 1.2 0 .7-.2 1.1-.8 1.5-.5.3-1.2.5-2.1.5-.8 0-1.6-.1-2.4-.3-.8-.2-1.5-.5-2.2-.8L7 18.1c.5.2 1.2.4 2 .6.8.2 1.6.3 2.4.3 1.7 0 3-.3 3.9-1 .9-.7 1.3-1.6 1.3-2.8 0-.9-.2-1.7-.7-2.2H20v-1z"></path></svg>',
          command: editor => editor.commands.toggleStrike(),
          isActiveTest: editor => editor.isActive('strike'),
        },
        {
          title: 'Inline code',
          icon: '<svg class="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" focusable="false"><path d="M20.8 10.7l-4.3-4.3-1.1 1.1 4.3 4.3c.1.1.1.3 0 .4l-4.3 4.3 1.1 1.1 4.3-4.3c.7-.8.7-1.9 0-2.6zM4.2 11.8l4.3-4.3-1-1-4.3 4.3c-.7.7-.7 1.8 0 2.5l4.3 4.3 1.1-1.1-4.3-4.3c-.2-.1-.2-.3-.1-.4z"></path></svg>',
          command: editor => editor.commands.toggleCode(),
          isActiveTest: editor => editor.isActive('code'),
        },
        // {
        //   title: 'Highlight',
        //   icon: '<svg class="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
        //   command: editor => editor.commands.toggleHighlight(),
        //   isActiveTest: editor => editor.isActive('highlight'),
        // },
        {
          title: 'Subscript',
          icon: '<svg class="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M16.9 18.3l.8-1.2c.4-.6.7-1.2.9-1.6.2-.4.3-.8.3-1.2 0-.3-.1-.7-.2-1-.1-.3-.4-.5-.6-.7-.3-.2-.6-.3-1-.3s-.8.1-1.1.2c-.3.1-.7.3-1 .6l.2 1.3c.3-.3.5-.5.8-.6s.6-.2.9-.2c.3 0 .5.1.7.2.2.2.2.4.2.7 0 .3-.1.5-.2.8-.1.3-.4.7-.8 1.3L15 19.4h4.3v-1.2h-2.4zM14.1 7.2h-2L9.5 11 6.9 7.2h-2l3.6 5.3L4.7 18h2l2.7-4 2.7 4h2l-3.8-5.5 3.8-5.3z"></path></svg>',
          command: editor => editor.commands.toggleSubscript(),
          isActiveTest: editor => editor.isActive('subscript'),
        },
        {
          title: 'Superscript',
          icon: '<svg class="w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M16.9 10.3l.8-1.3c.4-.6.7-1.2.9-1.6.2-.4.3-.8.3-1.2 0-.3-.1-.7-.2-1-.2-.2-.4-.4-.7-.6-.3-.2-.6-.3-1-.3s-.8.1-1.1.2c-.3.1-.7.3-1 .6l.1 1.3c.3-.3.5-.5.8-.6s.6-.2.9-.2c.3 0 .5.1.7.2.2.2.2.4.2.7 0 .3-.1.5-.2.8-.1.3-.4.7-.8 1.3l-1.8 2.8h4.3v-1.2h-2.2zm-2.8-3.1h-2L9.5 11 6.9 7.2h-2l3.6 5.3L4.7 18h2l2.7-4 2.7 4h2l-3.8-5.5 3.8-5.3z"></path></svg>',
          command: editor => editor.commands.toggleSuperscript(),
          isActiveTest: editor => editor.isActive('superscript'),
        },
      ],
    },
  ]
}
