<template>
  <div class="page-tabs">
    <!-- <div class="tab-box"> -->
    <wl-contextmenu
      :visible.sync="contextmenu_show"
      :x="contextmenu.x"
      :y="contextmenu.y"
      :menu-list="contextmenu_list"
      @rowClick="contextMenuClick"
    ></wl-contextmenu>
    <el-tabs
      v-show="keepAlivePages.length > 0"
      :value="activeCurrent"
      closable
      type="card"
      @tab-click="handlePageClick"
      @tab-remove="handlePageRemove"
      @contextmenu.native="handleContextmenu"
    >
      <el-tab-pane
        v-for="page in keepAlivePages"
        :key="page.url"
        :label="page.title"
        :name="page.url"
      />
    </el-tabs>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { sessionGet } from "@/util/storage";

export default {
  name: "page-tabs",
  data() {
    return {
      contextmenu_show: false, // 显示上下文菜单
      contextmenu: {
        x: 0,
        y: 0, // 坐标
        tag: "" // 右键点击的tag标签
      }, // 上下文菜单配置信息
      contextmenu_list: [
        { icon: "el-icon-back", title: "关闭左侧", value: "left" },
        { icon: "el-icon-right", title: "关闭右侧", value: "right" },
        { icon: "el-icon-close", title: "关闭其它", value: "other" },
        { icon: "el-icon-circle-close", title: "关闭全部", value: "all" }
      ]
    };
  },
  computed: {
    ...mapGetters({ keepAlivePages: "keep_alive", activeCurrent: "current" })
  },
  created() {
    if (this.keepAlivePages.length === 0) {
      let sessionPages = sessionGet("keep_alive");
      this.setKeepPage(sessionPages, false);
    }
    if (!this.activeCurrent) {
      let sessionActive = sessionGet("current") || "";
      this.setCurrentPage(sessionActive);
    }
  },
  methods: {
    // 点击页面切换
    handlePageClick(val) {
      this.setCurrentPage(val.name);
      this.$router.push(val.name);
    },
    // 关闭标签页
    handlePageRemove(val) {
      this.closeKeepPage(val);
    },
    // 标签页右键菜单
    handleContextmenu(event) {
      event.preventDefault();
      event.stopPropagation();
      this.contextmenu.tag = event.target
        .getAttribute("aria-controls")
        .slice(5);
      this.contextmenu.x = event.clientX;
      this.contextmenu.y = event.clientY;
      this.contextmenu_show = true;
    },
    // 上下文菜单点击事件
    contextMenuClick(command) {
      this.contextmenu_show = false;

      switch (command.value) {
        case "left":
          this.closeLeftKeepPage(this.contextmenu.tag);
          break;
        case "right":
          this.closeRightKeepPage(this.contextmenu.tag);
          break;
        case "other":
          this.closeOtherKeepPage(this.contextmenu.tag);
          break;
        case "all":
          this.closeAllKeepPage();
          break;
        default:
          this.$message.error("无效的操作");
          break;
      }
    },
    // 导入vuex action函数
    ...mapActions("page", [
      "setCurrentPage",
      "closeKeepPage",
      "closeRightKeepPage",
      "closeLeftKeepPage",
      "closeOtherKeepPage",
      "closeAllKeepPage",
      "setKeepPage"
    ])
  }
};
</script>

<style lang="scss">
.page-tabs {
  .el-tabs--card > .el-tabs__header {
    background: #f7f7f7;
    // margin-bottom: 10px;
    margin-bottom: 6px;
    .el-tabs__item.is-active {
      border-bottom-color: $main-base-color;
    }
    .el-tabs__item {
      height: 34px;
      line-height: 34px;
    }
  }
}
</style>
