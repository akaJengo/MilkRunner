import Stop from "./Stop";

export default class Favorite extends Stop {
    constructor(name, address, time, priority, layover) {
        super(address, time, priority, layover);
        this.name = name
    }
    getType() {
        return("Favorite")
    }
    getName() {
        return(this.name)
    }
}