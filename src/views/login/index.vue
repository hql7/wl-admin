<template>
  <wl-container class="wlui-login" :use-scroll="false">
    <div class="login-form">
      <div class="login-form-img"></div>
      <div class="login-form-content">
        <h2 class="login-form-title">复杂前端组件解决方案</h2>
        <el-form
          :model="login_form"
          :rules="login_rules"
          class="login-box"
          ref="login-form"
          @keyup.enter.native="submitLogin('login-form')"
        >
          <el-form-item prop="act">
            <div class="ipt-box">
              <label class="item-label">
                <i class="iconfont icon-yonghu1"></i>
              </label>
              <input
                class="item-ipt"
                type="text"
                v-model="login_form.act"
                placeholder="请输入账号"
              />
            </div>
          </el-form-item>
          <el-form-item prop="pass">
            <div class="ipt-box">
              <label class="item-label">
                <i class="iconfont icon-password1"></i>
              </label>
              <input
                class="item-ipt"
                type="password"
                v-model="login_form.pass"
                placeholder="请输入密码"
              />
            </div>
          </el-form-item>
          <el-form-item prop="code">
            <div class="ipt-box ipt-box-m">
              <label class="item-label">
                <i class="iconfont icon-yanzhengma"></i>
              </label>
              <input
                type="text"
                v-model="login_form.code"
                placeholder="请输入验证码"
                class="item-ipt item-ipt-yzm"
              />
            </div>
            <div class="ipt-box ipt-box-s">
              <img :src="yzm_code" alt="验证码" class="yzm-code" />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="large"
              @click="submitLogin('login-form')"
              class="login-btn"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </wl-container>
</template>

<script>
import { mapActions } from "vuex";
import { loginApi } from "@/api/login"; // 导入接口
import { localSet } from "@/util/storage";

export default {
  data() {
    return {
      login_form: {
        act: "weilan",
        pass: "weilan",
        code: "v9am"
      }, // 登录表单
      login_rules: {
        act: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }, // 登录验证规则
      yzm_code: require("../../assets/images/yzm.png")
    };
  },
  methods: {
    // 登录表单提交
    submitLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          loginApi().then(({ data }) => {
            if (data.code === 200) {
              localSet(this.GLOBAL.project_key, data.data);
              this.setToken(data.data);
              this.$router.push("/index");
            }
          });
        } else {
          return false;
        }
      });
    },
    ...mapActions("app", ["setToken"])
  }
};
</script>

<style lang="scss">
.wlui-login {
  background: #f1939c;

  .login-form {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 810px;
    height: 460px;
    border-radius: 4px;
    // box-shadow: 2px 2px 5px rgba(28, 28, 28, 0.2),
    //   -2px -2px 5px rgba(28, 28, 28, 0.2);
    box-shadow: 0 0 5px 6px rgba(68, 67, 67, 0.2);
    background: #f7f7f7;
    overflow: hidden;

    > .login-form-img {
      width: 345px;
      background: url("../../assets/images/wlui-logo.jpg") center no-repeat;
      background-size: 100% 100%;
    }
  }

  .login-form-content {
    flex: 1;
    // background-color: #fff;
    padding: 10px 7px;
    box-sizing: border-box;

    > .login-form-title {
      line-height: 64px;
      font-size: 26px;
      color: #333;
      padding-left: 35px;
      border-bottom: 1px dashed #e6e6e6;
      margin-bottom: 28px;
    }
  }

  .login-box {
    padding: 0 35px;
    box-sizing: border-box;
    > .el-form-item {
      margin-bottom: 28px;
    }

    .ipt-box-m {
      width: 200px;
      float: left;
    }

    .ipt-box-s {
      width: 150px;
      float: right;
    }
  }

  .ipt-box {
    display: flex;
    height: 50px;
    line-height: 48px;
    border-radius: 5px;
    border: 1px solid #ddd;
    box-shadow: 5px 5px 10px rgba(202, 202, 202, 0.4) inset,
      -5px -5px 10px rgba(202, 202, 202, 0.4) inset;
    box-sizing: border-box;
    &:hover {
      box-shadow: 5px 5px 10px rgba(64, 158, 255, 0.4) inset,
        -5px -5px 10px rgba(64, 158, 255, 0.4) inset;
    }

    .item-label {
      width: 60px;
      height: 48px;
      line-height: 48px;
      color: #cccccc;
      text-align: center;
    }
    .item-ipt {
      flex: 1;
      flex-grow: 1;
      flex-shrink: 1;
      height: 48px;
      background-color: transparent;
      padding-left: 10px;
      border: none;
      box-sizing: border-box;
    }
    .item-ipt-yzm {
      width: calc(100% - 60px);
    }
    .yzm-code {
      width: 100%;
    }
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    font-size: 20px;
    letter-spacing: 10px;
  }
}
</style>
