<!-- eslint-disable  -->
<template>
    <div class="">
        <div ref="inlineBtn" class="flex">
            <template v-if="allInlineTools.length">
                <button :ref="item.ref" v-for="(item, index) in allInlineTools" :key="index"
                    :id="item.tools ? 'more' : null">
                    <!-- list of menu -->
                    <div class="icon-container flex menu items-center gap-x-2 bubble-menu-btn border-r"
                        @mouseover="handleHover(index)" @mouseout="hideLabel(index)" @click="selectItem(index)">
                        <div class="flex flex-col">
                            <div class=" rounded-md">
                                <span v-html="item.icon" />
                                <div v-if="isLabel && selectedIndex === index" class="label">{{ item.title }}</div>
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
import { moreTools } from './moreToolsBtn/moreTools'

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
            isLabelVisible: [],
            moreLineTools: [],
            selectedIndex: -1,
            isLabel: false,
            isMoreTools: false,
        };
    },
    mounted() {
        this.allInlineTools = mergeArrays(defaultInlineTools(), this.inlineTools);
        this.isLabelVisible = new Array(this.allInlineTools.length).fill(false);
    },
    methods: {
        handleHover(index) {
            this.isLabel = true;
            this.selectedIndex = index;
            this.isLabelVisible[this.selectedIndex] = true;
            const item = this.allInlineTools[this.selectedIndex]
            this.isMoreTools = true
            if (item.tools) {
                let title = 'Inline Tools'
                if (this.isMoreTools)
                    moreTools(this.editor, item.tools, this.isMoreTools, title)
            } else {
                this.isMoreTools = false
                moreTools(this.editor, this.isMoreTools, this.isMoreTools, null)
            }
        },
        hideLabel(index) {
            this.isLabel = false;
            this.selectedIndex = index;
            this.isLabelVisible[this.selectedIndex] = false;
        },
        selectItem(index) {
            this.selectedIndex = index
            const item = this.allInlineTools[index]
            if (item.command)
                item.command(this.editor)

        }
    },
};
</script>

<style>
.icon-container {
    position: relative;
}

.label {
    position: absolute;
    bottom: 40px;
    font-size: smaller;
    left: 0;
    background-color: #333;
    color: #fff;
    padding: 5px;
    border-radius: 3px;
    display: none;
    width: max-content;
}

.icon-container:hover .label {
    display: block;
}
</style>
