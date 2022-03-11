import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    // 原方法
    // addCart(context, payload) {
    //     // 判断逻辑，新商品或已添加商品
    //     let oldProduct = context.state.cartList.find(item => item.iid == payload.iid);
    //     if(oldProduct) {
    //         // oldProduct.count += 1;
    //         context.commit(ADD_COUNTER, oldProduct);
    //     }else {
    //         payload.count = 1;
    //         payload.checked = false;
    //         // 添加商品到购物车
    //         // context.state.cartList.push(payload);
    //         context.commit(ADD_TO_CART, payload);
    //     }
    // }
    // addCart增加了一个返回promise
    addCart(context, payload) {
        return new Promise((resolve) => {
            // 判断逻辑，新商品或已添加商品
            let oldProduct = context.state.cartList.find(item => item.iid == payload.iid);
            if (oldProduct) {
                // oldProduct.count += 1;
                context.commit(ADD_COUNTER, oldProduct);
                resolve("购物车原商品数量加一");
            } else {
                payload.count = 1;
                payload.checked = false;
                // 添加商品到购物车
                // context.state.cartList.push(payload);
                context.commit(ADD_TO_CART, payload);
                resolve("购物车添加了新商品")
            }
        })
    }
}