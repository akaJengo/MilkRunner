import 'react-native-gesture-handler';
import { 
  StyleSheet, 
  SafeAreaView,
} from 'react-native';

import AlgorithmPath from './Back/AlgorithmPath';
import Favorite from './Back/Favorite';
import Queue from './Back/Queue';
import Stop from './Back/Stop';
import GUIList from './Front/GUIList';
import GUIFavs from './Front/GUIFavs';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';



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

// npm install @react-navigation/native
// npm install @react-navigation/drawer
// npx expo install react-native-gesture-handler react-native-reanimated

// npm install react-native-svg
// npx expo install react-native-svg@13.4.0
// npm i --save-dev react-native-svg-transformer

// npm install @react-native-async-storage/async-storage

//Icons: https://www.svgrepo.com/collection/iconsax-duotone-filled-icons/1
//<Drawer.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>


const testStops = [
  new Stop("123 Main St", {h: 5, m: 23}, true, 15, {lat: 40.7128, lon: -74.0060}),
  new Stop("789 Elm St", {h: 11, m: 20}, true, 35, {lat: 40.7291, lon: -73.9965}),
  new Stop("246 Pine St", {h: 6, m: 59}, false, 20, {lat: 40.6782, lon: -73.9442}),
  new Stop("147 Cherry St", {h: 9, m: 25}, false, 15, {lat: 40.7587, lon: -73.9858}),
  new Stop("258 Birch St", {h: 12, m: 59}, true, 20, {lat: 43.0545, lon: -76.1331}),
  new Favorite("Work", "369 Oak St", {h: 0, m: 0}, true, 30, {lat: 40.6413, lon: -73.7813}),
  new Favorite("Walmart","159 Maple St", {h: 14, m: 45}, false, 55, {lat: 40.7152, lon: -74.0145}),
  new Favorite("Cleaners", "753 Cedar St", {h: 22, m: 59}, true, 59, {lat: 40.7033, lon: -73.9396}),
  new Favorite("Home", "456 Market St", {h: 10, m: 40}, false, 40, {lat: 40.7850, lon: -73.9682}),
]

const favs = [
  new Favorite("Home", "123 Main St.", {h:9, m:0}, false, 12),
  new Favorite("Work", "456 Market St.", {h:8, m:30}, true, 5),
  new Favorite("Gym", "789 1st Ave.", {h:7, m:0}, false, 0),
  new Favorite("School", "111 2nd St.", {h:9, m:45}, true, 10),
  new Favorite("Library", "222 3rd Ave.", {h:11, m:30}, false, 15),
  new Favorite("Park", "333 4th St.", {h:12, m:0}, false, 20),
  new Favorite("Cafe", "444 5th Ave.", {h:10, m:0}, false, 30),
  new Favorite("Store", "555 6th St.", {h:9, m:30}, false, 40),
  new Favorite("Restaurant", "666 7th Ave.", {h:19, m:0}, false, 50),
  new Favorite("Movie Theater", "777 8th St.", {h:20, m:0}, false, 60)
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


const Nav = createDrawerNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Nav.Navigator useLegacyImplementation intitialRouteName="List">
          <Nav.Screen name="List" component={ShowGUIList} 
              options={{headerShown:false}} />
          <Nav.Screen name="Favorites" component={ShowGUIFav} options={{headerShown:false}} />
        </Nav.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

function ShowGUIList({navigation}) {
  console.log("outside ", navigation)
  return(<GUIList
    queue={queue} 
    colorScheme={colorScheme} 
  />) 
}

function ShowGUIFav() {
  return(<GUIFavs

  />)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme[0],
    color:"white"
  },

});

