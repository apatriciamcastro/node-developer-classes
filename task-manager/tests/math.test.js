const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

// Goal: Test temperature conversion functions
//
// 1. Export both functions and load them into test suite
// 2. Create "Should convert 32 F to 0 C"
// 3. Create "Should convert 0 C to 32 F"
// 4. Run the Jest to test your work!

test('Should convert 32 F to 0 C', () => {
    const conversion = fahrenheitToCelsius(32)
    expect(conversion).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    const conversion = celsiusToFahrenheit(0)
    expect(conversion).toBe(32)
})
