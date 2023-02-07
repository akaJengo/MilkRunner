
/**
 * Stop.getType() : String (Inside Stop)
 * OSM Mapping - Library 
 * Leaflet 
 */
export default class AlgorithmPath {
    constructor(){
        console.log("Algorithm Created!")
    }
    calculate(queue) {
        queue.map((stop, i) => console.log(stop.address, " index: ", i))
        // return(finalQueue, totalTime, totalDistance)
    }
}