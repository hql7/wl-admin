<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~@/assets/css/clear.css";
@import "~@/style/animate/transition.scss";
@import "~@/style/style/style.scss";

html,
body {
  height: 100%;

  > #app {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>