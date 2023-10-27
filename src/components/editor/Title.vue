<!-- eslint-disable  -->
<template>
    <div class="flex flex-col gap-y-4 w-full px-[25%] pt-[8%]">
        <!-- <input type="text" class="text-[48px] placeholder-black/10 border-none outline-none font-bold"
            placeholder="Untitled">
        <div class="flex gap-x-8">
            <div class="">
                <div class="text-black/50">
                    Owner
                </div>
            </div>
            <div class="">
                <div class="text-black/50">
                    Tags
                </div>
            </div>
        </div> -->
        <editor-content ref="titleBlock" id="title" :editor="editor" :value="editor.getAttributes('textStyle').color" />

    </div>
</template>

<!-- eslint-disable  -->
<script>
import { Editor } from '@tiptap/core'
import { EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from './custom-extension/placeholder'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
// import { Title } from './custom-extension/document'
export default {
    components: {
        EditorContent
    },
    data() {
        return {
            editor: null
        }
    },
    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit.configure({
                    document: false,
                }),
                Placeholder.configure({
                    placeholder: ({ node }) => {
                        let text = `Untitled`
                        if (node.type.name === 'heading') {
                            return 'What’s the title?'
                        }
                        return text
                    },
                }),
                Heading.configure({
                    levels: [1, 2, 3],
                    HTMLAttributes: {
                        class: 'heading',
                    },
                }),
            ]
        })
    },

}
</script>
<style>
@import 'style.css';
</style>
