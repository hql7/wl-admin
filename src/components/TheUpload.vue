<template>
  <section>
    <el-row type="flex">
      <el-popover placement="bottom" trigger="hover">
        <span slot="reference" class="filename">
          <span v-if="fileLength > 0">{{
            files[fileLength - 1]["filename"]
          }}</span>
        </span>
        <el-row v-for="(file, index) in files" :key="file.id" type="flex">
          <el-col style="height: 30px;">{{ file.filename }}</el-col>
          <i class="el-icon-close" @click="removeClick(file, index)"></i>
        </el-row>
      </el-popover>
      <el-col>
        <input
          type="file"
          @change="uploads"
          ref="upload"
          style="display: none;"
          multiple
        />
        <slot
          name="button"
          v-if="$slots.button"
          @click.prevent="uploadFile"
        ></slot>
        <el-button
          v-else
          type="text"
          icon="el-icon-ali-upload iconfont"
          @click.prevent="uploadFile"
          class="btn"
          :disabled="disabled || readonly"
          >上传附件</el-button
        >
        <el-button
          v-if="fileLength > 0"
          type="text"
          @click="checkClick"
          :disabled="disabled"
          >查看({{ fileLength }})</el-button
        >
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" align="center">
      <ft-table :data="files" :columns="columns" height="50vh">
        <template slot-scope="scope" slot="operation">
          <el-button type="text" @click="checkFile(scope.row)">查看</el-button>
          <el-button type="text" @click="downloadFile(scope.row)"
            >下载</el-button
          >
        </template>
      </ft-table>
      <el-dialog :visible.sync="maskVisible" append-to-body align="center">
        <el-image :src="file.trackerUrl + file.path"></el-image>
      </el-dialog>
    </el-dialog>
  </section>
</template>

<script>
/**
 * des 上传文件 (多文件上传)
 * @slot button 上传显示的标签
 * @props showFilename 是否显示附件 默认为true
 * @props lastSn 上次上传的sn码
 * @props uploadUrl 上传路径 /user/file/uploads
 * @props removeUrl 删除路径 /user/file/removeById/
 * @props readonly 是否只读
 * @event sn(sn): 返回sn
 * @event change(files)
 */
import axios from "axios";
export default {
  name: "FtUpload",
  props: {
    showFilename: {
      type: Boolean,
      default: true
    },
    lastSn: {
      type: String,
      default: ""
    },
    uploadUrl: {
      type: String,
      default: "/user/file/uploads"
    },
    removeUrl: {
      type: String,
      default: "/user/file/removeById/"
    },
    queryBySnUrl: {
      type: String,
      default: "/user/file/queryBySn/"
    },
    columns: {
      type: Array,
      default: function() {
        return [
          {
            prop: "filename",
            label: "附件名称",
            formatter: function(row) {
              let name = row.filename.split(".");
              name.pop();
              return name.join("");
            }
          },
          {
            prop: "fileType",
            label: "附件类型",
            formatter: function(row) {
              return row.filename.split(".").pop();
            }
          },
          {
            prop: "filesize",
            label: "文件大小",
            formatter: function(row) {
              return row.filesize + "KB";
            }
          },
          { prop: "operation", label: "操作", slot: true, align: "center" }
        ];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      files: [],
      file: {},
      dialogVisible: false,
      maskVisible: false
    };
  },
  computed: {
    fileLength() {
      return this.files.length;
    }
  },
  mounted() {
    this.files = [];
    // if (this.lastSn) {
    //   this.getFileBySn(this.lastSn);
    // }
  },
  methods: {
    // 根据sn码查询文件
    getFileBySn(sn) {
      if (!sn || !this.showFilename) return;
      axios({ url: this.queryBySnUrl + sn })
        .then(result => {
          let res = result.data;
          if (res.code === "0000") {
            this.files = res.data;
            this.$emit("change", JSON.parse(JSON.stringify(this.files)));
          } else {
            this.$message({ type: "error", message: res.message });
          }
        })
        .catch(err => {
          this.$message({ type: "error", message: "查询失败" });
        });
    },
    uploadFile() {
      this.$refs.upload.click();
    },
    uploads(e) {
      if (e.target.files < 1) return;
      let data = new FormData();
      let sn = this.newSn || this.lastSn;
      if (sn) data.append("sn", sn);
      for (let file of e.target.files) {
        data.append("file", file);
      }

      axios({
        url: this.uploadUrl,
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        data
      })
        .then(result => {
          let res = result.data;
          if (res.code === "0000") {
            let sn = res.data[0].sn;
            this.$emit("sn", sn);
            this.$message({ type: "success", message: "上传成功" });
            this.getFileBySn(sn);
          } else {
            this.$message({ type: "error", message: res.message });
          }
        })
        .catch(err => {
          this.$message({ type: "error", message: "上传失败" });
        });
    },
    removeClick(file, index) {
      if (this.disabled) return;
      this.$confirm(`即将删除${file.filename}文件, 是否继续?`, "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.removeFile(this.removeUrl + file.id, index);
      });
    },
    removeFile(url, index) {
      axios({ url })
        .then(result => {
          let res = result.data;
          if (res.code === "0000") {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            this.files.splice(index, index + 1);
            this.$emit("change", JSON.parse(JSON.stringify(this.files)));
          } else {
            this.$message({
              type: "error",
              message: res.message
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            type: "error",
            message: "删除失败"
          });
        });
    },
    checkClick() {
      this.dialogVisible = true;
    },
    checkFile(file) {
      this.maskVisible = true;
      this.file = file;
    },
    maskClick() {},
    downloadFile(file) {
      let a = document.createElement("a");
      a.href = file.trackerUrl + file.path;
      a.download = file.filename;
      a.click();
      a = undefined;
    }
  },
  watch: {
    lastSn: function(newValue) {
      if (newValue) this.getFileBySn(newValue);
    }
  },
  beforeDestroy() {
    this.files = null;
  }
};
</script>

<style lang="scss" scoped>
.btn {
  min-width: 98px;
  font-size: 14px;
  padding: 8px;
  height: 32px;
  margin-left: 0;
  margin-right: 13px;
}

.el-dialog__wrapper /deep/ .el-dialog__header {
  background: #0079e8 !important    ;
  height: 45px;
}
.el-dialog__wrapper /deep/ .el-dialog__header /deep/.el-dialog__title,
.el-dialog__wrapper /deep/ .el-dialog__header /deep/.el-dialog__close {
  color: #fff;
}
.el-dialog__wrapper /deep/ .el-dialog__header /deep/.el-dialog__headerbtn {
  top: 13px;
}
.filename {
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
  overflow: auto;
}
</style>
