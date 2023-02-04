import { Component } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"; 

export default class GUIList extends Component {
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
                flexDirection:"row"
            },
            menuIcon:{
                backgroundColor:"red",
                width:60,
                justifyContent:"center",
                alignItems:"center"
            },
            info:{
                backgroundColor:"orange",
                flex:1,
                alignItems:"center",
                justifyContent:"center"
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
                    <Text>Info goes here</Text>
                </View>
            
            </View>
            );
    }
    stopScroller () {
        // console.log("this is the queue: ", this.queue)
        let stopScrollerStyle = StyleSheet.create({
            scroller:{
                flex:1,
                backgroundColor:"dodgerblue"
            }
        });
        return(
            <ScrollView style={stopScrollerStyle.scroller}>
                {/* {this.stopEntry(this.queue[0])} */}
                {this.queue.map((entry) => this.stopEntry(entry))}
            </ScrollView>
        )
    }
    stopEntry(stop) {
        // console.log("Logging stop: ", stop)
        let styles = StyleSheet.create({
            entry:{
                height:60,
                width:"100%",
                flexDirection:"row"
            },
            icon:{
                backgroundColor:"purple",
                width:60,
                height:"100%"
            },
            entryLeft:{
                backgroundColor:"pink", 
                flex:1
            },
            entryRight:{
                backgroundColor:"yellow", 
                flex:1,
                alignItems:"flex-end"
            },
            address:{
                position:"absolute", 
                top:10
            },
            layover:{
                position:"absolute", 
                bottom:10
            },
            
            priority:{
                position:"absolute", 
                top:10
            },
            time:{
                position:"absolute", 
                bottom:10
            }
        })
        return(<View style={styles.entry}>
            <View style={styles.icon}>
                <Text>Icon</Text>
            </View>
            <View style={styles.entryLeft}>

                <Text style={styles.address}>{stop.address}</Text>
            
                <Text style={styles.layover}>{stop.layover}</Text>
            
            </View>
            <View style={styles.entryRight}>
            
                <Text style={styles.priority}>{String(stop.priority)}</Text>
            
                <Text style={styles.time}>{stop.time.h}:{stop.time.m}</Text>
            
            </View>
        </View>)
    }
    updateStops(passedQueue) {
        this.queue = passedQueue;
        // console.log("Queue: ", this.queue)
    }
    bottomBar() {
        let bottomBarStyle = StyleSheet.create({
            bar:{
                backgroundColor:"gold",
                height:60,
                flexDirection:"row"
            },
            add:{
                backgroundColor:"hotpink",
                flex:1,
                alignItems:"center",
                justifyContent:"center"
            },
            go:{
                backgroundColor:"khaki",
                flex:1, 
                alignItems:"center",
                justifyContent:"center"
            },
            delete:{
                backgroundColor:"lightsalmon",
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
                    <Text>Add</Text>
                </TouchableOpacity>
    
                {/* go  */}
                <TouchableOpacity onPress={this.handleGoPress} style={bottomBarStyle.go}>
                    <Text>GO</Text>
                </TouchableOpacity>
                
                {/* delete */}
                <TouchableOpacity onPress={this.handleDeletePress}style={bottomBarStyle.delete}>
                    <Text>Reset</Text>
                </TouchableOpacity>
            </View>
        )
    }
    handleAddPress() {
        console.log("add")
    }
    handleGoPress() {
        console.log("go")
    }
    handleDeletePress() {
        console.log("delete")
    }
}