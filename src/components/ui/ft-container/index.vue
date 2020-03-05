<template>
  <div class="ft-container">
    <!-- 主体内容区 - 头部 -->
    <div class="ft-container-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div> 
    <!-- 主体区 -->
    <el-scrollbar class="ft-container-scroll">
      <slot></slot>
    </el-scrollbar>
    <!-- 主体内容区 - 底部 -->
    <div class="ft-container-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ft-container"
}
</script>

<style lang="scss">
.ft-container{
    display: flex;
    flex-direction:column;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0; 
    flex-grow: 1;
    flex-shrink: 1;
    padding: 8px;
    
    >.ft-container-scroll{
      flex: 1;
      flex-grow: 1;
      flex-shrink: 1;
      >.el-scrollbar__wrap{
        overflow-x: hidden;
      }
    }
}
</style>