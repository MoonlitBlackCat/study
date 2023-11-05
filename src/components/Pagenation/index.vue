<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">...</button>

    <button
      v-for="(page, index) in pageShow"
      :key="index"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">...</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == total }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">{{ pageNo }}页/共{{ total }}条</button>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "Pagenation",
  props: ["pageNo", "pageSize", "total", "continues"],

  setup(props) {
    //向上取整，总页数
    const totalPage = computed(() => Math.ceil(props.total / props.pageSize));

    // 分页器中间逻辑
    const startNumAndEndNum = computed(() => {
      let start = 0,
        end = 0;
      // 中间的页数比总页数还大
      if (props.continues > totalPage.value) {
        start = 1;
        end = totalPage.value;
      } else {
        start = props.pageNo - parseInt(props.continues / 2);
        end = props.pageNo + parseInt(props.continues / 2);
        //上面的计算方法start可能会为负数，这里纠正
        if (start <= 0) {
          start = 1;
          end = props.continues;
        }
        if (end > totalPage.value) {
          start = totalPage.value - props.continues + 1;
          end = totalPage.value;
        }
      }
      return { start, end };
    });

    //分页器中间数据展示
    const pageShow = computed(() => {
      let pageAttr = [];
      for (
        let i = startNumAndEndNum.value.start;
        i <= startNumAndEndNum.value.end;
        i++
      ) {
        pageAttr.push(i);
      }
      return pageAttr;
    });

    return { totalPage, startNumAndEndNum, pageShow };
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: skyblue;
      color: #fff;
    }
  }
}

</style>
