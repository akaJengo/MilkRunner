import { Component } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native"; 
import Star from "../assets/star.svg";
import Bookmark from "../assets/bookmark.svg";
import Menu from "../assets/menu.svg"
import { TouchableWithoutFeedback } from "react-native-web";
import { getValueFor } from "../App";
import { DrawerActions } from "@react-navigation/native";

export default class GUIList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            queue:props.queue,
            colorScheme:props.colorScheme,
            showAdd:false,
            showFavs:false
        }
        this.favorites = []
        // console.log(this.favorites)
    }
    render(){
        return (
            <View style={{flex:1, flexDirection:"column"}}>
                {this.topBar()}
                {this.stopScroller()}
                {this.bottomBar()}
                {this.state.showAdd && this.addMenu()}
                {this.state.showFav && this.favMenu()}
                {this.showMenu && this.menu(this)}
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
                justifyContent:"center",
                alignItems:"center"
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
        
                <TouchableOpacity onPress={this.handleMenuPress}style={topBarStyle.menuIcon}>
                    <Menu height="80%"/>
                </TouchableOpacity>
            
                <View style={topBarStyle.info}>
                    <Text style={{color:this.state.colorScheme[1], fontSize:18}}>
                    
                    {this.state.queue.getTotalTimeString()+"   "}
                    {this.state.queue.totalDistance}
                    {this.state.queue.defaultUnit}
                    
                    </Text>
                </View>

                <TouchableOpacity onPress={() => this.handleFavoritesPress()} style={topBarStyle.menuIcon}>
                    <Bookmark height="80%"/>
                </TouchableOpacity>
            
            </View>
            );
    }
    handleMenuPress() {
    }
    handleFavoritesPress() {
        // console.log("favorites")
        this.setState({showFav:true})
    }
    favMenu() {
        let style = {
            menuBackground:{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0,
                backgroundColor: 'rgba(52, 52, 52, 0.8)'
            },
            menu:{
                flex:1,
                position:"absolute",
                top:50,
                left:25,
                right:25,
                bottom:50,
                backgroundColor:this.state.colorScheme[0],
                borderColor: this.state.colorScheme[1],
                borderWidth: 2
            },
            body:{
                flex:1
            },
            footerButton:{
                height:60,
                width:"100%",
                alignItems:"center",
                justifyContent:"center"
            },
            footerButtonText:{
                color:this.state.colorScheme[1],
                fontSize:18
            }
        }
        console.log("favs", this.favorites.length)
        return(
            <View style={style.menuBackground}>
                <View style={style.menu}>
                    <View style={style.body}>
                        {this.favorites.length == 0? this.noFavEntry(): this.favBox()}
                    </View>
                    <TouchableOpacity style={style.footerButton}onPress={() => this.setState({showFav:false})}>
                        <Text style={style.footerButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    noFavEntry() {
        let style = StyleSheet.create({
            body:{
                flex:1,
                justifyContent:"center",
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
            {this.favorites.map((fav, index) => this.favEntry(fav, index))}
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
                    <Star height="100%" width="100%"/>
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
                <ScrollView style={stopScrollerStyle.scroller}>
                    {this.state.queue.getStops().map((entry, i) => this.stopEntry(entry, i))}
                </ScrollView>
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
                flex:1
            },
            entryRight:{
                width:60,
                alignItems:"flex-end",
                marginRight: 5
            },
            address:{
                position:"absolute", 
                top:10,
            },
            layover:{
                position:"absolute", 
                bottom:10,
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
        <TouchableOpacity onLongPress={() => this.handleStopEntryLongPress(index)} onPress={() => this.handleStopEntryPress(index)} style={styles.entry}>
            
            <View style={styles.star}>
                {stop.getType() == "Favorite" && <Star height="100%" width="100%"/>}
            </View>

            <View style={styles.icon}/>
            
            <View style={styles.entryLeft}>

                <Text style={styles.address}>{stop.getType() == "Stop"?  stop.address: stop.name}</Text>
            
                <Text style={styles.layover}>+{stop.layover}min</Text>
            
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
                marginTop:5
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
            menuBackground:{
                flex:1,
                position:"absolute",
                top:0,
                left:0,
                bottom:0,
                right:0
            },
            menu:{
                flex:1,
                position:"absolute",
                top:100,
                left:50,
                right:50,
                bottom:150,
                opacity:0.9,
                backgroundColor:this.state.colorScheme[0]
            },
            body:{
                flex:1
            },
            footer:{
                height:60,
                width:"100%",
                flexDirection:"row"
            },
            footerButton:{
                flex:1,
                alignItems:"center",
                justifyContent:"center"
            },
            footerButtonText:{
                color:this.state.colorScheme[1],
                fontSize:18
            }
        }
        return(
            <View style={style.menuBackground}> 
                <View style={style.menu}>
                    <View style={style.body}>
                        <Text>test</Text>
                    </View>
                    <View style={style.footer}>
                    
                        <TouchableOpacity style={style.footerButton} onPress={() => this.setState({showAdd:false})}>
                            <Text style={style.footerButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.footerButton}>
                            <Text style={style.footerButtonText}>Ok</Text>
                        </TouchableOpacity>
                    
                    </View>
                </View>
            </View>
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