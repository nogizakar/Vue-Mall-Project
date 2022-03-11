// 将toast封装为插件，并在 Toast 增加show方法，方便使用

import Toast from './Toast'

const obj = {}
obj.install = function (Vue) {
    console.log('obj install for toast');

    // 1.创建组件构造器
    const toastConstructor = Vue.extend(Toast)
    // 2. 构造组件对象
    const toast = new toastConstructor()
    // 3. 将组件对象挂载到某个元素上
    toast.$mount(document.createElement("div"))
    // toast.$el
    document.body.appendChild(toast.$el);
    // vue原型
    Vue.prototype.$toast = toast;
    // console.log(Vue.prototype);


}

export default obj;
