export default class Queue {
    constructor(passedStops, passedDefaultUnit) {
        this.stops = passedStops;
        this.totalTime = {h:0, m:0}
        this.totalDistance = 0 
        this.defaultUnit = passedDefaultUnit
        //Km is default (need to find a way to use user default)
        // console.log("This queue stops: ",this.stops)
    }
    getStops() {
        return(this.stops);
    }
    removeStop(index) {
        console.log("removing ", index)
        this.stops.splice(index, 1)
        // console.log(this.stops)
    }
    getOptimizedStops() {

    }
    updateStops(passedStops) {
        this.stops = passedStops;
    }
    getTotalTimeString() {
        if(this.totalTime.m < 10) {
            var newM = "0" + String(this.totalTime.m)
        }
        else {
            var newM = String(this.totalTime.m)
        }
        return(String(this.totalTime.h) + ":" + newM)
    }
}