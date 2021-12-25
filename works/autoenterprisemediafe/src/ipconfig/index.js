export default (flag = location.hostname) => {
  const enviroment = {
    'www.gtb-zht.cn': 'https://www.gtb-zht.cn/',
    '192.168.123.14': 'https://iit.axiwenhua.cn/',
    '192.168.123.86': 'https://iit.axiwenhua.cn/',
    'biz.axiwenhua.cn': 'https://iit.axiwenhua.cn/',
    'iit.axiwenhua.cn': 'https://iit.axiwenhua.cn/',
    '192.168.123.205': 'https://iit.axiwenhua.cn/',
//    'localhost': 'http://192.168.12.8:8899', // 本地测试ip
    'localhost': 'http://127.0.0.1:8899', // 本地测试ip
    '192.168.12.21': 'http://192.168.12.8:8899'
  }[flag]
  return enviroment || 'https://iit.axiwenhua.cn/'
}
// export default (flag = location.hostname) => {
//   const enviroment = {
//     'www.gtb-zht.cn': 'https://www.gtb-zht.cn/',
//   }[flag]
//   return enviroment || 'https://www.gtb-zht.cn/'
// }
