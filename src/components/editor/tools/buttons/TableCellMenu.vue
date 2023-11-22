<!-- eslint-disable  -->
<template>
    <div class="">
        <div ref="" id="popup" class="flex">
            <template v-if="tableCellTools.length">
                <button v-for="(item, index) in tableCellTools" :key="index">
                    <!-- list of menu -->
                    <div class="icon-container flex menu items-center gap-x-2 bubble-menu-btn border-r"
                        :data-tooltip="item.title" @click="selectItem(index)">
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
import { tableCellTools } from '../utils/table';
export default {
    props: {
        editor: {
            required: true
        }
    },
    data() {
        return {
            selectedIndex: 0,
            tableCellTools: tableCellTools()
        };
    },
    mounted() {
        console.log(this.tableCellTools)
    },
    methods: {
        selectItem(index) {
            const item = this.tableCellTools[index]
            if (item.command) item.command(this.editor)
        }
    }
};
</script>

<style>
.icon-container {
    position: relative;
}
</style>
