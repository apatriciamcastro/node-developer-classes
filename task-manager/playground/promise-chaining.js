require('../src/db/mongoose')

const User = require('../src/models/user')

// User.findByIdAndUpdate('5e05fb147c7923536d5e8e02', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((error) => {
//     console.log(error)
// })

const updateAgeAndCount = async (userId, age) => {
    const user = await User.findByIdAndUpdate(userId, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5e05fb147c7923536d5e8e02', 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})