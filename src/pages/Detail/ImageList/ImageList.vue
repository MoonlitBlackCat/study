<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(slide, index) in skuImageList"
        :key="slide.id"
      >
        <img
          :src="slide.imgUrl"
          :class="{ active: skuImageList.isDefault == index}"
          @click="changeDefault(index)"
        />
      </div>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import { nextTick, watch } from "vue";
import { bus } from '@/bus';

export default {
  name: "ImageList",
  props: ["skuImageList"],
  setup(props) {
    watch(
      () => props.skuImageList,
      (newVal, oldVal) => {
        // 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。
        nextTick(() => {
          new Swiper(".swiper", {
            //每页展示几个
            slidesPerView: 3,
            // 每次划走几个
            slidesPerGroup: 1,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            modules: [Navigation],
          });
        });
      },
      { immediate: true }
    );
    //通过全局事件总线给兄弟组件发送当前选中图片的索引值
    function changeDefault(index) {
      props.skuImageList.isDefault = index
      bus.emit('changeDefault',index)
    }
    
    return {changeDefault};
  },
};
</script>

<style lang="less" scoped>
.swiper {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>