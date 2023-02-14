import { Component } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { colorScheme } from "./GlobalConst";

export default class GUISettings extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        let style=StyleSheet.create({
            container:{
                backgroundColor:colorScheme[0],
                flex:1,
                justifyContent:"center",
                alignItems:"center"
            }
        })
        return(<SafeAreaView style={style.container}>
            <Text>set yo shit here</Text>
        </SafeAreaView>)
    }
}