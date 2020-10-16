<template>
  <wl-container>
    <h3 slot="header" class="msg">暂只支持2级表头</h3>
    <WlTable :columns="columnsList" :data="tableData"></WlTable>
  </wl-container>
</template>

<script>
import WlTable from "./components/wl-dynamic-table";

export default {
  name: "ui-table",
  components: { WlTable },
  data() {
    return {
      columnsList: [
        {
          prop: "deptName",
          label: "公司名称",
          checked: true,
          disabled: true
        },
        {
          prop: "projectFname",
          label: "项目名称",
          checked: true,
          disabled: true
        },
        {
          prop: "warehouseName",
          label: "仓库名称",
          checked: true
        },
        {
          prop: "materialType",
          label: "物资分类",
          checked: true
        },
        {
          prop: "materialTypeCode",
          label: "物资分类编号",
          checked: true
        },
        {
          prop: "materialName",
          label: "物资名称",
          checked: true
        },
        {
          prop: "materialCode",
          label: "物资编号",
          checked: true
        },
        {
          prop: "specification",
          label: "规格",
          checked: true
        },
        {
          prop: "unit",
          label: "单位",
          checked: true
        },
        {
          prop: "beginStock",
          label: "期初库存",
          checked: true
        },
        {
          prop: "periodInStock",
          label: "本期入库",
          checked: true,
          children: [
            {
              prop: "directIn",
              label: "直进",
              checked: true
            },
            {
              prop: "putIn",
              label: "入库",
              checked: true
            },
            {
              prop: "callIn",
              label: "调入",
              checked: true
            },
            {
              prop: "back",
              label: "归还",
              checked: true
            },
            {
              prop: "returnStore",
              label: "退库",
              checked: true
            }
          ]
        },
        {
          prop: "periodOutStock",
          label: "本期出库",
          checked: true,
          children: [
            {
              prop: "directOut",
              label: "直出",
              checked: true
            },
            {
              prop: "putOut",
              label: "出库",
              checked: true
            },
            {
              prop: "callOut",
              label: "调出",
              checked: true
            },
            {
              prop: "borrow",
              label: "借用",
              checked: true
            },
            {
              prop: "loss",
              label: "报损",
              checked: true
            },
            {
              prop: "returnGoods",
              label: "退货",
              checked: true
            }
          ]
        },
        {
          prop: "endStock",
          label: "期末库存",
          checked: true
        }
      ], // 表格表头
      tableData: [] // 表格数据
    };
  }
};
</script>

<style lang="scss">
.msg {
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #999;
}
</style>
