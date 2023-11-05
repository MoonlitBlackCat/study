<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in store.cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @change="cart.isChecked = !cart.isChecked"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change', $event.target.value, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', +1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck && store.cartInfoList.length > 0"
          @change="clickChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useDetailStore, useshopCartStore } from "@/stores";
import { debounce } from "lodash";

export default {
  name: "ShopCart",
  setup() {
    const store = useshopCartStore();
    const detailStore = useDetailStore();

    onMounted(() => {
      getDate();
    });

    //获取购物车数据
    function getDate() {
      store.getCartList();
    }
    //计算购买产品的总价
    const totalPrice = computed(() => {
      let sum = null;
      store.cartInfoList.forEach((item) => {
        if (item.isChecked) {
          sum += item.skuPrice * item.skuNum;
        }
      });
      return sum;
    });

    //全选
    const isAllCheck = computed(() => {
      //every遍历数组，返回布尔值，所有为true才是真，some满足一个就行
      return store.cartInfoList.every((item) => item.isChecked == 1);
    });

    // 点击全选
    function clickChecked(event) {
      store.cartInfoList.forEach((item) => {
        item.isChecked = event.target.checked ? 1 : 0;
        // item.isChecked = !item.isChecked;
      });
    }
    // 改变数量发送请求 防抖
    const handler = debounce((type, disNum, cart) => {
      console.log(type, disNum, cart);
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          // 判断产品个数大于1
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // //输入不是数字
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - cart.skuNum;
          }
          // disNum = isNaN(disNum) || disNum < 1 ? 0 : parseInt(disNum) - cart.skuNum;
          break;
      }
      detailStore
        .addOrUpdateShopCart(cart.skuId, disNum)
        .then((res) => {
          getDate();
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);

    //删除某一个产品
    function deleteCartById(skuId) {
      store
        .deleteCartListById(skuId)
        .then(() => {
          getDate();
        })
        .catch((err) => {
          console.log(err);
        });
    }

    //#region
    //修改某一个产品勾选状态 似乎已经废弃掉了
    // function updateChecked(skuId,event) {
    //   let isChecked = event.target.checked ?'1':'0'
    //   store.updateCheckedById(skuId,isChecked).then((res) => {
    //     console.log('123');
    //     // getDate()
    //   }).catch((err) => {
    //     console.log(err);
    //   })
    // }
    //#endregion

    //删除全部选中的产品
    function deleteAllCheckedCart() {
      store
        .deleteAllCheckedCart()
        .then(() => {
          getDate();
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    return {
      store,
      totalPrice,
      isAllCheck,
      handler,
      deleteCartById,
      clickChecked,
      deleteAllCheckedCart,
    };
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>