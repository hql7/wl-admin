<template>
  <wl-container class="wlui-index" :use-scroll="false">
    <div class="wlui-logo">
      <img
        class="wlui-logo-img"
        src="@/assets/images/wlui-logo-lang.jpg"
        alt="wl-ui logo"
        title="wl-ui 精美易用的复杂前端组件解决方案"
      />
      <h1 class="wlui-logo-title">wl-ui: 精美易用的复杂前端组件解决方案</h1>
      <h2 class="wlui-logo-subtitle">Beautiful and easy-to-use complex front-end component solutions</h2>
    </div>
    <div class="ui-components">
      <div class="item-box">
        <el-button type="danger" plain @click="routerGo('/ui/gantt')">Gantt甘特图</el-button>
        <el-button type="danger" plain @click="routerGo('/ui/explorer')">文件管理器网盘</el-button>
        <el-button type="danger" plain @click="showSelf()">后台系统模板</el-button>
        <el-button type="danger" plain @click="routerToMfe()">微前端</el-button>
        <el-button type="danger" plain @click="routerGo('/ui/bim')">BIM浏览组件</el-button>
      </div>
      <div class="item-box">
        <el-button type="danger" plain @click="routerGo('/ui/transfer')">树形穿梭框</el-button>
        <el-button type="danger" plain @click="routerGo('/ui/select')">树形下拉框</el-button>
        <el-button type="danger" plain @click="routerGo('/ui/table')">动态表格</el-button>
        <el-button type="danger" plain @click="routerGo('/ui/ssx')">省市县三级联动</el-button>
        <el-button type="danger" plain @click="routerGo('/ui/workflow')">工作流程图</el-button>
      </div>
    </div>
    <div class="blog-box" slot="footer">
      <a class="blog-item" href="https://github.com/hql7" target="_blank">Github</a>
      <a class="blog-item" href="https://juejin.im/user/591d141e0ce46300692184a4" target="_blank">掘金</a>
      <a class="blog-item" href="https://segmentfault.com/u/weilan_595deafa69d76" target="_blank">思否</a>
      <a class="blog-item" href="https://www.yuque.com/huoqilei" target="_blank">语雀</a>
      <a class="blog-item" href="https://blog.csdn.net/qq_15390381" target="_blank">CSDN</a>
      <a
        class="blog-item"
        href="https://my.oschina.net/u/3461199?tab=newest&catalogId=0"
        target="_blank"
      >开源中国</a>
    </div>
  </wl-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    // 导入vuex菜单数据，菜单折叠状态
    ...mapGetters(["menu_list"])
  },
  methods: {
    /**
     * 路由跳转
     * url 地址
     */
    routerGo(url) {
      let _item = this.menu_list.find(i => i.url === url);
      if (!_item) return;
      this.addKeepPage(_item); // 添加历史记录
      this.setCurrentPage(url); // 记录当前页
      this.$router.push(url);
    },
    // 后台管理模板弹出提示
    showSelf() {
      this.$message("本站即是后台管理系统模板哦");
    },
    // 去微前端网站
    routerToMfe() {
      this.$confirm("即将离开本站跳转至微前端演示网站，是否继续？")
        .then(() => {
          window.open("http://mfe.wlui.com.cn/");
        })
        .catch(() => {
          this.$message("已取消");
        });
    },
    ...mapActions("page", ["addKeepPage", "setCurrentPage"])
  }
};
</script>

<style lang="scss">
.wlui-index {
  .wlui-logo {
    text-align: center;
    height: 30%;
    margin-bottom: 100px;
    > .wlui-logo-img {
      height: 100%;
    }
    > .wlui-logo-title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }
    > .wlui-logo-subtitle {
      font-size: 14px;
      font-weight: 600;
      color: #dcdfe6;
    }
  }

  .ui-components {
    overflow: hidden;
    width: 700px;
    margin: 0 auto;
    > .item-box {
      display: flex;
      justify-content: space-between;
      padding: 50px 0;
    }
  }

  .blog-box {
    > .blog-item {
      padding: 10px;
      color: #c0c4cc;
    }
  }
}
</style>