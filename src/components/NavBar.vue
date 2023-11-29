<template>
  <div
    style="background-color: transparent; z-index: 99;display: flex;justify-content:space-between; position: fixed; padding: 0.1rem 4rem; border-bottom: 1px solid rgba(0, 0, 0, 0.4); width: 100%; align-items: center;backdrop-filter: blur(10px);"
  >
    <div style="font-weight: bold; font-size: 1.125rem;">
      Collaboration Editor App
    </div>
    <div style="display: flex; padding: 4px;">
      <div
        v-for="(item, index) in users "
        :key="index"
        :class="item ? `isItem` : ''"
        style="margin-left: -14px;"
      >
        <div
          style="position: relative;"
          :user-tooltip="index === 0 ? 'Me' : item[1].user.name"
        >
          <img
            style="border-radius: 50%; width: 40px; height: 40px;"
            :src="getImageUrl(item[1].user.avatar)"
          >
          <div
            style="content: attr(user-tooltip);
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
                                pointer-events: none;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import brook from '@/assets/images/op-pixel/brook.svg'
import chopper from '@/assets/images/op-pixel/chopper.svg'
import franky from '@/assets/images/op-pixel/franky.svg'
import jimbei from '@/assets/images/op-pixel/jimbei.svg'
import luffy from '@/assets/images/op-pixel/luffy.svg'
import nami from '@/assets/images/op-pixel/nami.svg'
import robin from '@/assets/images/op-pixel/robin.svg'
import sanji from '@/assets/images/op-pixel/sanji.svg'
import usopp from '@/assets/images/op-pixel/usopp.svg'
import zoro from '@/assets/images/op-pixel/zoro.svg'

export default {
  props: {
    users: {
      type: Map,
      required: true,
    },
  },
  data() {
    return {
      images: {
        brook,
        chopper,
        franky,
        jimbei,
        luffy,
        nami,
        robin,
        sanji,
        usopp,
        zoro,
      },
    }
  },
  methods: {
    getImageUrl(path) {
      if (path !== null) {
        return this.images[path]
      }

      return undefined
    },
  },
}
</script>
<style>
.isItem{
  display: flex;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-radius: 50%;
  padding: 0.25rem;
  background-color: #fff;
}
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
  background-color: rgba(0,0,0,0.4);
  color: white;
  border-radius: 4px;
  position: absolute;
  top:50px;
  left: 0px;
  transform: translateX(-50%) translateY(1);
  opacity: 0;
  pointer-events: none;
}
</style>
