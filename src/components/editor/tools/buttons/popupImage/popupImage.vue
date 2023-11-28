<template>
  <div class="">
    <!-- upload file pop up -->
    <div
      v-show="isUpload"
      style=""
      class="popupImage shadow-lg"
    >
      <div class="p-1">
        <button
          style=""
          class="active"
        >
          Upload
        </button>
        <button
          id="embedLinkBtn"
          @click="uploadOrEmbedLinkBtn"
        >
          Embed link
        </button>
      </div>
      <div
        style="border-top: 1px solid rgba(0,0,0,0.1);padding: 12px;"
      >
        <div class="">
          <input
            id="file-input"
            ref="inputImg"
            type="file"
            name="file"
            style="width: 100%;border-style: solid;border: 1px solid rgba(0,0,0,0.1);border-radius: 4px;background-color: rgba(249, 250, 251,1);padding: 8px 4px;"
            class="text-sm outline-none"
            placeholder="Upload or Drag file"
          >
        </div>
        <!-- Display loading indicator if isUploading is true -->
        <div
          v-if="isUploading"
          style="margin-top: 8px;color: rgba(107, 114, 128, 1);"
          class="text-sm"
        >
          Uploading... ({{ uploadLoaded }} / {{ uploadTotal }})
          {{
            uploadProgress
          }}%
        </div>
        <div
          v-if="isUploading"
          class="progress-bar"
        >
          <div
            class="progress"
            :style="{ width: `${uploadProgress}%` }"
          />
        </div>
        <button
          class="uploadBtn"
          @click="uploadImageHandler"
        >
          Upload Image
        </button>
        <div style="text-align: center;">
          <span
            style="color: rgba(0,0,0,0.4);margin: 0 auto;"
            class="text-xs"
          >The maximum size per file is 5 MB.</span>
        </div>
      </div>
    </div>

    <!-- embed link pop up -->
    <div
      v-show="isEmbedLink"
      class="popupImage shadow-lg"
    >
      <div class="p-1">
        <button
          id="uploadImgBtn"
          style="display: inline-block;text-align: left;padding: 8px;margin-left: 4px;"
          @click="uploadOrEmbedLinkBtn"
        >
          Upload
        </button>
        <button class="active">
          Embed link
        </button>
      </div>
      <div
        style="border-top: 1px solid rgba(0,0,0,0.1);padding: 12px;"
      >
        <input
          v-model="url"
          type="url"
          style="width: 100%;border-style: solid;border: 1px solid rgba(0,0,0,0.1);border-radius: 4px;background-color: rgba(249, 250, 251,1);padding: 8px 4px;margin: 4px auto;"
          class="text-sm outline-none "
          placeholder="Paste the image link..."
        >
        <br>
        <button
          class="uploadBtn"
          @click="setLinkImage"
        >
          Embed Image
        </button>
        <div style="text-align: center">
          <span
            style="color: rgba(0,0,0,0.4);margin: 0 auto;"
            class="text-xs "
          >Works with any image from the web</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadMedia } from '@/components/editor/utils/upload'

const host = 'https://editorhocus.oriens.my.id'

export default {
  name: 'ImageView',
  props: {
    editor: {
      required: true,
    },
    range: {
      required: false,
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
    }
  },
  created() {
    const [, , , documentId] = window.location.href.split('/')
    this.documentId = documentId
  },
  methods: {
    uploadOrEmbedLinkBtn() {
      this.isEmbedLink = !this.isEmbedLink
      this.isUpload = !this.isUpload
    },
    setLinkImage() {
      if (this.url) {
        if (this.range) { this.editor.chain().focus().deleteRange(this.range) }
        this.editor.chain().focus().setImage({ src: this.url }).run()
      }
    },
    uploadImageHandler() {
      const path = this.$refs.inputImg
      const file = path.files[0]

      // Set isUploading to true when starting the upload
      this.isUploading = true

      uploadMedia(file, this.documentId, progressEvent => {
        console.log(progressEvent)
        this.uploadLoaded = progressEvent.loaded
        this.uploadTotal = progressEvent.total
        this.uploadProgress = parseInt(
          Math.round((progressEvent.loaded / progressEvent.total) * 100),
          10,
        )
      }).then(response => {
        const imgUri = response.data.data.destination.slice('assets/'.length)
        const fileName = response.data.data.originalname
        const encodedFileName = encodeURIComponent(fileName)
        const url = `${host}/${imgUri}/${encodedFileName}`

        console.log(this.range)
        if (this.range) { this.editor.chain().focus().deleteRange(this.range) }

        this.editor.chain().focus().setImage({ src: url }).run()

        this.isUploading = false
      }).catch(error => {
        console.error('Error uploading image:', error)
        this.isUploading = false
      })
    },
  },
}
</script>

<style scoped>
.popupImage {
  display: absolute;
  z-index: 10;
  margin: 0 auto;
  border: 1px solid rgba(0,0,0,0.1);width: 24rem;border-radius:4px;
  background-color: white;
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
.shadow-lg {
    --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.progress {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}
button{
  display: inline-block;text-align: left;padding: 8px;margin-left: 4px;
}
button:hover{
    background-color: rgba(243, 244, 246, 1);
}
.outline-none {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.uploadBtn{
  background-color: rgb(2 132 199);
  color: white;
  border: 1px solid rgba(7, 89, 133,0.2);
  border-radius: 4px;
  padding: 4px 80px;
  margin: 12px auto;
  display: flex;

}
.uploadBtn:hover{
  background-color: rgb(3 105 161);
}
.uploadBtn:active{
  background-color: rgb(7 89 133);
}
input:focus{
    outline-offset: 0px;
    outline-style: solid;
    outline-width: 2px;
    outline-color: rgb(136, 186, 246);;
}
</style>
