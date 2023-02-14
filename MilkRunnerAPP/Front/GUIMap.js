import { Component } from "react"
import { StyleSheet } from "react-native"
import { SafeAreaView, Text } from "react-native"
import { colorScheme } from "./GlobalConst"

export default class GUIMap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let style=StyleSheet.create({
            container:{
                flex:1,
                backgroundColor:colorScheme[0],
                justifyContent:"center",
                alignItems:"center"
            }
        })
        return(<SafeAreaView style={style.container}>
            <Text>maps r cool</Text>
        </SafeAreaView>)
    }
}