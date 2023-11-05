<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table
          class="order-item"
          v-for="order in myOrder.data.records"
          :key="order.id"
        >
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{ order.createTime }} 订单编号：{{ order.outTradeNo }}
                  <span class="pull-right delete"
                    ><img src="../images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cart,index) in order.orderDetailList" :key="cart.id">
              <td width="60%">
                <div class="typographic">
                  <img :src="cart.imgUrl" style="width: 75px; height: 75px" />
                  <a href="#" class="block-text">{{ cart.skuName }}</a>
                  <span>x1</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <td :rowspan="order.orderDetailList.length" v-if="index === 0" width="8%" class="center">{{ order.consignee }}</td>
              <td :rowspan="order.orderDetailList.length" v-if="index === 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{ order.totalAmount }}.00</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td :rowspan="order.orderDetailList.length" v-if="index === 0" width="8%" class="center">
                <a href="#" class="btn">{{ order.orderStatusName }} </a>
              </td>
              <td :rowspan="order.orderDetailList.length"  v-if="index === 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <!-- 分页器 -->
        <Pagenation
            :pageNo="page"
            :pageSize="limit"
            :total="myOrder.data.total"
            :continues="5"
            @getPageNo="getPageNo"
          />
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, reactive, ref } from "vue";

export default {
  name: "myOrder",
  setup() {
    const API = inject("API");

    //当前第几页
    const page = ref(1);
    // 每页展示个数
    const limit = ref(3);
    const myOrder = reactive({
      data: {},
    });

    //分页器逻辑函数
    function getPageNo(pageNo) {
      page.value = pageNo
      getData()
    }
    //获取订单数据
    function getData() {
      API.reqMyOrderList(page.value, limit.value).then((res) => {
        if (res.code === 200) {
          myOrder.data = res.data;
        }
      });
    }

    onMounted(() => {
      getData();
    });

    return {
      page,
      limit,
      myOrder,
      getPageNo
    };
  },
};
</script>

<style>
</style>