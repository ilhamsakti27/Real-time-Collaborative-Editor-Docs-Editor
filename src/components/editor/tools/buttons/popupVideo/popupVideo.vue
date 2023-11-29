<template>
  <div class="">
    <!-- upload file pop up -->
    <div
      v-show="isUpload"
      style="box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);"
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
          YouTube
        </button>
      </div>
      <div style="border-top: 1px solid rgba(0,0,0,0.1);padding: 12px;">
        <div class="">
          <input
            id="file-input"
            ref="inputImg"
            type="file"
            name="file"
            style="width: 100%;border-style: solid;border: 1px solid rgba(0,0,0,0.1);border-radius: 4px;background-color: rgba(249, 250, 251,1);padding: 8px 4px; font-size: 0.875rem; line-height: 1.25rem; outline: 2px solid transparent; outline-offset: 2px;"
            class="text-sm outline-none"
            placeholder="Upload or Drag file"
          >
        </div>
        <!-- Display loading indicator if isUploading is true -->
        <div
          v-if="isUploading"
          style="margin-top: 8px;color: rgba(107, 114, 128, 1); font-size: 0.875rem; line-height: 1.25rem;"
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
          @click="uploadVideoHandler"
        >
          Upload Video
        </button>
        <div style="text-align: center;">
          <span
            style="color: rgba(0,0,0,0.4);margin: 0 auto; font-size: 0.75rem; line-height: 1rem;"
            class="text-xs"
          >The maximum size per file is 100 MB.</span>
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
          YouTube
        </button>
      </div>
      <div style="border-top: 1px solid rgba(0,0,0,0.1);padding: 12px;">
        <input
          v-model="url"
          type="url"
          style="width: 100%;border-style: solid;border: 1px solid rgba(0,0,0,0.1);border-radius: 4px;background-color: rgba(249, 250, 251,1);padding: 8px 4px;margin: 4px auto; font-size: 0.875rem; line-height: 1.25rem; outline: 2px solid transparent; outline-offset: 2px;"
          class="text-sm outline-none "
          placeholder="Paste the youtube link..."
        >
        <br>
        <button
          class="uploadBtn"
          @click="setLinkYoutube"
        >
          Embed YouTube
        </button>
        <div style="text-align: center">
          <span
            style="color: rgba(0,0,0,0.4);margin: 0 auto; font-size: 0.75rem; line-height: 1rem;"
            class="text-xs "
          >Works with any youtube link</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { uploadMedia } from '@/components/editor/utils/upload'

const host = process.env.VUE_APP_EDITOR_BACKEND

export default {
  name: 'ImageView',
  props: {
    editor: {
      type: Object,
      required: true,
    },
    range: {
      type: Number,
      default: 0,
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
    const path = window.location.href
    const [, , , , documentId] = path.split('/')
    this.documentId = documentId
  },
  methods: {
    uploadOrEmbedLinkBtn() {
      this.isEmbedLink = !this.isEmbedLink
      this.isUpload = !this.isUpload
    },
    setLinkYoutube() {
      if (this.url) {
        if (this.range) { this.editor.chain().focus().deleteRange(this.range) }

        this.editor.chain().focus().enter().setYoutubeVideo({ src: this.url })
          .run()
      }
    },
    uploadVideoHandler() {
      const path = this.$refs.inputImg
      const file = path.files[0]

      // Set isUploading to true when starting the upload
      this.isUploading = true

      uploadMedia(file, this.documentId, progressEvent => {
        this.uploadLoaded = progressEvent.loaded
        this.uploadTotal = progressEvent.total
        this.uploadProgress = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100), 10)
      }).then(response => {
        const imgUri = response.data.data.destination.slice('assets/'.length)
        const fileName = response.data.data.originalname
        const encodedFileName = encodeURIComponent(fileName)
        const url = `${host}/${imgUri}/${encodedFileName}`

        if (this.range) { this.editor.chain().focus().deleteRange(this.range) }

        this.editor.chain().focus().setVideo({ src: url }).run()

        this.isUploading = false
      }).catch(error => {
        console.error('Error uploading video:', error)
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
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 24rem;
  border-radius: 4px;
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

button {
  display: inline-block;
  text-align: left;
  padding: 8px;
  margin-left: 4px;
}

button:hover {
  background-color: rgba(243, 244, 246, 1);
}

.outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.uploadBtn {
  background-color: rgb(2 132 199);
  color: white;
  border: 1px solid rgba(7, 89, 133, 0.2);
  border-radius: 4px;
  padding: 4px 80px;
  margin: 12px auto;
  display: flex;

}

.uploadBtn:hover {
  background-color: rgb(3 105 161);
}

.uploadBtn:active {
  background-color: rgb(7 89 133);
}

input:focus {
  outline-offset: 0px;
  outline-style: solid;
  outline-width: 2px;
  outline-color: rgb(136, 186, 246);
  ;
}</style>
