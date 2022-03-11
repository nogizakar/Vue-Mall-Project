<template>
  <div class="detail">
    <detail-nav-bar ref="nav" class="detail-nav" @titleClick="titleClick" />
    <scroll class="content" ref="scroll" @scroll="contentScroll">
      <!-- 轮播图 -->
      <detail-swiper :images="topImages"></detail-swiper>
      <!-- 基础 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 详情 -->
      <detail-goods-info
        :detailInfo="detailInfo"
        @imgLoaded="imgLoaded"
      ></detail-goods-info>
      <!-- 参数 -->
      <detail-param-info :paramInfo="paramInfo" ref="param" />
      <!-- 评论 -->
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <!-- 推荐 -->
      <goods-list :goods="goodsList" ref="recommend" />
    </scroll>
    <DetailBotBar @addCart="addCart" />
    <back-top @click.native="backTop" v-show="this.showBackTop" />
    <!-- toast普通方式封装, 后续插件方式封装无需显示使用 -->
    <!-- <toast :msg="msg" :isShow="isShow" /> -->
  </div>
</template>

<script>
// 导入组件
import DetailNavBar from "./childComps/DetailNavBar.vue";
import Scroll from "components/common/scroll/Scroll";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBotBar from "./childComps/DetailBotBar.vue";

import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

// import Toast from 'components/common/toast/Toast'  // 普通封装toast后续插件封装
// 导入network请求以及封装class
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      goodsList: [],
      themeTops: [], // 各区域位置

      showBackTop: false,
      currentIndex: 0, // 导航标题索引
      // toast普通封装需要
      // msg: '',
      // isShow: false
    };
  },
  components: {
    DetailNavBar,
    Scroll,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBotBar,
    GoodsList,
    BackTop,
    // Toast
  },
  created() {
    // 1.取出iid
    // // 创建在前，挂载在后，以后着重区别
    // this.iid = this.$route.query.iid;
    // console.log("create iid");
  },
  mounted() {
    // console.log(this.$refs.scroll);

    this.iid = this.$route.query.iid;
    console.log("mounted iid");
    //2.发送商品请求
    this.__getDetail(this.iid);
    //3.发送推荐请求
    this.__getRecommend();
  },
  methods: {
    __getDetail(iid) {
      //向后台请求数据
      console.log("getDetail");
      getDetail(iid).then((res) => {
        //1.获取数据
        const data = res.result;
        console.log(res);
        // 2.获取顶部的图片数据
        this.topImages = data.itemInfo.topImages;
        // 3.获取商品信息并封装成对象
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 4.获取店铺信息,封装成对象
        this.shop = new Shop(data.shopInfo);
        // 5.获取商品详情信息
        this.detailInfo = data.detailInfo;

        // 6.保存参数信息,封装成对象
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 7.保存评论数据
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    __getRecommend() {
      console.log("getRecommend");
      getRecommend().then((res) => {
        this.goodsList = res.data.list;
      });
    },
    // 滚动事件
    contentScroll(position) {
      // 控制返回按钮显示
      this.showBackTop = -position.y > 500;
      // 浏览到对应位置和导航条切换
      const p_y = -position.y;
      let _len = this.themeTops.length;
      for (let i = 0; i < _len - 1; i++) {
        if (
          this.currentIndex !== i &&
          p_y >= this.themeTops[i] &&
          p_y <= this.themeTops[i + 1]
        ) {
          this.currentIndex = i; // 保存索引
          this.$refs.nav.currentIndex = this.currentIndex; // 更新子组件索引
        }
      }
    },
    // 详情栏目加载后，记住每个栏目的位置
    imgLoaded() {
      this.$refs.scroll.refresh();
      this.themeTops = [];
      this.themeTops.push(0);
      // 依次是参数、评论、推荐
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);
    },
    titleClick(index) {
      // y为负值
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 200);
    },
    backTop() {
      // console.log("backtop");
      this.$refs.scroll.scrollTo(0, 0); // 暂时就这么用
    },
    addCart() {
      console.log("addCart");
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.discount = this.goods.discount;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(this.goods);
      //将商品添加到购物车里，直接通过mutations
      // this.$store.commit("addCart", product);
      // 通过actions
      this.$store.dispatch("addCart", product).then((res) => {
        console.log(res);
        // toast展示提示信息,普通方式封装
        // this.msg = res;
        // this.isShow = true;
        // setTimeout(() => {
        //   this.isShow = false;
        // }, 2000);
        // toast 插件方式封装
        this.$toast.show(res, 2000);
      });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  /* 暂时绝对定位脱标控制wrapper高度 */
  position: absolute;
  height: calc(100% - 44px);
  /* top: 44px;
  bottom: 58px; */
}
</style>