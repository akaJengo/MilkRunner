let address = "";
let time = {h:0, m:0}; //maybe create a time object
let priority = false;
let layover = 0; //in mins

class Stop {
    constructor(passedAddress, passedTime, passedPriority, passedLayover) {
        address = passedAddress
        if (passedTime) {
            time = passedTime
        }
        if (priority) {
            priority = passedPriority
        }
        if (layover) {
            layover = passedLayover
        }
        console.log(address, time, priority, layover)
    }
    testaroo() {
        console.log(address)
        return null
    }
}

export default Stop; 