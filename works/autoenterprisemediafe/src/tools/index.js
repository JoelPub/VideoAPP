import {MessageBox} from "element-ui"
import router from '../router/index'
import store from '../store/index'
import ipconfig from '../ipconfig/index'

function backHome() {
  const role = localStorage.getItem('role') || 0
  const page = router.currentRoute || {}
  const path = page.path
  const next = nextPath => {
    if (nextPath !== path) {
      if (store.routeFrom === nextPath) router.back()
      else router.replace(nextPath)
    }
  }
  if (path === '/login' || path === '/register') next(path)
  else {
    Number(role) === 1 ? next('/publicAssets') : next('/manageMer')
  }
}
// 资源下载
function downLoadAttr(source) {
  const tipType = source.type || source.typeName

  MessageBox.confirm('将此' + tipType + '下载至本地', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  })
    .then(() => {
      const ext = source.sourceUrl.split('.').pop().toLowerCase()
      window.location.href = ipconfig() + '/gtb/api/downFile?' + 'fileUrl='
        + (ext === 'psd' ? source.coverUrl : (source.sourceUrl || source.coverUrl))
    })
    .catch(console.warn)
}

function setObProperties(ob, key, value) {
  const _ob = {}
  _ob[key] = value
  Object.keys(ob)
    .filter(itemKey => itemKey !== key)
    .forEach(itemKey => (_ob[itemKey] = ob[itemKey]))
  return _ob
}

// 替换数组
function replaceListItem(oldMap, newMap) {
  const oldLength = oldMap.length
  const newLength = newMap.length
  newMap.forEach((item, i) => oldMap.splice(i, 1, item))
  if (oldLength > newLength) oldMap.splice(newLength, oldLength - newLength)
}

export { backHome, downLoadAttr, setObProperties, replaceListItem }
