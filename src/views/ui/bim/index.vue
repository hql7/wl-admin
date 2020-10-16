<template>
  <wl-container :use-scroll="false">
    <wl-bim-viewer multiple :docs="bims" class="wl-viewer"></wl-bim-viewer>
  </wl-container>
</template>

<script>
export default {
  name: "bim",
  data() {
    return {
      bims: [
        {
          name: "urn_model1",
          path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo1/0.svf",
          modelObj: null
        },
        {
          name: "urn_model2",
          path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo2/0.svf",
          modelObj: null
        },
        {
          name: "urn_model3",
          path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo3/0.svf",
          modelObj: null
        },
        {
          name: "urn_model4",
          path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo4/0.svf",
          modelObj: null
        },
        {
          name: "urn_model5",
          path:
            "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo5/Sphere.svf",
          modelObj: null
        },
        {
          name: "urn_model6",
          path:
            "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/demo5/Sphere.svf",
          modelObj: null
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.wl-viewer {
  height: 90%;
  width: 90%;
  margin: 4% auto 0;
}
</style>
