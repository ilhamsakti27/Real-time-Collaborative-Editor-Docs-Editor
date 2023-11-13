<!-- eslint-disable  -->
<template>
    <div class="">
        <div ref="inlineBtn" class="flex">
            <template v-if="allInlineTools.length">
                <button :ref="item.ref" v-for="(item, index) in allInlineTools" :key="index"
                    :id="item.title === 'Link' || item.title === 'Unlink' ? 'popup' : item.title === 'Others' ? 'more' : item.title === 'Format Align' ? 'align' : ''">
                    <!-- list of menu -->
                    <div class="icon-container flex menu items-center gap-x-2 bubble-menu-btn border-r"
                        :data-tooltip="item.title" @mouseover="handleHover(index)" @click="selectItem(index)">
                        <div class="flex flex-col">
                            <div class=" rounded-md">
                                <span v-html="item.icon" />
                            </div>
                        </div>
                    </div>
                </button>
            </template>
            <div v-else class="">No data</div>
        </div>
    </div>
</template>
<!-- eslint-disable  -->

<script>
import defaultInlineTools from '../inlineTools';
import { mergeArrays } from '../../utils/utils';
import { moreTools } from './moreToolsBtn'
import { alignFormat } from './alignTools'
export default {
    props: {
        inlineTools: {
            type: Array,
            default: () => [],
        },
        editor: {
            required: true
        }

    },
    data() {
        return {
            allInlineTools: [],
            moreLineTools: [],
            selectedIndex: -1,
            isMoreTools: false,
        };
    },
    mounted() {
        this.allInlineTools = mergeArrays(defaultInlineTools(this.editor), this.inlineTools);
    },
    computed: {
        hrefValue() {
            return this.editor.getAttributes("link").href;
        },
    },
    watch: {
        hrefValue(newHref, oldHref) {
            this.handleHrefChange(newHref, oldHref);
        },
    },
    methods: {
        handleHrefChange(newHref, oldHref) {
            this.allInlineTools = mergeArrays(defaultInlineTools(this.editor), this.inlineTools);
        },

        handleHover(index) {
            this.selectedIndex = index;
            const item = this.allInlineTools[this.selectedIndex]
            this.isMoreTools = true
            if (item.tools) {
                let title = 'Inline Tools'
                console.log()
                if (item.title === 'Others')
                    moreTools(this.editor, item.tools, this.isMoreTools, title)
                if (item.title === 'Format Align')
                    alignFormat(this.editor, item.tools, this.isMoreTools, title)
            }
        },
        selectItem(index) {
            this.selectedIndex = index
            console.log(event)
            const item = this.allInlineTools[index]
            if (item.command)
                item.command(this.editor, event)
        },
    },
};
</script>

<style>
.icon-container {
    position: relative;
}
</style>
