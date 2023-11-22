<!-- eslint-disable -->
<template>
    <div ref="itemsContainer" class="moreContainer">
        <template v-if="items.length">
            <div class="pl-2 text-black/40 text-xs font-semibold">{{ title }}</div>
            <button :ref="item.ref" v-for="(item, index) in items" :key="index" class="item"
                :class="{ 'is-selected': index === selectedIndex }" @click="selectItem(index)"
                @mouseover="handleHover(index)">
                <!-- {{ item }} -->
                <!-- list of menu -->
                <div class="flex menu items-center gap-x-2">
                    <div class="icon-con rounded-md ">
                        <span v-html="item.icon" />
                    </div>
                    <div class="flex flex-col">
                        <span class="text-sm">{{ item.title }}</span>
                        <span class="text-xs text-black/50">{{ item.shortcut }}</span>
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
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },
        editor: {
            required: true
        },
        isMoreTools: {
            required: true
        },
        title: {
            type: String
        }
    },

    data() {
        return {
            selectedIndex: 0,
        }
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
            this.selectedIndex = index
            const item = this.items[index]

            if (item) {
                console.log(this.editor)
                let editor = this.editor
                item.command(editor)
            }
        },

        handleHover(index) {
            this.selectedIndex = index
        },
        enterHandler() {
            this.selectItem(this.selectedIndex)
        },
    },
}
</script>

<style lang="scss">
.icon-con {
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding-bottom: 2px;
}

.moreContainer {
    display: flex;
    flex-direction: column;
    row-gap: 4px;
    margin-top: -8px;
    border-radius: 6px;
    padding: 12px 4px 0px 4px;
    border: 1px solid #D9D9D9;
    background: white;
    overflow: scroll;
    max-height: 300px;
    @apply shadow-md
}

// styling scroll slash menu
.moreContainer::-webkit-scrollbar {
    width: 3px;
}

/* Track (jalur) */
.moreContainer::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 50px;
}

/* Handle (bilah) */
.moreContainer::-webkit-scrollbar-thumb {
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
