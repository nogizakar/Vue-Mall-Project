<template>
  <div class="detail-swiper">
      <swiper>
          <swiper-item v-for="(item, index) in images" :key="index" class="swiper-item">
              <img :src="item" alt="">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
// 导入子组件
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
      images: {
          type: Array,
          default() {
              return [];
          }
      }
    }
};
</script>

<style scoped>
  .swiper-item {
    height: 300px;
  }
</style>