<template>
  <div class="cart-bot-bar">
    <div>
      <input type="checkbox" @click="checkClick" id="all" v-model="isSelectAll" />
      <label for="all">全选</label>
    </div>
    <div>合计{{ totalPrice }}</div>
    <div>去结算{{ checkLength }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartBotBar",
  components: {
  },
  methods: {
      checkClick() {
        //   if(this.isSelectAll) {
        //       this.cartList.forEach(ele => ele.checked = false);
        //   }else{
        //       this.cartList.forEach(ele => ele.checked = true);
        //   }
        // 思路，保存一下变量，防止同时变化影响计算属性
        const flag = !this.isSelectAll;
        this.cartList.forEach(ele => ele.checked = flag);
      }
  },
  computed: {
    ...mapGetters({ cartList: "cartList" }),
    // 临时写的全选按钮控制,全选反向有问题
    isSelectAll() {
      // 思路 every find filter 普通遍历
      for (let ele of this.cartList) {
        if (!ele.checked) {
          return false;
        }
      }
      return true;
    },
    totalPrice() {
      // 计算选中商品总价
      return (
        "$" +
        this.cartList
          .filter((ele) => {
            return ele.checked;
          })
          .reduce((prev, ele) => {
            return prev + ele.count * ele.price;
          }, 0)
      );
    },
    checkLength() {
      return "(" + this.cartList.filter((ele) => ele.checked).length + ")";
    },
  },
};
</script>

<style lang="less" scoped>
.cart-bot-bar {
  display: flex;
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  height: 40px;
  padding: 0 10px;
  font-size: 13px;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
  .check {
    width: 18px;
    height: 18px;
    overflow: hidden;
    border-radius: 100%;
    vertical-align: bottom;
    border: 1px solid #ececec;
  }
  .check:checked {
    border: 1px solid var(----color-high-text);
    background: url(~assets/img/detail/check_active.png) no-repeat center;
    background-size: cover;
  }
}
</style>