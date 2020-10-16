<template>
  <div class="wl-dynamic-table">
    <!-- 按钮区 -->
    <el-row class="check-list" v-if="useCheckList || useExport">
      <el-col :span="useExport ? 21 : 24" v-if="useCheckList">
        <el-checkbox-group v-model="checkList">
          <el-checkbox
            v-for="item of selfCheckList"
            :key="item[selfProps.prop]"
            :label="item[selfProps.prop]"
            :checked="item[selfProps.checked]"
            :disabled="item[selfProps.disabled]"
            >{{ item[selfProps.label] }}</el-checkbox
          >
        </el-checkbox-group>
      </el-col>
      <el-col :span="3" class="align-right" v-if="useExport">
        <el-button
          plain
          class="btn"
          type="primary"
          icon="el-icon-ali-export iconfont"
          @click="exportClick"
          >导出</el-button
        >
      </el-col>
    </el-row>
    <!-- 列表区 -->
    <el-table border class="table-list" :data="selfData" :row-key="rowKey">
      <el-table-column
        v-for="i of selfColumns"
        :key="i[selfProps.prop]"
        :label="i[selfProps.label]"
        :prop="i[selfProps.prop]"
      >
        <template v-if="i._children">
          <el-table-column
            v-for="t of i._children"
            :key="t[selfProps.prop]"
            :label="t[selfProps.label]"
            :prop="t[selfProps.prop]"
          ></el-table-column>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/**
 * auth: weilan
 * time: 2020.04.03
 * des: 动态表格
 * @param useCheckList Boolean 显示控制动态table列表的checkbox
 * @param useExport Boolean 显示导出按钮
 * @param columns Array 列表表头
 *        {
            prop: "name",
            label: "名称",
            checked: true,
            disabled: true,
            children: []
          }
 * @param data Array 列表表格数据
 * @param props Object 列表配置项
 *        {
      *      prop: "prop", // 字段名
              label: "label", // 列表显示名字段
              checked: "checked", // 字段名
              disabled: "disabled", // 禁用字段
              children: "children", // 多级表头
 *          }
 * @param rowKey String 列表配置项 优化行数据key
 */
export default {
  name: "wl-dynamic-table",
  props: {
    useCheckList: {
      type: Boolean,
      default: true
    }, // 显示控制table列表的checkbox
    useExport: {
      type: Boolean,
      default: true
    }, // 显示导出按钮
    columns: Array, // 列表表头
    data: Array, // 列表表格数据
    props: Object, // 列表配置项
    rowKey: {
      type: String,
      default: "id"
    } // 优化行数据key
  },
  data() {
    return {
      checkList: [],
      selfColumnsList: []
    };
  },
  computed: {
    // 整理checkList数据
    selfCheckList() {
      if (!Array.isArray(this.columns)) return [];
      let _list = this.columns.reduce((pre, cur) => {
        return pre.concat(
          cur[this.selfProps.children] ? cur[this.selfProps.children] : cur
        );
      }, []);
      return _list;
    },
    // 整理配置项
    selfProps() {
      return {
        prop: "prop", // 字段名
        label: "label", // 列表显示名字段
        checked: "checked", // 字段名
        disabled: "disabled", // 禁用字段
        children: "children", // 多级表头
        ...this.props
      };
    },
    // 整理表格数据
    selfData() {
      return this.data || [];
    },
    // 整理表格表头
    selfColumns() {
      let _list = [];
      this.columns.forEach(i => {
        // 筛选二级表头
        if (i[this.selfProps.children]) {
          i._children = i[this.selfProps.children].filter(
            t => t[this.selfProps.checked]
          );
          if (i._children.length > 0) {
            _list.push(i);
          }
          return;
        }
        // 筛选一级表头
        if (i[this.selfProps.checked]) {
          _list.push(i);
        }
      });
      return _list;
    }
  },
  watch: {
    checkList(val) {
      this.selfCheckList.forEach(i => {
        i[this.selfProps.checked] = val.includes(i[this.selfProps.prop]);
      });
    }
  },
  methods: {
    exportClick() {
      this.$message("暂未开通，敬请期待");
    }
  }
};
</script>

<style lang="scss">
.wl-dynamic-table {
  display: flex;
  flex-direction: column;
  .check-list {
    margin-bottom: 15px;
  }
  .table-list {
    flex: 1;
    height: 100%;
    th {
      text-align: center;
    }
  }
}
</style>
