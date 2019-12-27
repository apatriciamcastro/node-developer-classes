const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Things went wrong.')
        resolve([7, 4, 1]) // only the first line is going to take effect because a promise either gets resolved or rejected
        reject('New error')// and it can only be rejected/resolved once
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log('Success!', result)
}).catch((error) => {
    console.log('Error!', error)
})

//
//                        fulfilled (resolved)
//                       /
// Promise -- pending --> 
//                       \
//                         rejected
//