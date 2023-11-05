<template>
  <!-- <h1 v-obj="a"></h1> -->
  <Header></Header>
  <router-view></router-view>
  <Footer v-if="$route.meta.show"></Footer>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useHomeStore } from "@/stores/index";
import { onMounted, ref } from "vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  setup() {
    const store = useHomeStore();

    const a = ref("abc");
    //调用获取数据的函数
    onMounted(() => {
      //  console.log(store);
      store.getCategoryList();
    });

    return {
      a,
    };
  },
};
</script>

<style lang="less" scoped>
</style>