import { Component } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"; 
import Star from "../assets/star.svg";
import Bookmark from "../assets/bookmark.svg";
import Menu from "../assets/menu.svg"

export default class GUIList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            queue:props.queue,
            colorScheme:props.colorScheme
        }
    }
    render(){
        return (
            <View style={{flex:1, flexDirection:"column"}}>
                {this.topBar()}
                {this.stopScroller()}
                {this.bottomBar()}
                {this.editing && this.stopEditMenu()}
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
        
                <TouchableOpacity onPress={() => this.handleMenuPress()}style={topBarStyle.menuIcon}>
                    <Menu height="80%"/>
                </TouchableOpacity>
            
                <View style={topBarStyle.info}>
                    <Text style={{color:'white'}}>
                    
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
        console.log("menu")
    }
    handleFavoritesPress() {
        console.log("favorites")
    }
    stopScroller () {
        let stopScrollerStyle = StyleSheet.create({
            scroller:{
                flex:1,
            }
        });
        if(this.state.queue == []) {
            console.log("wtf")
            return(
                <Text>this bitch empty</Text>
            )
        } else {
            return(
                <ScrollView style={stopScrollerStyle.scroller}>
                    {this.state.queue.getStops().map((entry, index) => this.stopEntry(entry, index))}
                </ScrollView>
            )
        }
    }
    stopEntry(stop, index) {
        console.log(stop.getType())
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
        this.editing = true
        this.forceUpdate()
    }
    stopEditMenu() {
        return(
            <View style={{height:60, width:60, position:"absolute", top:30, left:30, backgroundColor:"dodgerblue"}}/>
        )
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
                    <Text style={{color:'white'}}>Add</Text>
                </TouchableOpacity>
    
                {/* go  */}
                <TouchableOpacity onPress={() => this.handleGoPress()} style={bottomBarStyle.go}>
                    <Text style={{color:'white'}}>GO</Text>
                </TouchableOpacity>
                
                {/* delete */}
                <TouchableOpacity onPress={() => this.handleDeletePress()}style={bottomBarStyle.delete}>
                    <Text style={{color:'white'}}>Reset</Text>
                </TouchableOpacity>
            </View>
        )
    }
    handleAddPress() {
        //bring you to a screen with details on the Stop object. Predictions of text for the address
        // this.updateStops(this.state.queue.addStop("test test test"))
        this.updateStops(this.state.queue.addStop("test addy"))
    }
    handleGoPress() {
        //Optimize from current location
        console.log("go")
    }
    handleDeletePress() {
        this.clearQueue()
    }
    clearQueue() {
        this.updateStops(this.state.queue.removeAllStops())
    }
}