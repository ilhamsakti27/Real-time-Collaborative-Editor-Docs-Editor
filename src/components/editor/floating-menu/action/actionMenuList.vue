<!-- eslint-disable -->
<template>
    <div ref="itemsContainer" class="menuContainer">
        <template v-if="items.length">
            <div class="pl-2 text-black/40 text-xs font-semibold">Action</div>
            <button :ref="item.ref" v-for="(item, index) in filteredItems" :key="index" class="item"
                :class="{ 'is-selected': index === selectedIndex }" @click="selectItem(index)"
                @mouseover="handleHover(index)">
                <!-- {{ item }} -->
                <!-- list of menu -->
                <div class="flex menu items-center gap-x-2">
                    <div class="icon-wrapper rounded-md ">
                        <span v-html="item.icon" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm">{{ item.title }}</span>
                        <span class="text-black/50 text-xs">{{ item.desc }}</span>
                    </div>
                </div>
            </button>
        </template>
        <div v-else class="item">
            No result
        </div>
    </div>
</template>

<!-- eslint-disable -->
<script>
import { ref, onMounted, computed, nextTick } from 'vue'
import {
    DragNode,
    MoveNode,
    GetTopLevelBlockCoords,
    GetTableColumnCoords,
    GetTableRowCoords,
    GetTopLevelNode,
} from "../../utils/pm-utils.js";

export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        editor: {
            required: true
        },
        topLevelNodeType: {
            required: true
        },
        isSubMenu: {
            required: true
        },
    },

    data() {
        return {
            selectedIndex: 0,
        }
    },
    computed: {
        filteredItems() {
            // Use a computed property to filter items based on your condition
            return this.items.filter(item => {
                if (item.title === 'Delete') {
                    return this.editor.can().deleteNode(this.topLevelNodeType);
                } else if (item.ref === 'unsetHghlBtn') {
                    return this.editor.isActive('highlight')
                } else if (item.ref === 'unsetColorBtn') {
                    return this.editor.isActive('textStyle')
                }
                return true;
            });
        },
    },
    mounted() {
        this.$nextTick(() => {
            const el = this.$refs.itemsContainer
            el.focus();
            el.addEventListener('keydown', this.keyDownHandler);
        });
    },
    methods: {
        selectItem(index) {
            if (this.editor.isActive('highlight') && this.editor.isActive('textStyle')) {
                this.selectedIndex = index
            } else if (this.editor.isActive('textStyle')) {
                this.selectedIndex = index + 1
            } else {
                this.selectItem = index
            }
            const item = this.items[this.selectedIndex]
            if (item) {
                item.command(this.editor, this.topLevelNodeType)
            }
        },
        moveNode(dir = "UP") {
            MoveNode({
                view: this.editor.view,
                dir: dir,
                currentResolved: this.editor.view.state.selection.$from,
            });
        },
        deleteNode(node) {
            this.editor.commands.deleteNode(node);
        },
        upHandler() {
            // stop scroll event jika sudah mentok
            if (this.selectedIndex <= 0) {
                this.selectedIndex = 0
            } else {
                this.selectedIndex -= 1
            }
            // ref untuk element items
            const { itemsContainer } = this.$refs
            // logic scroll key down
            if (itemsContainer && this.selectedIndex <= (this.items.length / 2)) {
                // scroll untuk key down pada index
                const scrollPosition = itemsContainer.scrollTop
                if (this.selectedIndex >= 0) {
                    const newScrollPosition = scrollPosition - 60
                    itemsContainer.scrollTop = newScrollPosition
                }
            }
        },
        handleHover(index) {
            this.selectedIndex = index
        },
        downHandler() {
            // stop scroll event jika sudah mentok
            if (this.selectedIndex >= this.items.length - 1) {
                this.selectedIndex = this.items.length - 1
            } else {
                this.selectedIndex += 1
            }

            // ref untuk element items
            const { itemsContainer } = this.$refs
            // logic scroll key down
            if (itemsContainer && this.selectedIndex >= (this.items.length / 3) + 1) {
                // scroll untuk key down pada index >= ke-setengah item
                const scrollPosition = itemsContainer.scrollTop
                if (this.selectedIndex !== this.items.length) {
                    const newScrollPosition = scrollPosition + 60
                    itemsContainer.scrollTop = newScrollPosition
                }
            }
        },
        enterHandler() {
            // alert(this.selectedIndex)
            this.selectItem(this.selectedIndex)
        },
        keyDownHandler(event) {
            event.preventDefault()
            if (this.isSubMenu === true) {
                switch (event.key) {
                    case 'ArrowUp':
                        this.upHandler()
                        break;
                    case 'ArrowDown':
                        this.downHandler()
                        break;
                    case 'Enter':
                        this.enterHandler()
                    default:
                        break;
                }
            }
        }

    },
}
</script>

<style lang="scss">
.icon-wrapper {
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding-bottom: 2px;
}

.menuContainer {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    border-radius: 6px;
    padding: 12px 4px 0px 4px;
    border: 1px solid #D9D9D9;
    background: white;
    box-shadow: 0px 4px 16px 2px rgba(0, 0, 0, 0.15);
    overflow: scroll;
    max-height: 300px;
    width: 210px;
}

// styling scroll slash menu
.menuContainer::-webkit-scrollbar {
    width: 3px;
}

/* Track (jalur) */
.menuContainer::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 50px;
}

/* Handle (bilah) */
.menuContainer::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 20px;
    border: 7px solid transparent;
}

.item {
    display: block;
    margin: 0;
    width: 100%;
    text-align: left;
    background: transparent;
    border-radius: 0.4rem;
    border: 1px solid transparent;

    &.is-selected {
        // border-color: #000;
        background-color: #d8d9daa1;
    }
}

.item span svg {
    display: inline-block;
    width: 2em;
}
</style>
