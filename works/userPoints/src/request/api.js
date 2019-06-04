/**
 * api接口统一管理
 */
import { get, post, delect } from './https'
import baseUrlChange from '../assets/environmentalSets'
let testUrl ='https://192.168.56.1:8086'

const apiAll = {}
apiAll.login = (data) => post('/api/v1/auth/login', data)
apiAll.sendSMSCode2 = () => '/api/v1/auth/sendSMSCode'
apiAll.sendSMSCode = (data) => get('/api/v1/auth/sendSMSCode', data)
apiAll.geocoder = (data) => get('https://api.map.baidu.com/geocoder', data)
apiAll.creatAccount = (data) => post('/api/v1/account/account', data)
apiAll.resetPassword = (data) => post('/api/v1/account/updatePassword', data)
// apiAll.poinList = (accountId) => get('/api/v1/point/point/' + accountId)
// apiAll.updatePoint = (data) => post('/api/v1/point/point', data)
apiAll.checkMobile = (data) => get('/api/v1/account/checkMobile', data)
apiAll.activityList = (data) => get('/api/v1/acti/activity', data)
apiAll.activityAttend = (data) => post('/api/v1/acti/attend', data)
apiAll.activityFavorite = (data) => post('/api/v1/acti/favorite', data)
apiAll.productList = (data) => get('/api/v1/product/list/' + data)
apiAll.productInfo = (productId) => get('/api/v1/product/' + productId)
apiAll.orderInfo = (orderId) => get('/api/v1/order/order/' + orderId)
apiAll.confirmPay = (data) => post('/api/v1/order/order/confirmpay', data)
apiAll.order = (data) => post('/api/v1/order/order', data)
apiAll.imgGlobal = (data) => get('/api/v1/image/' + data)
apiAll.userInfo = (accountId) => get('/api/v1/profile/' + accountId)
apiAll.orderList = (data) => get('/api/v1/order/order/list?orderStatus=6&accountId='+data,)
apiAll.updateShopCart = (data) => post('/api/v1/shoppingcart/shoppingCart', data)
apiAll.points = (data) => get('api/v1/profile/points/' + data)
//地址管理
apiAll.customeraddress = (data) => post('/api/v1/customerAddress/customeraddress', data)
apiAll.updatecustomeraddress = (data) => post('/api/v1/customerAddress/updatecustomeraddress', data)
apiAll.addressList = (data) => get('/api/v1/customerAddress/' + data)
apiAll.delAddressList = (data) => delect('/api/v1/customerAddress/customer/' + data)
//地址管理 end

apiAll.delShopCart = (id) => delect('/api/v1/shoppingcart/shoppingCart/' + id)  //全选删除
apiAll.shoppingCart = (data) => get('/api/v1/shoppingcart/shoppingCart/' + data)
apiAll.shoppingCartAddress = (data) => get('/api/v1/shoppingcart/shoppingCart/address?shippingAddressId=' + data)

//order
apiAll.generateorder = (data) => post('/api/v1/order/generateorder/' + data)

//预约试驾

apiAll.createTestDrive = (data) => post('/api/v1/testdrive/create' + data)

apiAll.testDriveList = (data) => get('/api/v1/testdrive/' + data);

// 签到

apiAll.signinlist = (data) => get('/api/v1/point/signinlist?accountId=' + data)
apiAll.signin = (data) => post('/api/v1/point/signin?accountId=' + data)

//vin

apiAll.checkVin = (data) => post('/api/v1/account/vin' + data)
apiAll.luckwheelFrist = (data) => post('/api/v1/luckywheel/first', data)
apiAll.playwheel = (data) => post('/api/v1/luckywheel/point', data)

//order

apiAll.checkorder = (data) => get('/api/v1/order/checkorder/' + data)
apiAll.createorder = (str) => post('/api/v1/order/createorder/' + str)

apiAll.orderInfo = (data) => get('/api/v1/order/order/detail?orderId=' + data)

apiAll.cancelOrder = (data) => get('/api/v1/order/order/cancel/' + data)
apiAll.confirmpay = (data) => post('/api/v1/order/order/confirmpay/' + data)
apiAll.finishOrder = (data) => post('/api/v1/order/order/finish/', data)

apiAll.receiveOrder = (data) => post('/api/v1/order/order/receive', data)

apiAll.quickorder = (data) => post('/api/v1/order/quickorder/' + data)
//权限接口
// apiAll.profile = (data) => get('/api/v1/profile/' + data);
apiAll.profile = () => get('/api/v1/profile/sumarize');


//积分明细

apiAll.pointList = (data) => get('/api/v1/point/' + data)

//产品收藏

apiAll.favoritePro = (data) => post('/api/v1/favorite/product', data)
apiAll.isfavoritePro = (data) => post('/api/v1/favorite/product/isfavorite', data)


apiAll.favoriteProList = (data) => get('/api/v1/favorite/product/' + data)

apiAll.favoriteAct = (data) => post('/api/v1/favorite/activity', data)
apiAll.isfavoriteAct = (data) => post('/api/v1/favorite/activity/isfavorite', data)


apiAll.favoriteActList = (data) => get('/api/v1/favorite/activity/' + data)
apiAll.getSignature = () => 'https://wechat.apps.pp01.cnnorth.cf.ford.com.cn/dsl/wechat/v1/proxy/signature'

// 获取短信验证码
apiAll.sendSMSCode = () => `${baseUrlChange}/api/v1/auth/sendSMSCode`

//绑定手机号
apiAll.bindPhoneNumber = () => `${baseUrlChange}/api/v1/auth/bindPhoneNumber`

apiAll.webchat = (data) => get('/api/v1/auth/login/openId?openId='+data)
apiAll.webchatCode = (data) => get("api/v1/auth/login/webchat/original?webChatAuthCode=" + data)


apiAll.profileUrl = () => `${baseUrlChange}/api/v1/profile/detail`
// 获取token
apiAll.getTokenULR = () => `${baseUrlChange}/api/v1/activity/share/save`

apiAll.statusUpdate = () => `${baseUrlChange}/api/v1/activity/share/status/update`

//设置
// apiAll.profileSetting = (data) => get('/api/v1/profile/' + data)

apiAll.getInfoDetail = () => get('/api/v1/profile/detail')

apiAll.updateExpress = (data) => post('/api/v1/order/order/updateExpress', data)

//活动列表状态

apiAll.activityFlag = (data) => get('/api/v1/acti/activity/points/' + data)

apiAll.excitingActivities = () => get('/api/v1/content/activities')

export { apiAll }






