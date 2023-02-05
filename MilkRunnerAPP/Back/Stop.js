export default class Stop {
    constructor(passedAddress, passedTime, passedPriority, passedLayover) {
        this.address = passedAddress
        this.time = passedTime
        this.priority = passedPriority
        this.layover = passedLayover
        this.completed = false
    }
    getTimeString() {
        if(this.time.m < 10) {
            var newM = "0" + String(this.time.m)
        }
        else {
            var newM = String(this.time.m)
        }
        return(String(this.time.h) + newM)
    }
}