const getThePoint = async (array, filter, start = 0, end = array.length) => {
  // 数组长度的一半，因为数组长度有奇偶之分，所以做了一个数值上面的取整操作
  let mid = Math.floor((start + end) / 2)

  // TODO: 递归引起堆栈溢出的处理
  // 递归调用该函数直到符合条件的项出现，返回之

  const result = await filter(array[mid])

  if (result == 0) {
    window.sessionStorage.setItem('goal', array[mid])
    // return Promise.resolve(array[mid])
    return array[mid]
  } else if (result == 1) {
    await getThePoint(array, filter, start, mid)
  } else {
    await getThePoint(array, filter, mid, end)
  }
}

export default getThePoint
