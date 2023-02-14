import DijkstraSearch from "./DijkstraSearch";
import Graph from "./Graph";

import axios from 'axios';


/**
 * Stop.getType() : String (Inside Stop)
 * OSM Mapping - Library 
 * Leaflet 
 */

const graph = new Graph(); 
export default class AlgorithmPath {
    constructor(){
        console.log("Algorithm Created!")

    }
    calculate(queue) {
        queue.map((stop, i) => graph.addNode(stop.address))
        //console.log(graph)

        for(let i = 0; i < queue.length; i++){
            for(let j = 0; j < queue.length; j++){
                if(queue[i].address != queue[j].address){
                    try {
                      graph.addEdge(queue[i].address, queue[j].address, this.calcDistance(queue[i].coord, queue[j].coord))
                    } catch (error) {}
                    
                }
            }
        }
        console.log("Done!")
        console.log(graph)

        // for (let i = 0; i < queue.length; i++) {
        //   try {
        //     console.log(queue[i].coord.lat)
        //   } catch (err) {}
        // }
    }

    calcDistance(source, destination){
      const apiUrl = `https://router.project-osrm.org/route/v1/driving/${source.long},${source.lat};${destination.long},${destination.lat}?geometries=geojson&steps=true&alternatives=false&overview=full&annotations=distance`;

      axios.get(apiUrl)
        .then((response) => {
          const distanceInMeters = response.data.routes[0].distance;
          const distanceInKM = distanceInMeters / 1000;
          console.log(`Distance by road: ${distanceInKM} km`);
        })
        .catch((error) => console.warn(error));

      return (distanceInKM)
    }
}