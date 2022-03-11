<template>
  <div id="app">
    <!-- 缓存组件，排除detail -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <!-- 主tab选项卡组件 -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabbar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
/* 导入基础样式 */
@import "assets/css/base.css";
</style>
