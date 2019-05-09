let z = '2018-10-20T12:30:00'

let date = new Date(z)

let month = date.getMonth() + 1

let day = date.getDate()

let hour = date.getHours()

let min = date.getMinutes()

let xxx = `${month}-${day} ${hour}:${min}`

console.log('xxx =', xxx)

let f = '29'

let d = f.padStart(2, '0')

console.log('d =', d)
