import { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView
} from 'react-native';
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

 * 
 */

const testStops = [
  new Stop("123 Main St", {h: 5, m: 23}, true, 15),
  new Stop("456 Market St", {h: 10, m: 40}, false, 40),
  new Stop("789 Elm St", {h: 11, m: 20}, true, 35),
  new Stop("246 Pine St", {h: 6, m: 59}, false, 20),
  new Stop("369 Oak St", {h: 0, m: 0}, true, 30),
  new Stop("159 Maple St", {h: 14, m: 45}, false, 55),
  new Stop("753 Cedar St", {h: 22, m: 59}, true, 59),
  new Stop("147 Cherry St", {h: 9, m: 25}, false, 15),
  new Stop("258 Birch St", {h: 12, m: 59}, true, 20),
  new Stop("369 Dogwood St", {h: 21, m: 30}, false, 25),
  new Stop("159 Willow St", {h: 7, m: 45}, true, 30),
  new Stop("753 Sycamore St", {h: 13, m: 30}, false, 35),
  new Stop("147 Maple St", {h: 23, m: 59}, true, 40),
  new Stop("258 Oak St", {h: 8, m: 30}, false, 45),
  new Stop("369 Pine St", {h: 5, m: 30}, true, 50),
  new Stop("159 Cedar St", {h: 15, m: 30}, false, 55),
  new Stop("753 Elm St", {h: 16, m: 30}, true, 59),
  new Stop("147 Market St", {h: 19, m: 30}, false, 15),
  new Stop("258 Main St", {h: 20, m: 30}, true, 20),
  new Stop("123 Main St", {h: 5, m: 23}, true, 15),
  new Stop("456 Market St", {h: 10, m: 40}, false, 40),
  new Stop("789 Elm St", {h: 11, m: 20}, true, 35),
  new Stop("246 Pine St", {h: 6, m: 59}, false, 20),
  new Stop("369 Oak St", {h: 0, m: 0}, true, 30),
  new Stop("159 Maple St", {h: 14, m: 45}, false, 55),
  new Stop("753 Cedar St", {h: 22, m: 59}, true, 59),
  new Stop("147 Cherry St", {h: 9, m: 25}, false, 15),
  new Stop("258 Birch St", {h: 12, m: 59}, true, 20),
  new Stop("369 Dogwood St", {h: 21, m: 30}, false, 25),
  new Stop("159 Willow St", {h: 7, m: 45}, true, 30),
  new Stop("753 Sycamore St", {h: 13, m: 30}, false, 35),
  new Stop("147 Maple St", {h: 23, m: 59}, true, 40),
  new Stop("258 Oak St", {h: 8, m: 30}, false, 45),
  new Stop("369 Pine St", {h: 5, m: 30}, true, 50),
  new Stop("159 Cedar St", {h: 15, m: 30}, false, 55),
  new Stop("753 Elm St", {h: 16, m: 30}, true, 59),
  new Stop("147 Market St", {h: 19, m: 30}, false, 15),
  new Stop("258 Main St", {h: 20, m: 30}, true, 20),  
  new Stop("123 Main St", {h: 5, m: 23}, true, 15),
  new Stop("456 Market St", {h: 10, m: 40}, false, 40),
  new Stop("789 Elm St", {h: 11, m: 20}, true, 35),
  new Stop("246 Pine St", {h: 6, m: 59}, false, 20),
  new Stop("369 Oak St", {h: 0, m: 0}, true, 30),
  new Stop("159 Maple St", {h: 14, m: 45}, false, 55),
  new Stop("753 Cedar St", {h: 22, m: 59}, true, 59),
  new Stop("147 Cherry St", {h: 9, m: 25}, false, 15),
  new Stop("258 Birch St", {h: 12, m: 59}, true, 20),
  new Stop("369 Dogwood St", {h: 21, m: 30}, false, 25),
  new Stop("159 Willow St", {h: 7, m: 45}, true, 30),
  new Stop("753 Sycamore St", {h: 13, m: 30}, false, 35),
  new Stop("147 Maple St", {h: 23, m: 59}, true, 40),
  new Stop("258 Oak St", {h: 8, m: 30}, false, 45),
  new Stop("369 Pine St", {h: 5, m: 30}, true, 50),
  new Stop("159 Cedar St", {h: 15, m: 30}, false, 55),
  new Stop("753 Elm St", {h: 16, m: 30}, true, 59),
  new Stop("147 Market St", {h: 19, m: 30}, false, 15),
  new Stop("258 Main St", {h: 20, m: 30}, true, 20),
  new Stop("123 Main St", {h: 5, m: 23}, true, 15),
  new Stop("456 Market St", {h: 10, m: 40}, false, 40),
  new Stop("789 Elm St", {h: 11, m: 20}, true, 35),
  new Stop("246 Pine St", {h: 6, m: 59}, false, 20),
  new Stop("369 Oak St", {h: 0, m: 0}, true, 30),
  new Stop("159 Maple St", {h: 14, m: 45}, false, 55),
  new Stop("753 Cedar St", {h: 22, m: 59}, true, 59),
  new Stop("147 Cherry St", {h: 9, m: 25}, false, 15),
  new Stop("258 Birch St", {h: 12, m: 59}, true, 20),
  new Stop("369 Dogwood St", {h: 21, m: 30}, false, 25),
  new Stop("159 Willow St", {h: 7, m: 45}, true, 30),
  new Stop("753 Sycamore St", {h: 13, m: 30}, false, 35),
  new Stop("147 Maple St", {h: 23, m: 59}, true, 40),
  new Stop("258 Oak St", {h: 8, m: 30}, false, 45),
  new Stop("369 Pine St", {h: 5, m: 30}, true, 50),
  new Stop("159 Cedar St", {h: 15, m: 30}, false, 55),
  new Stop("753 Elm St", {h: 16, m: 30}, true, 59),
  new Stop("147 Market St", {h: 19, m: 30}, false, 15),
  new Stop("258 Main St", {h: 20, m: 30}, true, 20),
  new Stop("123 Main St", {h: 5, m: 23}, true, 15),
  new Stop("456 Market St", {h: 10, m: 40}, false, 40),
  new Stop("789 Elm St", {h: 11, m: 20}, true, 35),
  new Stop("246 Pine St", {h: 6, m: 59}, false, 20),
  new Stop("369 Oak St", {h: 0, m: 0}, true, 30),
  new Stop("159 Maple St", {h: 14, m: 45}, false, 55),
  new Stop("753 Cedar St", {h: 22, m: 59}, true, 59),
  new Stop("147 Cherry St", {h: 9, m: 25}, false, 15),
  new Stop("258 Birch St", {h: 12, m: 59}, true, 20),
  new Stop("369 Dogwood St", {h: 21, m: 30}, false, 25),
  new Stop("159 Willow St", {h: 7, m: 45}, true, 30),
  new Stop("753 Sycamore St", {h: 13, m: 30}, false, 35),
  new Stop("147 Maple St", {h: 23, m: 59}, true, 40),
  new Stop("258 Oak St", {h: 8, m: 30}, false, 45),
  new Stop("369 Pine St", {h: 5, m: 30}, true, 50),
  new Stop("159 Cedar St", {h: 15, m: 30}, false, 55),
  new Stop("753 Elm St", {h: 16, m: 30}, true, 59),
  new Stop("147 Market St", {h: 19, m: 30}, false, 15),
  new Stop("258 Main St", {h: 20, m: 30}, true, 20),
  new Stop("123 Main St", {h: 5, m: 23}, true, 15),
  new Stop("456 Market St", {h: 10, m: 40}, false, 40),
  new Stop("789 Elm St", {h: 11, m: 20}, true, 35),
  new Stop("246 Pine St", {h: 6, m: 59}, false, 20),
  new Stop("369 Oak St", {h: 0, m: 0}, true, 30),
  new Stop("159 Maple St", {h: 14, m: 45}, false, 55),
  new Stop("753 Cedar St", {h: 22, m: 59}, true, 59),
  new Stop("147 Cherry St", {h: 9, m: 25}, false, 15),
  new Stop("258 Birch St", {h: 12, m: 59}, true, 20),
  new Stop("369 Dogwood St", {h: 21, m: 30}, false, 25),
  new Stop("159 Willow St", {h: 7, m: 45}, true, 30),
  new Stop("753 Sycamore St", {h: 13, m: 30}, false, 35),
  new Stop("147 Maple St", {h: 23, m: 59}, true, 40),
  new Stop("258 Oak St", {h: 8, m: 30}, false, 45),
  new Stop("369 Pine St", {h: 5, m: 30}, true, 50),
  new Stop("159 Cedar St", {h: 15, m: 30}, false, 55),
  new Stop("753 Elm St", {h: 16, m: 30}, true, 59),
  new Stop("147 Market St", {h: 19, m: 30}, false, 15),
  new Stop("258 Main St", {h: 20, m: 30}, true, 20),
]
let queue = new Queue(testStops); //eventually load from json
let guiList = new GUIList;
let gui = "list";

export default function App() {
  guiList.updateStops(queue.getStops());
  return (
    <SafeAreaView style={styles.container}>
      {gui == "list" &&
        guiList.render()
        }
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});
