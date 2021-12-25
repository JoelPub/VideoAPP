import { formatDate } from 'element-ui/src/utils/date-util'

export function formatDateString(date) {
  return formatDate(date, 'yyyy-MM-dd')
}

/**
 * 格式化时间为 mm:ss 格式
 *
 * @param {Number} second
 * @param {Boolean} millisecond 是否包含毫秒。值为 true 时返回 mm:ss.sss 的格式
 * @return {string}
 */
export function formatSecondsToString(second, millisecond = false) {
  const intSecond = Math.floor(second)

  const m = Math.floor(intSecond / 60)
  const s = intSecond % 60
  let ret = (m + '').padStart(2, '0') + ':' + (s + '').padStart(2, '0')

  if (millisecond) {
    const ms = ((second - intSecond) * 1000).toFixed(0).padStart(3, '0')
    ret += '.' + ms
  }

  return ret
}

/**
 * 生成uuid方法
 * @returns {string}
 */
export const createUUID = function() {
  var d = new Date().getTime()
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now() //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
}

