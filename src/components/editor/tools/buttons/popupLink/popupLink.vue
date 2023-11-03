<!-- eslint-disable  -->
<template>
    <div class="">
        <div v-show="!toggleShowLinkEdit" class="popUpLink flex flex-col gap-y-2">
            <input class="w-full text-sm" placeholder="Paste link" type="url" v-model="urlInput" @input="clearError">
            <button @click="setLink" class=" bg-blue-400 hover:bg-blue-200 text-white text-sm"
                style="border: 1px solid rgba(156, 156, 156, 0.201);">Submit</button>
        </div>
        <div class="popUpLink" v-show="toggleShowLinkEdit">
            <div class="flex flex-col gap-y-2">
                <div class="flex flex-col gap-y-1">
                    <label class="text-black/40 text-xs font-semibold " for="pageOrURL">Page or URL</label>
                    <input class="w-full text-sm" placeholder="Edit link or search pages" type="url" id="pageOrURL"
                        v-model="url">
                </div>
                <div class="flex flex-col gap-y-1">
                    <label class="text-black/40 text-xs font-semibold " for="linkTitle">Link title</label>
                    <input class="w-full text-sm" placeholder="title" type="url" id="linkTitle" v-model="urlTitle">
                </div>
            </div>
            <hr class="custom-hr">
            <button @click="removeLink" class="flex items-center justify-center w-full gap-x-2 hover:bg-red-200 bg-red-400"
                style="border: 1px solid rgba(156, 156, 156, 0.201);padding: 4px 0;">
                <span v-html="removeIcon"></span>
                <div class="text-white text-sm font-semibold ">Remove link</div>
            </button>
        </div>
    </div>
</template>

<!-- eslint-disable  -->
<script>

export default {
    props: {
        editor: {
            required: true
        },
    },
    data() {
        return {
            previousUrl: this.editor.getAttributes('link').href,
            url: '',
            toggleShowLinkInput: false,
            toggleShowLinkEdit: false,
            urlInput: '', // Data property to store the input URL
            urlError: '', // Data property to display an error message
            removeIcon: '<svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24 " stroke-width="1.5" stroke="white" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>',
            url: '',
            urlTitle: '',
        }
    },
    mounted() {
        if (this.previousUrl) {
            this.url = this.previousUrl;
            this.toggleShowLinkEdit = !this.toggleShowLinkEdit;
        }
    },
    methods: {
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
                this.toggleShowLinkEdit = !this.toggleShowLinkEdit;
                this.url = this.urlInput;
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
                this.toggleShowLinkEdit = !this.toggleShowLinkEdit;
                this.url = this.urlInput;
                // clear input
                this.urlInput = ''
            }

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
    }
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
    margin-top: 30px;
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
    /* Button border color */
    /* color: #6c757d; */
    /* Button text color */
    width: 100%;
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