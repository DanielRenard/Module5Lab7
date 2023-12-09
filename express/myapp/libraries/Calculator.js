const Logger = require("./Logger")

const myLogger = new Logger({active: true, label: "calculator"})
class Calculator {
    add(num1, num2) {
        const value = num1 + num2
        myLogger.log(value)
        return value
    }
    subtract(num1, num2) {
        const value = num1 - num2
        myLogger.log(value)
        return value
    }
    multiply(num1, num2) {
        const value = num1 * num2
        myLogger.log(value)
        return value
    }
    divide(num1, num2) {
        const value = num1 / num2
        myLogger.log(value)
        return value
    }
}

module.exports = Calculator