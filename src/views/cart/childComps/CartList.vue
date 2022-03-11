<template>
  <div class="cart-list-wrap">
    <CartListItem :cartList="cartList" />
  </div>
</template>

<script>
// 仅仅是一个取出购物车中商品的vue,具体展示层是CartListItem，好处是单条商品显示样式方便修改
import CartListItem from "./CartListItem.vue";
export default {
  name: "CartList",
  components: {
    CartListItem,
  },
  computed: {
    // 取出购物车中所有商品
    cartList() {
      return this.$store.state.cartList;
    },
  },
};
</script>

<style scoped>
.cart-list-wrap {
  position: relative;
  top: 44px;
  bottom: 89px;
  background-color: #fff;
}
</style>