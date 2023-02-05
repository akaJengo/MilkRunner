import { Component } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"; 

export default class GUIList extends Component {
    setColorScheme(passedColorScheme) {
        this.colorScheme = passedColorScheme;
    }
    render(){
        return (
            <View style={{flex:1, flexDirection:"column"}}>
                {this.topBar()}
                {this.stopScroller()}
                {this.bottomBar()}
            </View>
        );
    }
    topBar() {
        let topBarStyle = StyleSheet.create({
            bar: {
                height:60,
                backgroundColor:this.colorScheme[0],
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
                marginRight: 60
            }
        });
        return(
            // bar
            <View style={topBarStyle.bar}> 
        
                {/* menuIcon */}
                <View style={topBarStyle.menuIcon}>
                    <Text>Menu Icon</Text>
                </View>
            
                {/* overview */}
                <View style={topBarStyle.info}>
                    <Text style={{color:'white'}}>
                    {this.queue.getTotalTimeString()+"   "}
                    ({this.queue.totalDistance}
                    {this.queue.defaultUnit})</Text>
                </View>
            
            </View>
            );
    }
    stopScroller () {
        console.log(this.colorScheme)
        let stopScrollerStyle = StyleSheet.create({
            scroller:{
                flex:1,
            }
        });
        return(
            <ScrollView style={stopScrollerStyle.scroller}>
                {this.queue.getStops().map((entry, index) => this.stopEntry(entry, index))}
            </ScrollView>
        )
    }
    stopEntry(stop, index) {
        console.log(index)
        // console.log("Logging stop: ", stop)
        if (stop.completed == true) {
            var dotColor = this.colorScheme[3]
        } 
        else {
            var dotColor = this.colorScheme[2]
        }
        let styles = StyleSheet.create({
            entry:{
                height:60,
                width:"97%",
                flexDirection:"row",
                borderRadius:  5,
                margin:5,
                backgroundColor:this.colorScheme[1],
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
                flex:1,
                alignItems:"flex-end",
                marginRight: 5
            },
            address:{
                position:"absolute", 
                top:10,
                // color:"white"
            },
            layover:{
                position:"absolute", 
                bottom:10,
                // color:"white"
            },
            priority:{
                position:"absolute", 
                top:10,
                // color:"white"
            },
            time:{
                position:"absolute", 
                bottom:10,
                // color:"white"
            }
        })
        return(<TouchableOpacity onPress={() => this.handleStopEntryPress(index)} style={styles.entry}>
            <View style={styles.icon}>
            </View>
            <View style={styles.entryLeft}>

                <Text style={styles.address}>{stop.address}</Text>
            
                <Text style={styles.layover}>{stop.layover}</Text>
            
            </View>
            <View style={styles.entryRight}>
            
                <Text style={styles.priority}>{String(stop.priority)}</Text>
            
                <Text style={styles.time}>{stop.time.h}:{stop.time.m}</Text>
            
            </View>
        </TouchableOpacity>)
    }
    handleStopEntryPress(index) {
        this.queue.removeStop(index)
    }
    updateStops(passedQueue) {
        this.queue = passedQueue;
        // console.log("Queue: ", this.queue)
    }
    bottomBar() {
        let bottomBarStyle = StyleSheet.create({
            bar:{
                backgroundColor:this.colorScheme[0],
                height:60,
                flexDirection:"row"
            },
            add:{
                flex:1,
                alignItems:"center",
                justifyContent:"center"
            },
            go:{
                flex:1, 
                alignItems:"center",
                justifyContent:"center"
            },
            delete:{
                flex:1,
                alignItems:"center",
                justifyContent:"center"
            }
        });
        return(
            // bar
            <View style={bottomBarStyle.bar}>
               
                {/* add */}
                <TouchableOpacity onPress={this.handleAddPress} style={bottomBarStyle.add}>
                    <Text style={{color:'white'}}>Add</Text>
                </TouchableOpacity>
    
                {/* go  */}
                <TouchableOpacity onPress={this.handleGoPress} style={bottomBarStyle.go}>
                    <Text style={{color:'white'}}>GO</Text>
                </TouchableOpacity>
                
                {/* delete */}
                <TouchableOpacity onPress={this.handleDeletePress}style={bottomBarStyle.delete}>
                    <Text style={{color:'white'}}>Reset</Text>
                </TouchableOpacity>
            </View>
        )
    }
    handleAddPress() {
        //bring you to a screen with details on the Stop object. Predictions of text for the address
        console.log("add")
    }
    handleGoPress() {
        //If start is defined, optimize from start.
        //If start is not defined , 
        console.log("go")
    }
    handleDeletePress() {
        console.log("delete")
    }
}