import { Component } from 'react';
import { 
  StyleSheet, 
  SafeAreaView,
} from 'react-native';
import { TouchableHighlight } from 'react-native-web';
import Favorite from './Back/Favorite';

import Queue from './Back/Queue';
import Stop from './Back/Stop';
import GUIList from './Front/GUIList';


/**
 * Frontline Gui, each screen function(class/file)
 * 
 * TODO:
 * User, Input multiple stops, so that it can be the optimal path for multiple stops
 * User, Algorithm to optimize the order of the stops, so that its optimal (Dijkstras)
 * User, Add deadlines to each stop, so that they do not expire
 * Add layover time so that the time delivery time will be accurate
 * User, Add priority to stops, so that one location is the first most stop
 * User, List view with each in order, so that visibility is better for first second, third
 * User, Follow location and automatic remove stops from the queue, so that we don’t go backwards
 * User, Ability to add or remove stops on the go
 */

// Not using these quite yet but we will be
// npm install @react-navigation/native
// npm install @react-navigation/drawer
// npm install react-native-svg
// npx expo install react-native-svg@13.4.0
// npm i --save-dev react-native-svg-transformer

//Icons: https://www.svgrepo.com/collection/iconsax-duotone-filled-icons/1

const testStops = [
  new Stop("123 Main St", {h: 5, m: 23}, true, 15),
  new Favorite("Home", "456 Market St", {h: 10, m: 40}, false, 40),
  new Stop("789 Elm St", {h: 11, m: 20}, true, 35),
  new Stop("246 Pine St", {h: 6, m: 59}, false, 20),
  new Favorite("Work", "369 Oak St", {h: 0, m: 0}, true, 30),
  new Favorite("Walmart","159 Maple St", {h: 14, m: 45}, false, 55),
  new Favorite("Cleaners", "753 Cedar St", {h: 22, m: 59}, true, 59),
  new Stop("147 Cherry St", {h: 9, m: 25}, false, 15),
  new Stop("258 Birch St", {h: 12, m: 59}, true, 20),
]

// https://coolors.co/515151-ddd1c7-0eb1d2-fc6471
const colorScheme = [
  "#515151", //2A2B2A
  "#DDD1C7",
  "#0EB1D2",
  "#FC6471"
]

let queue = new Queue(testStops, "Km"); //eventually load from json
// let guiList = new GUIList(queue, colorScheme);
let gui = "list";

export default function App() {

  // guiList.setColorScheme(colorScheme)
  // guiList.updateStops(queue);
  return (
    <SafeAreaView style={styles.container}>
      {gui == "list" &&
        <GUIList queue={queue} colorScheme={colorScheme}/>
        }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme[0],
    color:"white"
  },

});
