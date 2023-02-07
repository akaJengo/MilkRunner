export default class Stop {
    constructor(passedAddress, passedTime, passedPriority, passedLayover) {
        this.address = passedAddress || ""
        this.time = passedTime || {h:0, m:0}
        this.priority = passedPriority || false
        this.layover = passedLayover || 0
        this.completed = false
    }
    getType() {
        return("Stop")
    }
    getTimeString() {
        if(this.time.m < 10) {
            var newM = "0" + String(this.time.m)
        }
        else {
            var newM = String(this.time.m)
        }
        return(String(this.time.h) + ":" + newM)
    }
    getTimeInMins() {
        return(this.time.h * 60 + this.time.m)
    }
    toggleCompleted() {
        if(this.completed == true){
            this.completed = false
        } else {
            this.completed = true
        }
    }
}