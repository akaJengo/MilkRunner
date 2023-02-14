import { Component, useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, FlatList } from "react-native"; 
import { DrawerActions } from "@react-navigation/native";

import { colorScheme } from "./GlobalConst";
import GoldStar from "../assets/goldStar.svg";
import Bookmark from "../assets/bookmark.svg";
import Close from "../assets/close.svg"
import AddIcon from "../assets/add.svg"

import Queue from "../Back/Queue";
import Menu from "../assets/menu.svg"
import Stop from "../Back/Stop";
import Favorite from "../Back/Favorite";

let testFavs = [
    new Favorite("Walmart", "123 Main St", {h: 5, m: 23}, true, 15),
    new Favorite("Arena", "456 Market St", {h: 10, m: 40}, false, 40),
    new Favorite("Pool", "789 Elm St", {h: 11, m: 20}, true, 35),
    new Favorite("Work", "246 Pine St", {h: 6, m: 59}, false, 20),
    new Favorite("School", "369 Oak St", {h: 0, m: 0}, true, 30),
  ];

let testStops = new Queue([
    new Stop("876, Pine Street South, Waconia, Carver County, Minnesota, 55387, United State", {h: 5, m: 23}, true, 15, {lat: 40.7128, long: -74.0060}),
    new Favorite("Home", "456 Market St", {h: 10, m: 40}, false, 40, {lat: 40.7850, long: -73.9682}),
    new Stop("876, Pine Street, Sault Ste. Marie, Algoma District, Northeastern Ontario, Ontario, P6B 5E6, Canada", {h: 11, m: 20}, true, 35, {lat: 40.7291, long: -73.9965}),
    new Stop("1, Valley Road, Nye County, Nevada, United States", {h: 6, m: 59}, false, 20, {lat: 40.6782, long: -73.9442}),
    new Favorite("Work", "369 Oak St", {h: 0, m: 0}, true, 30, {lat: 40.6413, long: -73.7813}),
    new Favorite("Walmart","159 Maple St", {h: 14, m: 45}, false, 55, {lat: 40.7152, long: -74.0145}),
    new Favorite("Cleaners", "753 Cedar St", {h: 22, m: 59}, true, 59, {lat: 40.7033, long: -73.9396}),
    new Stop("12, Alviso, San Jose, Santa Clara County, California, United States", {h: 9, m: 25}, false, 15, {lat: 40.7587, long: -73.9858}),
    new Stop("123, Franklin Township, Franklin County, Ohio, United States", {h: 12, m: 59}, true, 20, {lat: 43.0545, long: -76.1331}),
  ], "Km")

export default class GUIList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            queue:testStops,
            favorites:testFavs,
            colorScheme:colorScheme,
            showAdd:false,
            showFavs:false
        }
        this.openMenu = () => {
            props.navigation.dispatch(DrawerActions.openDrawer())
        }
    }
    render(){
        return (
            <View style={{flex:1, flexDirection:"column"}}>
                {this.topBar()}
                {this.state.showAdd? this.addMenu():
                    this.state.showFavs? this.favMenu(): 
                        this.stopScroller()}
            </View>
        );
    }
    topBar() {
        let topBarStyle = StyleSheet.create({
            bar: {
                height:60,
                backgroundColor:this.state.colorScheme[0],
                flexDirection:"row"
            },
            menuIcon:{
                width:60,
                padding:5,
                justifyContent:"center",
                alignItems:"center",
            },
            info:{
                flex:1,
                alignItems:"center",
                justifyContent:"center",
            },
            favMenu:{
                width:60
            }
        });
        return(
            <View style={topBarStyle.bar}> 
        
                <TouchableOpacity onPress={() => this.openMenu()} style={topBarStyle.menuIcon}>
                    <Menu height="100%"/>
                </TouchableOpacity>
            
                <View style={topBarStyle.info}>
                    <Text style={{color:this.state.colorScheme[1], fontSize:18}}>
                    
                    {this.state.queue.getTotalTimeString()+"   "}
                    {this.state.queue.totalDistance}
                    {this.state.queue.defaultUnit}
                    
                    </Text>
                </View>
                {(() => {if(this.state.showAdd || this.state.showFavs) {
                    console.log("should be there")
                    return(
                        <TouchableOpacity onPress={() => this.setState({showFavs:false, showAdd:false})} style={topBarStyle.menuIcon}>
                            <Close size="100%"/>
                        </TouchableOpacity>
                    )
                } else {
                    return(
                        <TouchableOpacity onPress={() => this.handleFavoritesPress()} style={topBarStyle.menuIcon}>
                            <Bookmark height="100%"/>
                        </TouchableOpacity>
                    )
                }
                })()}
                
            
            </View>
            );
    }
    handleFavoritesPress() {
        // console.log("favorites")
        this.setState({showFavs:true})
    }
    favMenu() {
        let style = {
            menu:{
                flex:1,
                backgroundColor:this.state.colorScheme[0],
            },
    }
        console.log("favs", this.state.favorites.length)
        return(
                    <View style={style.menu}>
                        {this.state.favorites.length == 0? this.noFavEntry(): this.favBox()}
                    </View>
        )
    }
    noFavEntry() {
        let style = StyleSheet.create({
            body:{
                flex:1,
                justifyContent:"center",
                padding:25
            },
            text:{
                margin:10,
                fontSize:18,
                color:this.state.colorScheme[1],
                textAlign:"center"
            }
        })
        return(
        <View style={style.body}>
            <Text style={style.text}>Head over to the favorites page to add your first favorite!</Text>
        </View>
        )
    }
    favBox() {
        return(
        <ScrollView>
            {this.state.favorites.map((fav, index) => this.favEntry(fav, index))}
        </ScrollView>)
    }
    favEntry(fav, index) {
        let style = StyleSheet.create({
            entry:{
                height:60,
                width:"97%",
                flexDirection:"row",
                borderRadius:  5,
                margin:5,
                backgroundColor:this.state.colorScheme[1],
            },
            icon:{
                width:30,
                height:30,
                margin:15
            },
            text:{ 
                top:10,
                flex:1
            }
        })
        return(
            <TouchableOpacity onPress={() => this.setState(this.state.queue.addStop(fav))} style={style.entry}>
                <View style={style.icon}>
                    <GoldStar height="100%" width="100%"/>
                </View>
                <View style={style.text}>
                    <Text>{fav.name}</Text>
                    <Text>{fav.address}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    stopScroller () {
        let stopScrollerStyle = StyleSheet.create({
            scroller:{
                flex:1,
                backgroundColor:this.state.colorScheme[0]
            }
        });
        // console.log(this.state.queue.getStops())
        if(this.state.queue.getStops() == []) {
            console.log("wtf")
            return(
                <Text>this bitch empty</Text>
            )
        } else {
            return(
                <View style={{flex:1}}>
                    <ScrollView style={stopScrollerStyle.scroller}>
                        {this.state.queue.getStops().map((entry, i) => this.stopEntry(entry, i))}
                    </ScrollView>
                    {this.bottomBar()}
                </View>
            )
        }
    }
    stopEntry(stop, index) {
        // console.log(stop.getType())
        if (stop.completed == true) {
            var dotColor = this.state.colorScheme[3]
        } 
        else {
            var dotColor = this.state.colorScheme[2]
        }
        let styles = StyleSheet.create({
            entry:{
                height:60,
                width:"97%",
                flexDirection:"row",
                borderRadius:  5,
                margin:5,
                backgroundColor:this.state.colorScheme[1],
            },
            star:{
                width:15,
                height:15,
                position:"absolute",
                top:4,
                left:4,
            },
            icon:{
                width:30,
                height:30,
                borderRadius:15,
                backgroundColor:dotColor,
                margin:15
            },
            entryLeft:{
                flex:1,
                justifyContent:"center",
                overflow:"hidden"
            },
            entryRight:{
                width:60,
                alignItems:"flex-end",
                marginRight: 5
            },
            address:{
                position:"absolute", 
            },
            priority:{
                position:"absolute", 
                top:10,
            },
            time:{
                position:"absolute", 
                bottom:10,
            }
        })
        return(
        <TouchableOpacity key={stop+index} onLongPress={() => this.handleStopEntryLongPress(index)} onPress={() => this.handleStopEntryPress(index)} style={styles.entry}>
            
            <View style={styles.star}>
                {stop.getType() == "Favorite" && <GoldStar height="100%" width="100%"/>}
            </View>

            <View style={styles.icon}/>
            
            <View style={styles.entryLeft}>

                <Text style={styles.address}>{stop.getName()}</Text>
            
                {/* <Text style={styles.layover}>+{stop.layover}min</Text> */}
            
            </View>
            
            <View style={styles.entryRight}>
            
                <Text style={styles.priority}>{stop.priority && "Priority"}</Text>
            
                <Text style={styles.time}>{stop.getTimeInMins() > 0 && "By " + stop.getTimeString()}</Text>
            
            </View>
        
        </TouchableOpacity>)
    }
    handleStopEntryPress(index) {
        this.state.queue.stops[index].toggleCompleted()
        this.updateStops(this.state.queue)
    }
    handleStopEntryLongPress(index) {
        Alert.alert("Please Confirm", "You are about to delete this stop",
                     [{text:'Cancel', style:'cancel'}, 
                      {text:'Remove', onPress: () => this.setState({queue:this.state.queue.removeStop(index)})}])
    }
    updateStops(passedQueue) {
        this.setState({queue: passedQueue});
    }
    bottomBar() {
        let bottomBarStyle = StyleSheet.create({
            bar:{
                backgroundColor:this.state.colorScheme[0],
                height:60,
                flexDirection:"row",
                paddingTop:5
            },
            add:{
                flex:1,
                alignItems:"center",
                justifyContent:"center",
                borderEndWidth: 1,
                borderEndColor:this.state.colorScheme[1]
            },
            go:{
                flex:1, 
                alignItems:"center",
                justifyContent:"center"
            },
            delete:{
                flex:1,
                alignItems:"center",
                justifyContent:"center",
                borderStartWidth: 1,
                borderStartColor:this.state.colorScheme[1]
            }
        });
        return(
            // bar
            <View style={bottomBarStyle.bar}>
               
                {/* add */}
                <TouchableOpacity onPress={() => this.handleAddPress()} style={bottomBarStyle.add}>
                    <Text style={{color:this.state.colorScheme[1], fontSize:18}}>Add</Text>
                </TouchableOpacity>
    
                {/* go  */}
                <TouchableOpacity onPress={() => this.handleGoPress()} style={bottomBarStyle.go}>
                    <Text style={{color:this.state.colorScheme[1], fontSize:18}}>GO</Text>
                </TouchableOpacity>
                
                {/* delete */}
                <TouchableOpacity onPress={() => this.handleDeletePress()}style={bottomBarStyle.delete}>
                    <Text style={{color:this.state.colorScheme[1], fontSize:18}}>Reset</Text>
                </TouchableOpacity>
            </View>
        )
    }
    handleAddPress() {
        this.setState({showAdd:true})
    }
    addMenu() {
        let style = {
            menu:{
                flex:1,
                backgroundColor:this.state.colorScheme[0]
            },
            top:{
                width:"100%",
                flexDirection:"row",
                marginbotom: 20,
                height: 50,
            },
            body:{
                flex:1
            },
            text:{
                color:"black",
            },
            container: {
                flex: 1,
              },
            searchInput: {
                padding:5,
                margin:5,
                borderRadius:2,
                flex:1,
                backgroundColor:colorScheme[1]
            },
            addressList: {
                flex:1,
            },
            addressItem: {
                minHeight:60,
                width:"97%",
                flexDirection:"row",
                borderRadius:  5,
                margin:5,
                backgroundColor:this.state.colorScheme[1],
            },
            addIcon:{
                width:60,
                height:60,
                padding:10,
            },
            textWrap:{
                flex:1,
                margin:5
            }
        }
        const AddressSearch = () => {
            const [query, setQuery] = useState('');
            const [addresses, setAddresses] = useState([]);
          
            useEffect(() => {
              if (!query) return setAddresses([]);
          
          
          
              // Use a fetch API to get address predictions from the internet
              fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=10&q=${query}&countrycodes=ca%2Cus`)
                .then(response => response.json())
                .then(data => setAddresses(data))
                .catch(error => console.error(error));
            }, [query]);
          
            try{
              console.log(addresses[0].display_name)      
            }
            catch(err) {}
          
            return (
            <View style={style.container}>
                <View style={style.top}>
                    <TextInput
                    style={style.searchInput}
                    placeholder="Enter address"
                    value={query}
                    onChangeText={text => setQuery(text)}
                    />
                </View>
                {addresses.length > 0 && (
                  <FlatList
                    style={style.addressList}
                    data={addresses}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => this.setState(
                        {queue:this.state.queue.addStop(
                            new Stop(
                                item.display_name,
                                {h:0, m:0},
                                false,
                                0,
                                {lat:item.lat, long:item.lon} 
                                )
                            )
                        }
                        )} style={style.addressItem}>
                        <AddIcon style={style.addIcon} height={"100%"}/>
                        <View style={style.textWrap}>
                            <Text style={style.text}>{item.display_name}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                )}
            </View>
            );
          };
        return(
            // <View style={style.menuBackground}> 
                <View style={style.menu}>
                    <View style={style.body}>
                        <AddressSearch/>
                    </View>
                </View>
            // </View>
        )
    }
    handleGoPress() {
        this.state.queue.getCalculate()
        console.log("go")
    }
    handleDeletePress() {
        Alert.alert("Please Confirm", "You are about to delete your entire route",
        [{text:'Cancel', style:'cancel'}, 
         {text:'Delete', onPress: () => this.setState({queue:this.state.queue.removeAllStops()})}])
    }
}

