class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()

        this.newCalculation = true
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        // if (this.newCalculation) {
        //     this.clear();
        //     this.newCalculation = false
        // }
        if (number === "." && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        console.log("in chooseOperation with", operation)
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    async compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                let sum = await fetch(`/calculator/add?num1=${prev}&num2=${current}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    return data.result
                })
                computation = sum
                // console.log(prev, current)
                // console.log(sum)
                break
            case '-':
                let difference = await fetch(`/calculator/subtract?num1=${prev}&num2=${current}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    return data.result
                })
                computation = difference
                // console.log(prev, current)
                // console.log(difference)
                break
            case '*':
                let product = await fetch(`/calculator/multiply?num1=${prev}&num2=${current}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    return data.result
                })
                computation = product
                // console.log(prev, current)
                // console.log(product)
                break
            case '÷':
                let quotient = await fetch(`/calculator/divide?num1=${prev}&num2=${current}`)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    return data.result
                })
                computation = quotient
                // console.log(prev, current)
                // console.log(quotient)
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        this.updateDisplay()
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number')
const operationButtons = document.querySelectorAll('[data-operation')
const equalsButton = document.querySelector('[data-equals')
const deleteButton = document.querySelector('[data-delete')
const allClearButton = document.querySelector('[data-all-clear')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        //if rewrite this, make this better
        if (calculator.newCalculation) {
            calculator.clear();
            calculator.newCalculation = false
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        //if rewrite this, make this better
        if (calculator.newCalculation) {
            calculator.newCalculation = false
        }
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.newCalculation = true
})


allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})