<!-- eslint-disable -->
<template>
    <div ref="itemsContainer" class="menuContainer">
        <template v-if="items.length">
            <button :ref="item.ref" v-for="(item, index) in items" :key="index" class="item"
                :class="{ 'is-selected': index === selectedIndex }" @click="selectItem(index)">
                <!-- {{ item }} -->
                <!-- list of menu -->
                <div class="flex items-center gap-x-2">
                    <div class="border rounded-md">
                        <span v-html="item.icon" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm">{{ item.title }}</span>
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
            require: true
        },

    },

    data() {
        return {
            selectedIndex: 0,
        }
    },
    mounted() {
        document.addEventListener('keydown', event => {
            switch (event.key) {
                case 'ArrowUp':
                    // Handle Arrow Up key press
                    this.upHandler()
                    console.log('Arrow Up pressed: ', this.selectedIndex);
                    break;

                case 'ArrowDown':
                    // Handle Arrow Down key press
                    this.downHandler()
                    console.log('Arrow Down pressed: ', this.selectedIndex);
                    break;

                default:
                    break;
            }

        })
        // Add event listener for keydown event
    },
    methods: {
        selectItem(index) {
            const item = this.items[index]
            const command = item.operation[0]
            const subcommand = item.operation[1]
            switch (command) {
                case 'movenode':
                    switch (subcommand) {
                        case 'up':
                            // Code for 'movenode up'
                            this.moveNode('UP')
                            break;
                        case 'down':
                            // Code for 'movenode down'
                            this.moveNode('DOWN')
                            break;
                        default:
                            // Code for 'movenode' with an unknown subcommand
                            break;
                    }
                    break;
                case 'delete':
                    // Code for 'delete'
                    this.editor.commands.deleteSelection()
                    break;
                default:
                    break;
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
            let btn = this.$refs.deleteButton
            console.log(node)
            // this.$refs.deleteButton.$el.blur();
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
                    console.log('Scroll Position:', newScrollPosition)
                }
            }
            console.log('Scroll Position:', this.selectedIndex)
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

    },
}
</script>

<style lang="scss">
.menuContainer {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    padding: 12px 4px 0px 4px;
    border: 1px solid #D9D9D9;
    background: white;
    box-shadow: 0px 4px 16px 2px rgba(0, 0, 0, 0.15);
    overflow: scroll;
    max-height: 300px;
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
