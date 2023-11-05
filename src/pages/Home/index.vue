<template>
  <!-- <button @click="store.add">点我加一</button>
  <span>仓库的数据{{ store.count }}</span>
  <button>点我减一</button> -->
  <TypeNav />
  <ListContainer />
  <Recommend />
  <Rank />
  <Like />
  <Floor v-for="floor in store.floorList" :key="floor.id" :list="floor" />
  <Brand />
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { useHomeStore, useUserStore } from "@/stores/index";
import { onMounted } from "vue";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  setup() {
    const store = useHomeStore();
    const userStore = useUserStore();

    // console.log(store);
    onMounted(() => {
      //获取floor的数据
      store.getFloorList();
    });
    return {
      store,
    };
  },
};
</script>

<style>
</style>