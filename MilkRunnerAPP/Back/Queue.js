import AlgorithmPath from "./AlgorithmPath";
import Stop from "./Stop";


// OpenStreetMaps Mapping

export default class Queue {
    constructor(passedStops, passedDefaultUnit) {
        this.algorithm = new AlgorithmPath
        this.stops = passedStops; //array
        this.totalTime = {h:0, m:0}
        this.totalDistance = 0 //float64
        this.defaultUnit = passedDefaultUnit

        //const list = this.algorithm.calculate(); 
        //Km is default (need to find a way to use user default)
        // console.log("This queue stops: ",this.stops)
    }
    getCalculate() {
        this.algorithm.calculate(this.stops)
    }
    getStops() {
        return(this.stops);
    }
    removeStop(index) {
        console.log("removing ", index)
        this.stops.splice(index, 1)
        return(this)
        // console.log(this.stops)
    }
    addStop(stop) {
        this.stops.unshift(stop)
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