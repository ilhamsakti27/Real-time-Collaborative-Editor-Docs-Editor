<!-- eslint-disable  -->
<template>
    <div style="background-color: transparent; z-index: 99;"
        class="w-full fixed backdrop-blur-md px-16 py-1 border-b flex justify-between items-center">
        <div class="font-bold text-lg">Collaboration Editor App</div>
        <div class="flex p-1">
            <div v-for="(item, index) in  users " :key="index"
                :class="item ? `flex items-center border rounded-[50%] p-1 bg-white z-[${10 - index}]` : ''"
                style="margin-left: -14px;">
                <div class="" :user-tooltip="index === 0 ? 'Me' : item[1].user.name">
                    <img class="rounded-[50%] w-[40px] h-[40px]" :src="getImageUrl(item[1].user.avatar)" />
                </div>
            </div>
        </div>
    </div>
</template>

<!-- eslint-disable  -->
<script>
export default {
    props: {
        users: {
            required: true,
        },
    },
    methods: {
        getImageUrl(path) {
            if (path !== null) {
                if (!path.includes("http")) {
                    return require('@/assets/images/op-pixel/' + path);
                }
            }
        },
    },

}
</script>
<style>
[user-tooltip] {
    position: relative;
}

[user-tooltip]:hover::after {
    transform: translateY(0);
    opacity: 1;
}

[user-tooltip]::after {
    content: attr(user-tooltip);
    width: max-content;
    transition: all 0.3s;
    font-size: 12px;
    padding: 4px 8px;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    border-radius: 4px;
    position: absolute;
    left: 0;
    transform: translateX(-50%) translateY(1);
    opacity: 0;
    pointer-events: none;
}
</style>