<template>
  <div class="tab-bar-item" @click="itemClick">
    <!-- 图标 -->
    <div v-if="!isAcitve"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- 文字提示 -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    link: String, // 接收路径
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isAcitve: true,
      path: this.link, // 保存到组件数据
    };
  },
  computed: {
    isAcitve() {
      // console.log("---")
      // console.log(this.path);  // 路由路径
      // console.log(this.$route.path);  // 实际路径
      // 判断路由路径是组件路径
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      // js三元运算符,控制激活样式
      return this.isAcitve ? { color: this.activeColor } : {};
    },
  },
  methods: {
    // 点击切换组件
    itemClick() {
      this.$router.replace(this.path); // 这种模式无法退回
      // this.$router.push(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 12px;
}
.tab-bar-item img {
  width: 29px;
  height: 29px;
}

.active {
  color: red;
  /* color: @activeColor;  暂时没弄懂  */
}
</style>