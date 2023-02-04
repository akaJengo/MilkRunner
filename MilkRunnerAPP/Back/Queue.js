export default class Queue {
    constructor(passedStops) {
        this.stops = passedStops;
        // console.log("This queue stops: ",this.stops)
    }
    getStops() {
        return(this.stops);
    }
    getOptimizedStops() {

    }
    updateStops(passedStops) {
        this.stops = passedStops;
    }
}