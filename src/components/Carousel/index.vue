<template>
  <div class="swiper" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
  </div>
</template>

<script>
// import Swiper JS
import Swiper, { Navigation, Pagination, Scrollbar } from "swiper";
import { nextTick, ref, watch } from "vue";
// Import Swiper styles
import "swiper/swiper-bundle.min.css";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

export default {
  name: "Carousel",
  props: ["list"],
  setup(props) {
    //获取dom节点
    const mySwiper = ref(null);
    //监听轮播图数据，创建swiper实例
    watch(
      () => props.list,
      (newVal, oldVal) => {
        //这里使用swiperElement元素后，floor中的轮播图必须引入store.getFloorList
        const swiperElement = mySwiper.value;
        // 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。
        nextTick(() => {
          var mySwiper = new Swiper(".swiper", {
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
            modules: [Navigation, Pagination, Scrollbar],
          });
        });
      },
      { immediate: true }
    );

    return { mySwiper };
  },
};
</script>

