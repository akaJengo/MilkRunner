import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View,
} from 'react-native';
import Stop from './Back/Stop';



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
export default function App() {
  let newstop = new Stop("test"); 
  return (
    <View style={styles.container}>
      <Text style = {{fontSize:100}} onPress ={ () => console.log("ur mums a hoe")}>test</Text>
      <Text>This is a pea can</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
