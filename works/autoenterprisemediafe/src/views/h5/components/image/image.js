export const getImageData = (data) => {
  if (!data.length) {
    return []
  }
  data.forEach(item => {
    item = Object.assign(item, {
      elName: 'qk-image',
      icon: 'iconfont icontupian',
      valueType: '', // 标识数据类型，用于表单组件,
      defaultStyle: {
        height: 200
      }
    })
  })
  return data
}

