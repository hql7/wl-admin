<template>
  <wl-container :use-scroll="false">
    <div class="xxs-box">
      <h4 class="mg-bt">
        模式：三个下拉框联动模式；一个下拉框级联模式；&nbsp;&nbsp;
        <el-button type="success" plain @click="changeAddressMode">当前模式：{{ address_mode }}</el-button>
      </h4>
      <wl-address class="my-wl-address" :type="address_mode" :address.sync="address_data"></wl-address>
    </div>
  </wl-container>
</template>

<script>
export default {
  name: "xxs",
  data() {
    return {
      address_mode: "cascader", // default普通 cascader级联
      address_data: "" // 选中地址
    };
  },
  methods: {
    changeAddressMode() {
      this.address_mode =
        this.address_mode == "default" ? "cascader" : "default";
    }
  },
  watch: {
    address_data(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss">
.xxs-box {
  margin: 120px auto;
  width: 600px;

  >.mg-bt{
    margin-bottom: 20px;
  }
}
</style>