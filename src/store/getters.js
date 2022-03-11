export default {
    // 购物车内商品数
    cartNum(state) {
        return state.cartList.length;
    },
    // 购物车内商品
    cartList(state) {
        return state.cartList;
    }
}