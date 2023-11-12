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
        <input ref='inputImg' type="file" name="file" id="file-input"
          class="w-full border-solid border border-gray-300 rounded bg-gray-50 px-2 py-1 text-sm outline-none focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-blue-300"
          placeholder="Paste the image link...">
        <!-- Display loading indicator if isUploading is true -->
        <div v-if="isUploading" class="mt-2 text-gray-500 text-sm">Uploading... ({{ uploadLoaded }} / {{ uploadTotal }})
          {{
            uploadProgress
          }}%</div>
        <div class="progress-bar" v-if="isUploading">
          <div class="progress" :style="{ width: `${uploadProgress}%` }"></div>
        </div>
        <button
          class="bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white border-solid border bg-indigo-500 rounded px-20 py-1 mt-4 text-sm flex mx-auto text"
          @click="uploadImageHandler">Upload Image</button>
        <div class="text-center">
          <span class="text-xs mx-auto text-gray-400">The maximum size per file is 5 MB.</span>
        </div>
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
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { uploadMedia } from '@/components/editor/utils/upload'

// const host = 'http://localhost:1234'
const host = 'https://editorhocus.oriens.my.id'

export default {
  name: 'ImageView',
  props: {
    editor: {
      required: true
    },
    range: {
      required: true
    },
  },
  data() {
    return {
      isUpload: true,
      isEmbedLink: false,
      url: '',
      documentId: null,
      uploadLoaded: 0,
      uploadTotal: 0,
      uploadProgress: 0,
      isUploading: false, // Add this state for tracking the upload status
    };
  },
  created() {
    const path = window.location.href
    this.documentId = path.split('/')[4]
  },
  methods: {
    uploadOrEmbedLinkBtn() {
      this.isEmbedLink = !this.isEmbedLink
      this.isUpload = !this.isUpload
    },
    setLinkImage() {
      if (this.url) {
        this.editor.chain().focus().deleteRange(this.range).setImage({ src: this.url }).run()
      }
    },
    uploadImageHandler() {
      const path = this.$refs.inputImg;
      const file = path.files[0];

      // Set isUploading to true when starting the upload
      this.isUploading = true;

      uploadMedia(file, this.documentId, (progressEvent) => {
        console.log(progressEvent)
        this.uploadLoaded = progressEvent.loaded
        this.uploadTotal = progressEvent.total
        this.uploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))

      }).then(response => {
        const imgUri = response.data.data.destination.slice('assets/'.length);
        const fileName = response.data.data.originalname;
        const url = `${host}/${imgUri}/${fileName}`;
        this.editor.chain().focus().deleteRange(this.range).setImage({ src: url }).run();

        this.isUploading = false;
      }).catch(error => {
        console.error('Error uploading image:', error);
        this.isUploading = false;
      });
    }
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

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #ddd;
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}
</style>
