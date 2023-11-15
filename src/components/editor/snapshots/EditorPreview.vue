<!-- eslint-disable  -->
<template>
    <div v-if="shouldShow"
        class="fixed z-[1000] w-1/2 bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg border rounded h-fit px-4 py-4">
        <div class="text-lg font-bold pb-2 pl-2">Version Preview</div>
        <div class="flex w-full">
            <div class="border p-2 w-3/4 max-h-[40vh] overflow-y-auto">
                <editor-content id="editor" :editor="editor" />
            </div>
            <div v-if="history.length" class="pl-4 flex flex-col gap-y-2 w-1/4 max-h-[40vh] overflow-y-auto">
                <div v-for="(item, index) in history">
                    <div @click="setPreview(index)" class=" cursor-pointer hover:bg-gray-100 px-2 py-1 w-full">
                        <div class="">{{ item.title }}</div>
                        <div class="text-xs text-black/50">{{ item.timestamp }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div @click="commitVersion" class="w-full flex justify-end">
            <button class="py-1 px-8 mt-2 bg-gray-200">Apply</button>
        </div>
    </div>
</template>

<!-- eslint-disable  -->
<script>
// tiptap extension
import { Editor } from '@tiptap/core'
import { EditorContent } from '@tiptap/vue-2'
import defaultExtension from '../extensions'

export default {
    components: {
        EditorContent
    },
    props: {
        content: {
            required: true
        },

        history: {
            required: true
        },
        mainEditor: {
            required: true
        }
    },
    data() {
        return {
            shouldShow: true,
            selectedIndex: 0,
            editor: null,
        }
    },
    methods: {
        setPreview(index) {
            this.selectedIndex = index
            this.editor.commands.setContent(this.history[index].snapshots)
        },
        commitVersion() {
            const snapshot = this.history[this.selectedIndex].snapshots
            this.mainEditor.commands.setContent(snapshot)
            this.shouldShow = false
        }
    },
    mounted() {
        this.editor = new Editor({
            extensions: [
                ...defaultExtension,
            ],
            content: this.content,
            editable: false,
        })
        console.log(this.history)
    }
}

</script>