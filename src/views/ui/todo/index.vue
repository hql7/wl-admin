<template>
  <div class="wl-todo-demo">
    <wl-todo-list
      :data="taskList"
      :confirm-options="confirmOptions"
      @task-create="handleCreateTask"
      @task-change="handleChangeTask"
      @task-delete="handleDeleteTask"
    >
      <!-- 无数据-插槽 -->
      <template #no-data> 这里空空如也，快为我安排第一份工作任务吧！ </template>
    </wl-todo-list>
  </div>
</template>

<script>
import { createUuid } from "@/util";

export default {
  name: "App",
  data() {
    return {
      taskList: [
        { id: "10", label: "完成docker部署微前端", isDone: true },
        { id: "11", label: "进入掘金2020年度作者前80", isDone: false },
        { id: "12", label: "完成2021年第一篇技术文章", isDone: true },
        { id: "13", label: "通过淘系技术考核", isDone: false },
      ],
      confirmOptions: {
        message: "是否确认删除该任务？",
      },
    };
  },
  methods: {
    /**
     * @name 创建任务事件
     * @param {Striing} val label
     */
    handleCreateTask(val) {
      // 同服务端交互后更新列表
      let item = {
        id: createUuid(),
        label: val,
      };
      this.taskList.unshift(item);
    },
    /**
     * @name 改变任务完成状态
     * @param {Object} item 任务信息
     */
    handleChangeTask(item) {
      // 同服务端交互，如内部处理，提交成功保持静默，失败更新列表；如外部处理提交后更新列表
      let targetTask = this.taskList.find((i) => i.id == item.id);
      this.$set(targetTask, "isDone", !item.isDone);
    },
    /**
     * @name 删除任务
     * @param {Object} item 任务信息
     */
    handleDeleteTask(item) {
      // 同服务端交互，如内部处理，提交成功保持静默，失败更新列表；如外部处理提交后更新列表
      this.taskList = this.taskList.filter((i) => i.id != item.id);
    },
  },
};
</script>

<style>
.wl-todo-demo {
  margin: 60px auto;
  width: 360px;
}
</style>
