class Logger {
    constructor({ active = true, label = "mylogger" }) {
        this.id = "id" + Math.random().toString(16).slice(2)
        console.log(this.id)
        this.active = active
        this.label = label
    }
    log(value){
        if (this.active)
        console.log(`[Calculator : ${this.id}]: ${value}`)
    }
}

module.exports = Logger