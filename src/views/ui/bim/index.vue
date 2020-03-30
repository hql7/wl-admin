<template>
  <wl-container>
    <wl-bim-viewer :docs="bims" class="wl-viewer"></wl-bim-viewer>
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
          path: "http://wlui.oss-cn-beijing.aliyuncs.com/bimdata/0.pf",
          modelObj: null
        }
      ]
    };
  }
};
</script>