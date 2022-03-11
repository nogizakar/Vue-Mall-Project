<template>
  <div class="nav-bar">
    <!-- 左中右三个具名插槽分别控制 -->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
}

.left {
  width: 60px;
}

.right {
  width: 60px;
}

.center {
  flex: 1;
}
</style>