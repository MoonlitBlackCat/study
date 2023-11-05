<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <el-form
      ref="formRef"
      :model="formElement"
      :rules="rules"
      class="register"
      label-width="100px"
    >
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <!-- 手机号 -->
      <el-form-item label="手机号:" prop="phone" class="content">
        <el-input
          placeholder="请输入你的手机号"
          v-model.number="formElement.phone"
          type="text"
          class="input"
        />
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item label="验证码:" prop="code" class="content">
        <el-input
          placeholder="请输入验证码"
          v-model="formElement.code"
          type="text"
          class="input"
        />
        <button style="width: 100; height: 30px" @click.prevent="getCode">
          <!-- <button style="width: 100; height: 30px" @click="getCode" type="button"> -->
          获取验证码
        </button>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="登录密码:" prop="password1" class="content">
        <el-input
          placeholder="请输入密码"
          v-model="formElement.password1"
          type="password"
          class="input"
        />
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item label="确认密码:" prop="password2" class="content">
        <el-input
          placeholder="请再次输入密码"
          v-model="formElement.password2"
          type="password"
          class="input"
        />
      </el-form-item>
      <!-- 勾选 -->
      <el-form-item prop="checkbox" style="padding-left: 380px">
        <el-checkbox-group v-model="formElement.checkbox" style="margin-top: 0">
          <el-checkbox
            label="同意协议并注册《尚品汇用户协议》"
            :checked="agree"
            name="m1"
          />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item class="btn">
        <el-button @click="userRegister" style="margin: 0 320px">
          完成注册
        </el-button>
        <el-button @click="submitForm(formRef)" style="margin: 0 320px">
          完成注册
        </el-button>
      </el-form-item>
    </el-form>

    <!-- <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone" />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code" />
        <button style="width: 100; height: 38px" @click="getCode">
          获取验证码
        </button>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password1"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="password2"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" :checked="agree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div> -->

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
import router from "@/router";
export default {
  name: "Register",
  setup() {
    const store = useUserStore();

    const phone = ref("");
    const code = ref("");
    const password1 = ref("");
    const password2 = ref("");
    const agree = ref(true);

    //获取验证码
    function getCode() {
      //简单判断一下要有phone才能请求,直接将验证码填上了
      formElement.phone &&
        store
          .getCode(formElement.phone)
          .then(() => {
            formElement.code = store.code;
          })
          .catch((err) => {
            return Promise.reject(new Error(err.message));
          });
    }

    //用户注册
    function userRegister() {
      formElement.phone &&
        formElement.code &&
        formElement.password1 === formElement.password2 &&
        store
          .userRegister({
            phone: formElement.phone,
            code: formElement.code,
            password: formElement.password1,
          })
          .then(() => {
            router.push("/login");
          })
          .catch((err) => {
            alert(err.message);
          });
    }

    //表单验证
    const formRef = ref(null);

    //表单中需要验证的元素信息
    // 需要验证的formitem中用prop起名，和这个表单信息相对相应
    const formElement = reactive({
      phone: "",
      code: "",
      password1: "",
      password2: "",
      checkbox: [],
    });

    //规则
    const rules = reactive({
      phone: [
        { required: true, message: "请输入手机号" },
        { type: "number", message: "手机号不合规范" },
        {
          pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          message: "请输入正确的手机号码",
          trigger: "blur",
        },
      ],
      code: [
        { required: true, message: "请输入验证码" },
        { len: 6, message: "长度为6位", trigger: "blur" },
      ],
      password1: [
        { required: true, message: "请输入密码" },
        {
          pattern: /^[0-9A-Za-z]{8,20}$/,
          message: "密码格式错误",
          trigger: "blur",
        },
      ],
      password2: [
        { required: true, message: "请确认密码" },
        {
          validator: (rule, value, callback) => {
            if (value != formElement.password1)
              callback(new Error("密码与上面输入不符"));
            else {
              callback();
            }
          },
          trigger: "blur",
        },
      ],
      checkbox: [
        {
          required: true,
          message: "请确认协议",
          trigger: "change",
        },
      ],
    });

    const submitForm = async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    return {
      store,
      phone,
      code,
      getCode,
      password1,
      password2,
      agree,
      userRegister,
      formRef,
      formElement,
      submitForm,
      rules,
    };
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      .el-form-item__error {
        left: 300px;
      }

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }
      .label {
        margin-right: 5px;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }
      .input {
        width: 250px;
        margin-top: 0;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>