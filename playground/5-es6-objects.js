const name = 'Ana'
const userAge = 27

// const user = {
//     name: name,
//     age: userAge,
//     location: 'Gondomar, Portugal'
// }


// Object property shorthand
const user = {
    name,
    age: userAge,
    location: 'Gondomar, Portugal'
}

console.log(user)

// Object destructuring

const product = {
    label:'Red Notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const label = product.label
// const stock = product.stock

// const { label: productLabel, price, stock, salePrice, rating = 5 } = product

// console.log(productLabel)
// console.log(stock)
// console.log(rating)

const transaction = (type, { label, stock }) => {
    console.log(type, label, stock)
}
transaction('order', product)