<template>
  <div class="root">
    <LeftSideBar class="leftSideBar" />
    <div class="root__content">
      <Header class="header" />
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from "@/components/Header.vue"
import LeftSideBar from "@/components/LeftSideBar.vue"
// import Player from "@/components/Player.vue"
export default defineComponent({
  components: {
    Header,
    LeftSideBar,
    // Player,
  }
})
</script>

<style lang="scss" scoped>
.root {
  display: grid;
  grid-template-columns: 300px 1fr;
  height: 100vh;
  overflow: hidden;
  .leftSideBar {
    position: relative;
    background-color: black;
  }
  .root__content {
    // padding: 84px 30px 120px 30px;
    background-color: #121212;
    overflow: auto;
    scrollbar-width: thin;
    scrollbar-color: #6969dd #e0e0e0;
    .header {
      position: fixed;
      height: 64px;
      width: calc(100% - 300px);
      top: 0;
      left: 300px;
      background: none;
      z-index: 90;
    }
    &::-webkit-scrollbar {
      width: 10px;
      z-index: 100px;
    }
    &::-webkit-scrollbar-track {
      background-color: none;
    }
    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 6px rgba(20, 12, 12, 0.3);
      background: #5a5a5a;
    }
  }
}
</style>
