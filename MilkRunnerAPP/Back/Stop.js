export default class Stop {
    constructor(passedAddress, passedTime, passedPriority, passedLayover, passedCoord) {
        this.address = passedAddress || ""
        this.time = passedTime || {h:0, m:0}
        this.priority = passedPriority || false
        this.layover = passedLayover || 0
        this.completed = false
        this.coord = passedCoord //{lat: 0.0, lon: 0.0}
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