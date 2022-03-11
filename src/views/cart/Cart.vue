<template>
  <div class="">
    <!-- 导航 -->
    <NavBar class="cart-nav">
      <div slot="center">购物车({{ productNum }})</div>
    </NavBar>
    <!-- 购物车条目 -->
    <CartList />
    <CartBotBar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartBotBar from "./childComps/CartBotBar.vue";
import CartList from "./childComps/CartList.vue";

import { mapGetters } from "vuex";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBotBar,
  },
  computed: {
    ...mapGetters({ productNum: "cartNum" }),
  },
};
</script>

<style scoped>
.cart-nav {
  color: #fff;
  background-color: var(--color-high-text);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* // z-index: 1; */
}
</style>