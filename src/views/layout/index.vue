<template>
  <div id="root" class="main-container">
    <!-- 全局半透明遮罩 -->
    <div class="layout-mask"></div>
    <!-- 左侧菜单区 -->
    <the-menu />
    <!-- 右侧视图 -->
    <div class="main-container-content">
      <!-- 上部导航区 -->
      <the-nav />
      <!-- 页面搜索组件 -->
      <transition name="fade-scale">
        <div v-if="searchActive" class="layout-search"></div>
      </transition>
      <!-- 右侧内容区 -->
      <transition name="fade-scale">
        <div class="main-container-view" v-if="!searchActive">
          <!-- 标签页列表 -->
          <div class="view-tabs">
            <page-tabs />
          </div>
          <!-- 内容区 -->
          <div class="view-body">
            <transition name="fade-transverse">
              <keep-alive :include="keepAlive">
                <router-view />
              </keep-alive>
            </transition>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import TheMenu from "@/components/TheMenu.vue";
import TheNav from "@/components/TheNav.vue";
import PageTabs from "./components/tabs";
import { mapGetters } from "vuex";

export default {
  name: "rootView",
  components: {
    TheMenu,
    TheNav,
    PageTabs
  },
  props: {
    loading: Boolean,
    content: String
  },
  computed: {
    ...mapGetters({ searchActive: "active", keepAlive: "keep_alive" })
  }
};
</script>

<style lang="scss">
/* .layout-search{
  width: 70%;
  height: 80%;
} */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.main-container {
  display: flex;
  width: 100%;
  height: 100%;
  min-width: 900px;
  position: relative;
  background-size: cover;
  background-position: 50%;
  overflow: hidden;

  > .layout-mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparent;
  }
}
.main-container-content {
  flex: 1;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  > .main-container-view {
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 100%;
    height: calc(100% - #{$header-height});
    background: $main-base-color;
    box-sizing: border-box;

    .app-view-box {
      width: 100%;
      padding: 12px;
      box-sizing: border-box;
    }

    > .view-body {
      position: relative;
      flex-grow: 1;
      flex-shrink: 1;
      background: #fff;
      border-radius: 4px;
    }
  }
}
</style>
