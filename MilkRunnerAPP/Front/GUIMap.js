import { DrawerActions } from "@react-navigation/routers"
import { Component } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { SafeAreaView, Text } from "react-native"
import { colorScheme } from "./GlobalConst"

export default class GUIMap extends Component {
    constructor(props) {
        super(props)
        this.openMenu = () => {
            props.navigation.dispatch(DrawerActions.openDrawer())
        }
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
            <TouchableOpacity onPress={this.openMenu}>
                <Text>maps r cool</Text>
            </TouchableOpacity>
        </SafeAreaView>)
    }
}