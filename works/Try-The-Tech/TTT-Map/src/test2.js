const data = [
  { name: "电桩信息准确", rate: [5], id: 1 },
  { name: "路书有待完善", rate: [4], id: 2 },
  { name: "桩主配合", rate: [4, 5], id: 1 }
]

const template = [
  {
    extend: "A",
    info: []
  },
  {
    extend: "B",
    info: []
  },
  {
    extend: "C",
    info: []
  },
  {
    extend: "D",
    info: []
  },
  {
    extend: "E",
    info: []
  }
]

const f = (arr, template) =>
  arr.forEach(e => e.rate.forEach(f => template[f - 1].info.push(e.name)))

f(data, template)

console.log("template =", template)
