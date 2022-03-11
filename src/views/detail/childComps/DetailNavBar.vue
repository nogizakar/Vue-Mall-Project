<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <img class="back" @click="backClick" slot="left" src="~assets/img/common/back.svg" alt="" />
      <div slot="center" class="title">
        <div
          class="title-item"
          v-for="(item, index) in titles"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
// 导入子组件
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  props: {
    titles: {
      type: Array,
      default() {
        return ["商品", "参数", "评论", "推荐"];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },
  methods: {
      titleClick(index) {
          this.currentIndex = index;
          // 发送消息提示切换
          this.$emit("titleClick", index);
      },
      backClick() {
          this.$router.back();
      }
  }
};
</script>

<style scoped>
.back {
  margin-top: 12px;
}

.title {
  display: flex;
  padding: 0 20px;
}

.title-item {
  flex: 1;
  font-size: 14px;
}

.title-item.active {
  color: var(--color-high-text);
}
</style>