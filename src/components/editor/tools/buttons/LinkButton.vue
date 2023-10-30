<!-- eslint-disable -->
<template>
  <div>
    <button :class="{ 'is-active': editor.isActive('link') }" @click="linkBtn">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" fill="none">
        <path
          d="M25.5694 35.1619C25.7791 35.3709 25.9456 35.6193 26.0591 35.8928C26.1727 36.1663 26.2311 36.4595 26.2311 36.7556C26.2311 37.0518 26.1727 37.345 26.0591 37.6185C25.9456 37.892 25.7791 38.1404 25.5694 38.3494L24.4556 39.4631C22.3451 41.5736 19.4828 42.7592 16.4981 42.7592C13.5135 42.7592 10.6511 41.5736 8.54061 39.4631C6.43015 37.3527 5.24451 34.4903 5.24451 31.5056C5.24451 28.521 6.43015 25.6586 8.54061 23.5481L13.0631 19.0275C15.0909 16.9947 17.8192 15.8142 20.6892 15.7277C23.5591 15.6413 26.3535 16.6555 28.5 18.5625C28.7216 18.7595 28.9022 18.9982 29.0316 19.265C29.1609 19.5318 29.2365 19.8215 29.2539 20.1174C29.2713 20.4134 29.2302 20.7099 29.1331 20.9901C29.0359 21.2702 28.8845 21.5284 28.6875 21.75C28.4905 21.9716 28.2518 22.1523 27.985 22.2816C27.7182 22.411 27.4286 22.4865 27.1326 22.5039C26.8366 22.5213 26.5401 22.4803 26.2599 22.3831C25.9798 22.2859 25.7216 22.1345 25.5 21.9375C24.2128 20.7944 22.5376 20.1862 20.8168 20.2375C19.0961 20.2887 17.46 20.9955 16.2431 22.2131L11.7244 26.7281C10.4583 27.9942 9.74701 29.7114 9.74701 31.5019C9.74701 33.2924 10.4583 35.0096 11.7244 36.2756C12.9904 37.5417 14.7076 38.253 16.4981 38.253C18.2886 38.253 20.0058 37.5417 21.2719 36.2756L22.3856 35.1619C22.5946 34.9527 22.8427 34.7867 23.1159 34.6735C23.389 34.5603 23.6818 34.502 23.9775 34.502C24.2732 34.502 24.566 34.5603 24.8391 34.6735C25.1122 34.7867 25.3604 34.9527 25.5694 35.1619ZM39.4594 8.5369C37.3472 6.42968 34.4854 5.24628 31.5019 5.24628C28.5183 5.24628 25.6565 6.42968 23.5444 8.5369L22.4306 9.65065C22.0079 10.0733 21.7705 10.6466 21.7705 11.2444C21.7705 11.8422 22.0079 12.4155 22.4306 12.8381C22.8533 13.2608 23.4266 13.4983 24.0244 13.4983C24.6221 13.4983 25.1954 13.2608 25.6181 12.8381L26.7319 11.7244C27.9979 10.4583 29.7151 9.74704 31.5056 9.74704C33.2961 9.74704 35.0133 10.4583 36.2794 11.7244C37.5454 12.9905 38.2567 14.7076 38.2567 16.4981C38.2567 18.2886 37.5454 20.0058 36.2794 21.2719L31.7587 25.7944C30.5408 27.0116 28.9038 27.7173 27.1826 27.7671C25.4614 27.817 23.7863 27.2072 22.5 26.0625C22.2784 25.8655 22.0201 25.7141 21.74 25.6169C21.4599 25.5198 21.1634 25.4787 20.8674 25.4961C20.5714 25.5135 20.2818 25.5891 20.015 25.7184C19.7482 25.8478 19.5095 26.0284 19.3125 26.25C19.1155 26.4716 18.9641 26.7299 18.8669 27.01C18.7697 27.2901 18.7287 27.5866 18.7461 27.8826C18.7635 28.1786 18.839 28.4682 18.9684 28.735C19.0977 29.0018 19.2784 29.2405 19.5 29.4375C21.645 31.3441 24.4375 32.359 27.3061 32.2743C30.1747 32.1896 32.9025 31.0118 34.9312 28.9819L39.4537 24.4613C41.5634 22.3496 42.7489 19.4871 42.75 16.5021C42.751 13.5172 41.5675 10.6538 39.4594 8.54065V8.5369Z"
          fill="#272829" fill-opacity="0.85" />
      </svg>
    </button>

    <!-- pop up link -->
    <template>
      <div class="popUpLink" v-show="toggleShowLinkInput">
        <input placeholder="Paste link" type="url" v-model="urlInput" @input="clearError">
        <button @click="setLink" style="border: 1px solid rgba(156, 156, 156, 0.201);">Submit</button>
      </div>
      <div class="popUpLink" v-show="toggleShowLinkEdit">
        <label for="pageOrURL">Page or URL</label>
        <input placeholder="Edit link or search pages" type="url" id="pageOrURL" v-model="url">
        <!-- <label for="linkTitle">Link title</label>
        <input placeholder="title" type="text" id="linkTitle" v-model="urlTitle"> -->
        <hr class="custom-hr">
        <button @click="removeLink" style="border: 1px solid rgba(156, 156, 156, 0.201);">
          <span v-html="removeIcon"></span>
          Remove link
        </button>
      </div>
    </template>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ['editor'],
  data() {
    return {
      toggleShowLinkInput: false,
      toggleShowLinkEdit: false,
      urlInput: '', // Data property to store the input URL
      urlError: '', // Data property to display an error message
      removeIcon: '<svg class="inline" id="Layer_1" style="enable-background:new 0 0 64 64;" width="24" height="24" version="1.1" viewBox="0 0 64 64" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><style type="text/css"> .st0{fill:#134563;}</style><g><g id="Icon-Trash" transform="translate(232.000000, 228.000000)"><polygon class="st0" id="Fill-6" points="-207.5,-205.1 -204.5,-205.1 -204.5,-181.1 -207.5,-181.1    "/><polygon class="st0" id="Fill-7" points="-201.5,-205.1 -198.5,-205.1 -198.5,-181.1 -201.5,-181.1    "/><polygon class="st0" id="Fill-8" points="-195.5,-205.1 -192.5,-205.1 -192.5,-181.1 -195.5,-181.1    "/><polygon class="st0" id="Fill-9" points="-219.5,-214.1 -180.5,-214.1 -180.5,-211.1 -219.5,-211.1    "/><path class="st0" d="M-192.6-212.6h-2.8v-3c0-0.9-0.7-1.6-1.6-1.6h-6c-0.9,0-1.6,0.7-1.6,1.6v3h-2.8v-3     c0-2.4,2-4.4,4.4-4.4h6c2.4,0,4.4,2,4.4,4.4V-212.6" id="Fill-10"/><path class="st0" d="M-191-172.1h-18c-2.4,0-4.5-2-4.7-4.4l-2.8-36l3-0.2l2.8,36c0.1,0.9,0.9,1.6,1.7,1.6h18     c0.9,0,1.7-0.8,1.7-1.6l2.8-36l3,0.2l-2.8,36C-186.5-174-188.6-172.1-191-172.1" id="Fill-11"/></g></g></svg>',
      url: '',
      urlTitle: 'Halo',
    }
  },
  methods: {
    linkBtn() {
      const previousUrl = this.editor.getAttributes('link').href;
      // console.log('previous url: ' + previousUrl);

      // jika sudah embed link
      if (previousUrl) {
        this.toggleShowLinkInput = false
        this.toggleShowLinkEdit = !this.toggleShowLinkEdit;
        document.addEventListener("click", this.clickOutsideHandler);

        this.url = previousUrl;

        return
      }
      // jika belum embed link
      if (typeof previousUrl === 'undefined') {
        this.toggleShowLinkEdit = false
        this.toggleShowLinkInput = !this.toggleShowLinkInput;
        document.addEventListener("click", this.clickOutsideHandler);
        return
      }

    },
    setLink() {
      // cancelled
      if (this.urlInput === null) {
        return
      }

      // empty
      if (this.urlInput === '') {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()

        return
      }

      const pattern = /^(http:\/\/|https:\/\/)/;
      const url = pattern.test(this.urlInput);

      if (!url) {
        // update link if the link doesn't contain http or https
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: `http://${this.urlInput}` })
          .run()

        // clear input
        this.urlInput = ''
      }
      else {
        // update link
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: this.urlInput })
          .run()

        // clear input
        this.urlInput = ''
      }

      // console.log('Input adalah: ' + this.urlInput);  
      this.toggleShowLinkInput = !this.toggleShowLinkInput
      document.addEventListener("click", this.clickOutsideHandler);
    },
    removeLink() {
      this.editor
        .chain()
        .focus()
        .unsetLink()
        .run()

      this.toggleShowLinkEdit = !this.toggleShowLinkEdit;

      document.addEventListener("click", this.clickOutsideHandler);
    },
    clearError() {
      this.urlError = ''; // Clear the error message when input changes
    },
    closePopup() {
      this.toggleShowLinkInput = false;
    },
    clickOutsideHandler(event) {
      if (!this.$el.contains(event.target)) {
        this.closePopup();
      }
    },
  },
}
</script>

<style>
.tiptap a {
  color: #24b8f7;
  text-decoration: underline;
}

.popUpLink {
  position: absolute;
  background-color: rgb(253, 253, 253);
  left: 0;
  top: 10;
  z-index: 1;
  border-radius: 0 0 4px 4px;
  padding: 2vh 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 8px 16px 2px rgba(0, 0, 0, 0.1);
  width: 222px;
  padding: 12px;
}

.popUpLink input {
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 2px 8px;

  &:focus {
    outline: 2px solid rgba(35, 131, 226, 0.5);
  }
}

.popUpLink button {
  margin-top: 8px;
  padding: 2px 8px;
  border-radius: 0.25rem;
  cursor: pointer;
  border-color: #6c757d;
  /* Button border color */
  color: #6c757d;
  /* Button text color */
  width: 100%;
}

.popUpLink button:hover {
  border-color: #545b62;
  /* Hovered button border color */
  color: white;
  /* Hovered button text color */
  background-color: #92969a7b;
}

.custom-hr {
  border: none;
  height: 1px;
  /* Set the height of the custom rule line */
  background-color: #7979794f;
  /* Set the background color of the line */
  margin-top: 8px;
  /* Add margin for spacing */
}
</style>