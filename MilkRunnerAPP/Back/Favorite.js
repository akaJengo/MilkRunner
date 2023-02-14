import Stop from "./Stop";

export default class Favorite extends Stop {
    constructor(name, address, time, priority, layover, coord) {
        super(address, time, priority, layover, coord);
        this.name = name
    }
    getType() {
        return("Favorite")
    }
}