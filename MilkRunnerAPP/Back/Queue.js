import Stop from "./Stop";

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
    addStop(address, time, priority, layover) {
        this.stops.unshift(new Stop(address, time, priority, layover))
        return(this)
    }
    removeAllStops() {
        this.stops = []
        console.log(this.stops)
        return(this)
    }
    getOptimizedStops() {

    }
    updateStops(passedStops) {
        this.stops = passedStops;
    }
    getTotalTimeString() {
        let newM = ""
        if(this.totalTime.m < 10) {
            newM = "0" + String(this.totalTime.m)
        }
        else {
            newM = String(this.totalTime.m)
        }
        return(String(this.totalTime.h) + ":" + newM)
    }
}