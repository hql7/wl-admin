<template>
  <wl-container>
    <div class="msg">打开f12 查看localStorage数据变化</div>
    <div class="msg">
      <el-button type="primary" @click="addData()">数组存数据</el-button>
      <el-button type="primary" @click="addObj()">对象存数据</el-button>
      <el-button type="primary" @click="addStr()">字符串存数据</el-button>
      <el-button type="info" @click="getData()">取数据</el-button>
      <el-button type="danger" @click="delData()">删数据</el-button>
    </div>
  </wl-container>
</template>

<script>
export default {
  name: "wl-explorer",
  methods: {
    addData() {
      this.wldb.push("posts", { title: "lowdb", name: "weilan" });
    },
    getData() {
      let msg = this.wldb.find("posts", { title: "lowdb" });
      console.log(msg);
    },
    delData() {
      this.wldb.remove("posts", { title: "lowdb" });
    },
    addObj() {
      this.wldb.set("user.name", "weilan");
    },
    addStr() {
      this.wldb.update("color", () => 3);
    }
  }
};
</script>

<style lang="scss">
.msg {
  text-align: center;
  padding: 100px;
}
</style>