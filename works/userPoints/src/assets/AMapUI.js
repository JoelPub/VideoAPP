export default function MapLoader () { // <-- 原作者这里使用的是module.exports
  return new Promise((resolve, reject) => {
    if (window.AMapUI) {
    resolve(window.AMapUI)
  } else {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = 'https://webapi.amap.com/ui/1.0/main.js?v=1.0.11'
    script.onerror = reject
    document.head.appendChild(script)
    script.onload = () => {
      initAMapUI();
    }
  }
  window.initAMapUI = () => {
    resolve(window.AMapUI)
  }
})
}
