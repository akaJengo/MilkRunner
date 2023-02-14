import 'react-native-gesture-handler';
import { 
  StyleSheet, 
  SafeAreaView,
} from 'react-native';

import GUIList from './Front/GUIList';
import GUIFavs from './Front/GUIFavs';
import GUIMap from './Front/GUIMap';
import GUISettings from './Front/GUISettings';

import { colorScheme } from "./Front/GlobalConst";
import GrayStar from "./assets/grayStar.svg";
import SettingsIcon from "./assets/settings.svg"
import MapIcon from "./assets/map.svg"
import ListIcon from "./assets/list.svg"

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';



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



const Nav = createDrawerNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <Nav.Navigator 
          useLegacyImplementation 
          intitialRouteName="List"
          screenOptions={{
            drawerStyle:{
              backgroundColor:colorScheme[0]
            },
            drawerItemStyle:{
              backgroundColor:colorScheme[1]
            },
            drawerActiveTintColor:colorScheme[3],
            drawerHideStatusBarOnOpen:true,
            }}
          >
          <Nav.Screen
            name="Map"
            component={GUIMap}
            options={{
              headerShown:false,
              drawerIcon: ({size}) => 
                <MapIcon 
                  height={size} 
                  width={size} 
                  style={{marginRight: -22}}
                />
            }} 
          />
          <Nav.Screen 
            name="List" 
            component={GUIList} 
            options={{
              headerShown:false,
              drawerIcon: ({size}) => 
                <ListIcon 
                  height={size} 
                  width={size} 
                  style={{marginRight: -22}}
                />
            }}
          />
          <Nav.Screen 
            name="Favorites" 
            component={GUIFavs} 
            options={{
              headerShown:false,
              drawerIcon: ({size}) => 
                <GrayStar 
                  height={size} 
                  width={size} 
                  style={{marginRight: -22}}
                />
            }} 
          />
          <Nav.Screen
            name="Settings"
            component={GUISettings}
            options={{
              headerShown:false,
              drawerIcon: ({size}) => 
                <SettingsIcon 
                  height={size} 
                  width={size} 
                  style={{marginRight: -22}}
                />
            }}
          />
        </Nav.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme[0],
    color:"white"
  },
});



