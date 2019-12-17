const fs = require('fs')
// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// }
// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJSON = dataBuffer.toString()
// const data = JSON.parse(dataJSON)

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJSON)


// console.log(data.title)

//
// Challenge: Work with JSON and the file system
//
// 1. Load and parse the JSON data
// 2. Change the name and age property using your info
// 3. Stringify the changed object and overwrite the original data
// 4. Test your work by viewing data in the JSON file

const dataBuffer = fs.readFileSync('1-json.json') // returns binary data
const dataJSON = dataBuffer.toString() // stringyfies the binary data
const user = JSON.parse(dataJSON) // transforms JSON string in a JS object

user.name = 'Patricia'
user.age = 26

const userJSON = JSON.stringify(user)
fs.writeFileSync('1-json.json',userJSON)