<template>
  <wl-container>
    <div class="suitcase-time-box">
      <h3 class="suitcase-time-title">
        计算到期时间：
        <span class="msg">输入任意两个值计算出另外一个值</span>
      </h3>
      <el-form label-width="120px" size="medium">
        <el-form-item label="开始时间：">
          <el-date-picker
            v-model="startTime"
            @change="handleStartChange"
            type="date"
            placeholder="选择开始日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="保质期：">
          <el-input-number
            v-model="num"
            @change="handleShelfLifeChange"
            :min="0"
            label="请输入天数"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
            v-model="endTime"
            @change="handleEndChange"
            type="date"
            placeholder="选择结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handelTime()">计 算</el-button>
          <el-button @click="handleReset()">重 置</el-button>
        </el-form-item>
        <el-form-item>
          计算结果是：
          <span class="result">{{ result }}</span>
        </el-form-item>
      </el-form>
    </div>
  </wl-container>
</template>

<script>
import { Time } from "wl-core";

export default {
  name: "suitcase-time",
  data() {
    return {
      startTime: "",
      num: 0,
      endTime: "",
      result: ""
    };
  },
  methods: {
    // 开始时间修改计算其他时间
    /* handleStartChange(val) {
      return;
      if (!val) return;
      if (this.num) {
        let _time = new Time(val);
        this.endTime = _time.add(this.num, "day");
        return;
      }
      if (this.endTime) {
        let _time = new Time(this.endTime);
        this.num = _time.diff(val, "day");
      }
    },
    // 保质期修改计算其他时间
    handleShelfLifeChange(val) {
      return;
      if (!val) return;
      if (this.startTime) {
        let _time = new Time(this.startTime);
        this.endTime = _time.add(val, "day");
        return;
      }
      if (this.endTime) {
        let _time = new Time(this.endTime);
        this.startTime = _time.subtract(val, "day");
      }
    },
    // 结束时间修改计算其他时间
    handleEndChange(val) {
      return;
      if (!val) return;
      if (this.startTime) {
        let _time = new Time(val);
        this.num = _time.diff(this.startTime, "day");
      }
      if (this.num) {
        let _time = new Time(val);
        this.startTime = _time.subtract(this.num, "day");
        return;
      }
    }, */
    // 计算时间
    handelTime() {
      this.result = "";
      if (this.startTime && this.num && this.endTime) {
        this.$message("请不要全部输入");
        return;
      }
      // 计算结束时间
      if (this.startTime && this.num) {
        let _time = new Time(this.startTime);
        this.endTime = _time.add(this.num, "day").format("YYYY-MM-DD");
        this.result = this.endTime;
        return;
      }
      // 计算时间间隔
      if (this.startTime && this.endTime) {
        let _time = new Time(this.endTime);
        this.num = _time.diff(this.startTime, "day");
        this.result = this.num;
        return;
      }
      // 计算开始时间
      if (this.num && this.endTime) {
        let _time = new Time(this.endTime);
        this.startTime = _time.subtract(this.num, "day").format("YYYY-MM-DD");
        this.result = this.startTime;
        return;
      }
    },
    // 重置
    handleReset() {
      this.startTime = "";
      this.num = 0;
      this.endTime = "";
    }
  }
};
</script>

<style lang="scss">
.suitcase-time-box {
  margin: 0 auto;
  padding: 25px;

  > .suitcase-time-title {
    margin-bottom: 20px;
    font-weight: 600;
    color: #333;
    > .msg {
      color: red;
    }
  }

  .result {
    font-weight: 600;
    color: red;
  }
}
</style>
