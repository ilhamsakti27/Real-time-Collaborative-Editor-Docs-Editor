<!-- eslint-disable -->
<template>
  <div class="">
    <!-- upload file pop up -->
    <div class="popupImage border w-96 rounded shadow-lg bg-white" v-show="isUpload">
      <div class="p-1">
        <button class="inline-block text-left hover:bg-gray-100 p-2 ml-1 hover:rounded-md active">Upload</button>
        <button id="embedLinkBtn" class="inline-block text-left hover:bg-gray-100 p-2 hover:rounded-md"
          @click="uploadOrEmbedLinkBtn">Embed link</button>
      </div>
      <div class="border-t-2 border-slate-300 p-3">
        <!-- <form action="/upload"> -->
        <input type="file" name="file" id="file-input"
          class="w-full border-solid border border-gray-300 rounded bg-gray-50 px-2 py-1 text-sm outline-none focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-blue-300"
          placeholder="Paste the image link...">
        <button
          class="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white border-solid border bg-indigo-500 rounded px-20 py-1 mt-4 text-sm flex mx-auto text"
          @click="setLinkImage">Upload Image</button>
        <div class="text-center">
          <span class="text-xs mx-auto text-gray-400">The maximum size per file is 5 MB.</span>
        </div>
        <!-- </form> -->
      </div>
    </div>

    <!-- embed link pop up -->
    <div class="popupImage border w-96 rounded shadow-lg bg-white" v-show="isEmbedLink">
      <div class="p-1">
        <button id="uploadImgBtn" class="inline-block text-left hover:bg-gray-100 p-2 ml-1 rounded-md"
          @click="uploadOrEmbedLinkBtn">Upload</button>
        <button class="inline-block text-left hover:bg-gray-100 p-2 hover:rounded-md active">Embed link</button>
      </div>
      <div class="border-t-2 border-slate-300 p-3">
        <!-- <form action=""> -->
        <input type="url" v-model="url"
          class="w-full border-solid border border-gray-300 rounded bg-gray-50 px-2 py-1 text-sm outline-none focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-blue-300"
          placeholder="Paste the image link...">
        <br>
        <button
          class="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white border-solid border bg-indigo-500 rounded px-20 py-1 mt-4 text-sm flex mx-auto text"
          @click="setLinkImage">Embed Image</button>
        <div class="text-center">
          <span class="text-xs mx-auto text-gray-400">Works with any image from the web</span>
        </div>
        <!-- </form> -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'ImageView', // Change the component name
  props: {
    editor: {
      required: true
    },
  },
  data() {
    return {
      isUpload: true,
      isEmbedLink: false,
      url: '',

    }
  },
  methods: {
    uploadOrEmbedLinkBtn() {
      this.isEmbedLink = !this.isEmbedLink
      this.isUpload = !this.isUpload
    },
    setLinkImage() {
      if (this.url) {
        this.editor.chain().focus().setImage({ src: this.url }).run()
        // console.log(`URL: ${this.url}`)
      }
    },
  },
}
</script>

<style>
.popupImage {
  display: absolute;
  z-index: 10;
  margin: 0 auto;
}

.active {
  border-bottom: 3px solid black;
}
</style>
