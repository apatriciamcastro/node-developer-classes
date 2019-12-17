// const square = function(x) {
//     return x * x
// }

/**
 * Normal arrow function to replace the above syntax
 */
// const square = (x) => {
//     return x * x
// }

/**
 * This type of arrow function can only be used when inside the function only exists a simple return statement
 */
// const square = (x) => x * x

// console.log(square(2))

/**
 * Arrow function as property on an object
 */

/**
 * This does not work because arrow functions do not bind their own 'this' value
 */
// const event = {
//     name: 'Birthday Party',
//     printGuestList: () => {
//         console.log('Guest list for ' + this.name)
//     }
// }
// event.printGuestList()

const event = {
    name: 'Birthday Party',
    guestList: ['Patricia', 'Vitor', 'Ju'],
    printGuestList() {
        console.log('Guest list for ' + this.name)
        
        // arrow functions do not bind their own value, they access the 'this' value in the context in which they're created (in this case, printGuestList())
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)            
        })
    }
}
event.printGuestList()

