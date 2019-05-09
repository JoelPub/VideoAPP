steps = [
    { 
        a: 1, 
        b: 2, 
        cities: [
            {
                c: 3,
                d: 4,
                districts: [
                    { adcode: 001 },
                    { adcode: 002 },
                    { adcode: 003 },
                    { adcode: 004 }
                ] 
            },
            {
                c: 3,
                d: 4,
                districts: [
                    { adcode: 001 },
                    { adcode: 002 },
                    { adcode: 003 },
                    { adcode: 004 }
                ] 
            }
        ]
    },
    { 
        a: 1, 
        b: 2, 
        cities: [
            {
                c: 3,
                d: 4,
                districts: [
                    { adcode: 001 },
                    { adcode: 002 },
                    { adcode: 003 },
                    { adcode: 004 }
                ] 
            },
            {
                c: 3,
                d: 4,
                districts: [
                    { adcode: 001 },
                    { adcode: 002 },
                    { adcode: 003 },
                    { adcode: 004 }
                ] 
            }
        ]
    }
]

const x = steps.reduce((p, c) => p.concat(c.cities.reduce((p2, c2) => p2.concat(c2.districts), [])), [])

console.log('x =', x)