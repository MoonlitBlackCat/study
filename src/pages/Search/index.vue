<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑，带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 属性值的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="attrValue"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangxia': isDesc,
                        'icon-jiantou_xiangshang': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-jiantou_xiangxia': isDesc,
                        'icon-jiantou_xiangshang': isAsc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="goods in store.searchList.goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转的时候要带商品id -->
                    <router-link :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg" />
                    </router-link>
                    <!-- <a href="item.html" target="_blank">
                      </a> -->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>&nbsp;
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagenation
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="store.searchList.total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, watch, watchEffect } from "vue";
import SearchSelector from "./SearchSelector/SearchSelector";
import { useSearchStore } from "@/stores";
import { useRoute } from "vue-router";
import router from "@/router";
import { bus } from "@/bus";

export default {
  name: "Search",
  components: { SearchSelector },

  setup() {
    const store = useSearchStore();
    const route = useRoute();

    //排序颜色的计算属性
    const isOne = computed(() => searchParams.order.indexOf("1") != -1);
    const isTwo = computed(() => searchParams.order.indexOf("2") != -1);
    //排列箭头的计算属性
    const isAsc = computed(() => searchParams.order.indexOf("asc") != -1);
    const isDesc = computed(() => searchParams.order.indexOf("desc") != -1);

    // watchEffect(() => {
    //   console.log(route.query,route.params);
    // });

    //搜索参数设定
    const searchParams = reactive({
      category1Id: "",
      category2Id: "",
      //分类id
      category3Id: "",
      //分类名字
      categoryName: "",
      // 关键字
      keyword: "",
      // 排序1:综合 2:价格
      order: "1:desc",
      // 分页器，表达当前第几页
      pageNo: 1,
      // 表示当前页展示数据的个数
      pageSize: 5,
      // 售卖属性才做带的参数
      props: [],
      // 品牌
      trademark: "",
    });

    //从store获取数据
    function getData() {
      store.getSearchList(searchParams);
    }
    //监听的immediate: true 已经执行了一次
    // onMounted(() => {
    //   getData();
    // });

    //监听route变化，重新请求数据//获取数据
    watch(
      () => route,
      () => {
        searchParams.category1Id = undefined;
        searchParams.category2Id = undefined;
        searchParams.category3Id = undefined;
        //ES6的新语法，可以将参数合并
        Object.assign(searchParams, route.query, route.params);
        getData();
      },
      { deep: true, immediate: true }
    );

    //删除分类面包屑的名字
    function removeCategoryName() {
      //当属性值为空的字符串依旧会吧数据带给服务器，而undefined不会
      searchParams.category1Id = undefined;
      searchParams.category2Id = undefined;
      searchParams.category3Id = undefined;
      searchParams.categoryName = undefined;
      //地址栏也要改
      if (route.params) {
        router.push({ name: "search", params: route.params });
      }
    }

    //删除关键字面包屑的名字 全局事件总线
    function removeKeyword() {
      searchParams.keyword = undefined;
      bus.emit("clear");
      if (route.query) {
        router.push({ name: "search", query: route.query });
      }
    }

    //子传父自定义函数(品牌)
    function trademarkInfo(trademark) {
      searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      getData();
    }

    //删除品牌面包屑的名字
    function removeTrademark() {
      searchParams.trademark = undefined;
      getData();
    }

    //子传父自定义函数(属性值)
    function attrInfo(attr, attrValue) {
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重
      if (searchParams.props.indexOf(props) == -1)
        searchParams.props.push(props);
      getData();
    }

    //删除属性值面包屑的名字
    function removeAttr(index) {
      searchParams.props.splice(index, 1);
      getData();
    }

    //排序操作
    function changeOrder(num) {
      let originOrder = searchParams.order.split(":")[0];
      let originFlag = searchParams.order.split(":")[1];
      //点击同一个，更改顺序
      if (num == originOrder) {
        searchParams.order = `${num}:${originFlag == "desc" ? "asc" : "desc"}`;
      }
      //不同，默认降序
      else {
        searchParams.order = `${num}:desc`;
      }
      getData();
    }

    //自定义事件-获取分页器页数
    function getPageNo(page) {
      searchParams.pageNo = page;
      getData();
    }

    return {
      store,
      searchParams,
      removeCategoryName,
      removeKeyword,
      trademarkInfo,
      removeTrademark,
      attrInfo,
      removeAttr,
      isOne,
      isTwo,
      isAsc,
      isDesc,
      changeOrder,
      getPageNo,
    };
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>