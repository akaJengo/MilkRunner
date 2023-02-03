import { Component } from "react";
import { Text, View, StyleSheet } from "react-native";


export default class GUIList extends Component {
    render(){
        return (
            <View style={{height:"100%"}}>
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
        let stopScrollerStyle = StyleSheet.create({
            scroller:{
                flex:1
            }
        });
        return(
            // scroller
            <View style={stopScrollerStyle.scroller}>
                <Text>Test</Text>
            </View>
        )
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
                <View style={bottomBarStyle.add}>
                    <Text>Add</Text>
                </View>
    
                {/* go  */}
                <View style={bottomBarStyle.go}>
                    <Text>GO</Text>
                </View>
                
                {/* delete */}
                <View style={bottomBarStyle.delete}>
                    <Text>Reset</Text>
                </View>
            </View>
        )
    }
}