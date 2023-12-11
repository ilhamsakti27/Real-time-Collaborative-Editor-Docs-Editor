<template>
  <div class="">
    <form @submit.prevent="setLink">
      <div
        v-show="!toggleShowLinkEdit"
        style="display: flex; flex-direction: column; row-gap: 0.5rem;"
        class="popUpLink"
      >
        <input
          v-model="urlInput"
          style="width: 100%; font-size: 0.875rem; line-height: 1.25rem;"
          placeholder="Paste link"
          type="url"
          @input="clearError"
        >
        <button
          type="submit"
          class="button-submit-link"
        >
          Submit
        </button>
      </div>
    </form>
    <div
      v-show="toggleShowLinkEdit"
      class="popUpLink"
    >
      <form @submit.prevent>
        <div class="popuplink-edit-link">
          <div>
            <label
              for="pageOrURL"
            >
              Page or URL
            </label>
            <input
              id="pageOrURL"
              v-model="urlInput"
              placeholder="Edit link or search pages"
              type="url"
            >
          </div>
        </div>
        <hr class="custom-hr">
        <button
          class="button-submit-link"
          @click="setLink"
        >
          Submits
        </button>
        <button
          class="button-remove-link"
          @click="removeLink"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="removeIcon" />
          <div>
            Remove link
          </div>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-types */
export default {
  props: {
    editor: {
      required: true,
    },
  },
  data() {
    return {
      previousUrl: this.editor.getAttributes('link').href,
      url: '',
      toggleShowLinkInput: false,
      toggleShowLinkEdit: false,
      urlInput: '',
      urlError: '',
      removeIcon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24 " stroke-width="1.5" stroke="white" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>',
      selectedText: '',
    }
  },
  mounted() {
    if (this.previousUrl) {
      this.urlInput = this.previousUrl
      this.toggleShowLinkEdit = true
    } else {
      this.toggleShowLinkEdit = false
    }
  },
  methods: {
    setLink() {
      if (this.urlInput === null || this.urlInput === '') {
        return
      }

      const pattern = /^(http:\/\/|https:\/\/)/
      const url = pattern.test(this.urlInput)

      if (!url) {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: `http://${this.urlInput}` })
          .run()
        this.toggleShowLinkEdit = true
        this.url = this.urlInput
      } else {
        // update link
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: this.urlInput })
          .run()
        this.toggleShowLinkEdit = true
        this.url = this.urlInput
      }

      this.toggleShowLinkInput = false
      document.addEventListener('click', this.clickOutsideHandler)
    },
    removeLink() {
      this.editor
        .chain()
        .focus()
        .unsetLink()
        .run()

      this.toggleShowLinkEdit = false

      document.addEventListener('click', this.clickOutsideHandler)
    },
    clearError() {
      this.urlError = '' // Clear the error message when input changes
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
  /* position: absolute; */
  background-color: rgb(253, 253, 253);
  /* left: -40px; */
  z-index: 1;
  border-radius: 0 0 4px 4px;
  padding: 2vh 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 8px 16px 2px rgba(0, 0, 0, 0.1);
  width: 222px;
  padding: 12px;
  margin-top: 4px;
}
.popUpLink input {
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 4px 10px;

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
  width: 100%;
  height: 28px;
}
.popUpLink button span {
  font-size: 14px;
}
.popUpLink button div {
  display: inline;
  color: white;
  font-size: 14px;
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
.button-submit-link {
  background-color: rgb(2 132 199);
  color: rgb(255 255 255);
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
}
.button-submit-link:hover {
  background-color: rgb(3 105 161);
}
.popuplink-edit-link {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
}
.popuplink-edit-link div {
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
}
.popuplink-edit-link label {
  color: rgba(55, 53, 47, 0.65);
  font-size: 0.75rem; /* 12px */
  line-height: 1rem; /* 16px */
  font-weight: 600;
}
#pageOrURL,
#linkTitle {
  width: 100%;
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
}
.button-remove-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  column-gap: 0.5rem; /* 8px */
  background-color: rgb(220 38 38);
}
.button-remove-link:hover {
  background-color: rgb(185 28 28);
}
</style>
