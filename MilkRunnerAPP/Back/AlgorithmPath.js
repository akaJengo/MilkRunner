import Link from "./Link";
import DijkstraSearch from "./DijkstraSearch";
import Node from "./Node";
/**
 * Stop.getType() : String (Inside Stop)
 * OSM Mapping - Library 
 * Leaflet 
 */
export default class AlgorithmPath {
    constructor(){
        console.log("Algorithm Created!")
        this.nodes = {}

    }
    calculate(queue) {
        queue.map((stop, i) => console.log(stop.address, " index: ", i))
        // return(finalQueue, totalTime, totalDistance)
    }
    
    search(start, end, distanceType) {
		const path = DijkstraSearch.search(start, end, this, distanceType);
		return {
			start,
			end,
			path,
		};
	}


}