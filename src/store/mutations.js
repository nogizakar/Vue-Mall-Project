import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    // 复杂处理逻辑抽取到actions，mutations只做更新操作
    // addCart(state, payload) {
    //     console.log(payload);
    //     // 判断逻辑，新商品或已添加商品
    //     let oldProduct = state.cartList.find(item => item.iid == payload.iid);
    //     if(oldProduct) {
    //         oldProduct.count += 1;
    //     }else {
    //         oldProduct = payload;
    //         oldProduct.checked = true;
    //         oldProduct.count = 1;
    //         // 添加商品到购物车
    //         state.cartList.push(oldProduct);
    //     }
    // }
    // 已添加商品加一
    [ADD_COUNTER](state, payload) {
        payload.count++;
    },
    // 添加新商品
    [ADD_TO_CART](state, payload) {
        state.cartList.push(payload);
    }


}