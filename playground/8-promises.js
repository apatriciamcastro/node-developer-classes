// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         reject('Things went wrong.')
//         resolve([7, 4, 1]) // only the first line is going to take effect because a promise either gets resolved or rejected
//         reject('New error')// and it can only be rejected/resolved once
//     }, 2000)
// })

// doWorkPromise.then((result) => {
//     console.log('Success!', result)
// }).catch((error) => {
//     console.log('Error!', error)
// })

//
//                        fulfilled (resolved)
//                       /
// Promise -- pending --> 
//                       \
//                         rejected
//



const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })

}

// the more asynchronous tasks we try to perform, the more nested and complex the code gets
/*
    add(1, 2).then((sum) => {
        console.log(sum)
        add(sum, 5).then((sum2) => {
            console.log(sum2)
        }).catch((error) => {
            console.log(error)
        })
    }).catch((error) => {
        console.log(error)
    })
*/

// Solution --> PROMISE CHAINING 
// chain together multiple 'then' calls, each working with a different promise
add(1, 1).then((sum) => {
    console.log(sum)
    return add(sum, 4)

}).then((sum2) => {
    console.log(sum2)
}).catch((error) => {
    console.log(error)
})

