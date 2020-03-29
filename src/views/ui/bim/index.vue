<template>
  <wl-container>
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
          path: "bim/1/0.svf",
          modelObj: null
        },
        {
          name: "urn_model2",
          path: "bim/2/0.svf",
          modelObj: null
        },
        {
          name: "urn_model3",
          path: "bim/3/0.svf",
          modelObj: null
        },
        {
          name: "urn_model4",
          path: "bim/4/0.svf",
          modelObj: null
        },
        {
          name: "urn_model5",
          path: "bim/6/Sphere.svf",
          modelObj: null
        },
        {
          name: "urn_model6",
          path: "bim/6/Sphere.svf",
          modelObj: null
        }
      ]
    };
  }
};
</script>