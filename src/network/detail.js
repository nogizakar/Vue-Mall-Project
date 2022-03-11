import {request} from './request';

// 请求详情页 http://152.136.185.210:7878/api/hy66//detail?iid=1lrzvr8
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

// 请求推荐列表
export function getRecommend() {
    return request({
        url: '/recommend'
    })
}
// 构造商品类
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title;
        this.desc = itemInfo.desc;
        this.newPrice = itemInfo.price;
        this.oldPrice = itemInfo.oldPrice;
        this.discount = itemInfo.discountDesc;
        this.realPrice = itemInfo.lowNowPrice;
        this.columns = columns;
        this.services = services;
    }
}

// 构造店铺类
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;
    }
}

// 构造参数信息类
export class GoodsParam {
    constructor(info, rule) {
        // 注：images可能没有值
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}