<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 未登录 -->
          <p v-if="!store.userInfo.name">
            <span>请</span>&nbsp;
            <router-link to="/login">登录</router-link>&nbsp;
            <router-link class="refister" to="/register">免费注册</router-link>
          </p>
          <!-- 登录 -->
          <p v-if="store.userInfo.name">
            <span>欢迎您</span>&nbsp; <a>{{ store.userInfo.name }}</a
            >&nbsp;
            <a class="refister" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myOrder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { bus } from "@/bus";
import router from "@/router";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores";

export default {
  name: "Header",
  setup() {
    const route = useRoute();
    const store = useUserStore();

    //绑定搜索框，设置为params参数
    const keyword = ref("");
    //跳转search页面，顺便带上路由参数
    function goSearch() {
      //字符串形式
      // router.push('/search/' + keyword.value + '?k=' + keyword.value.toUpperCase())
      // 模版字符串
      // router.push(`/search/${keyword.value}?k=${keyword.value.toUpperCase()}`)
      // 对象写法 需要给路由起个名字

      //如果有query参数,也加上
      let location = {
        name: "search",
        params: { keyword: keyword.value },
      };
      location.query = route.query;
      router.push(location);
    }

    function logout() {
      store.userLogout().then(() => {
        router.push("/home");
      });
    }
    //通过全局事件总线清除关键字
    onMounted(() => {
      bus.on("clear", () => {
        keyword.value = "";
      });
    });
    //组件摧毁前解绑全局事件总线
    onBeforeUnmount(() => {
      bus.off("clear");
    });

    return {
      goSearch,
      keyword,
      store,
      logout,
    };
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>

