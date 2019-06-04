import { apiAll } from "@/request/api"; // 导入我们的api接口
import { get, post } from "@/request/https";

let weixinInit = () => {
    let currentUrl = encodeURIComponent(window.location.href.split("#")[0]);

    //请求配置
    post(api_getWxConfig, { requestUrl: currentUrl }).then((res) => {
        //let {data} = res;
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作
        this.$wechat.config({
            debug: false, // 开启调试模式,开发时可以开启
            appId: res.appId,   // 必填，公众号的唯一标识   由接口返回
            timestamp: res.timestamp, // 必填，生成签名的时间戳 由接口返回
            nonceStr: res.nonceStr,    // 必填，生成签名的随机串 由接口返回
            signature: res.signature,   // 必填，签名 由接口返回
            jsApiList: ['getLocation', 'openLocation', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'getLocalImgData'] // 此处填你所用到的方法
        });
    });
}
