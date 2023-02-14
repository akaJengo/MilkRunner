import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

import DijkstraSearch from "./DijkstraSearch";
import Graph from "./Graph";
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
                    graph.addEdge(queue[i].address, queue[j].address, 1)
                }
            }
        }
        console.log(graph)
    }

    getLL(address){
        const [latitude, setLatitude] = useState(null);
        const [longitude, setLongitude] = useState(null);
      
        useEffect(() => {
          const fetchData = async () => {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/search?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA&format=json`
            );
      
            setLatitude(response.data[0].lat);
            setLongitude(response.data[0].lon);
          };
      
          fetchData();
        }, []);
      
        return (
          <View>
            <Text>Latitude: {latitude}</Text>
            <Text>Longitude: {longitude}</Text>
          </View>
        );
      };
}