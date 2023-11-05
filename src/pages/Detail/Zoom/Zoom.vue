<template>
  <div class="spec-preview">
    <img :src="skuImageList[currentIndex].imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="skuImageList[currentIndex].imgUrl" ref="big" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { bus } from "@/bus";
export default {
  name: "Zoom",
  props: {
    skuImageList: {
      type: Object,
      default: () => [{}],
    },
  },
  setup(props) {
    const currentIndex = ref("0");
    const mask = ref(null);
    const big = ref(null);
    // 因为pinia仓库中更新了数据，但组件中依旧是从pinia中获取旧数据，
    // 是没有正确相应pinia状态更新，所以使用了计算属性来更新pinia的状态
    //但是 这是计算属性，所以数据没有返回来的时候页面渲染依然是空白
    const skuImageList = computed(() => {
      return props.skuImageList;
    });

    onMounted(() => {
      bus.on("changeDefault", (index) => {
        currentIndex.value = index;
      });
    });

    // 放大器逻辑
    function handler(event) {
      const maskObj = mask.value;
      const bigObj = big.value;
      //offsetX/Y 鼠标相对于父容器的坐标
      // clientX 鼠标相对于浏览器的坐标
      // pageX 鼠标相对于document文档的坐标
      let left = event.offsetX - maskObj.offsetWidth / 2;
      let top = event.offsetY - maskObj.offsetHeight / 2;
      //限制边界
      if (left <= 0) left = 0;
      if (left >= event.target.offsetWidth - maskObj.offsetWidth)
        left = event.offsetWidth - maskObj.offsetWidth;
      if (top <= 0) top = 0;
      if (top >= event.target.offsetHeight - maskObj.offsetHeight)
        top = event.target.offsetHeight - maskObj.offsetHeight;
      //修改mask位置
      maskObj.style.left = left + "px";
      maskObj.style.top = top + "px";

      // 修改放大器位置
      bigObj.style.left = -2 * left+'px'
      bigObj.style.top = -2 * top+'px'
    }
    return { skuImageList, currentIndex, mask, handler, big };
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>