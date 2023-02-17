import React, { useState, Component, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerActions } from '@react-navigation/native';

import { colorScheme } from './GlobalConst';
import Menu from "../assets/menu.svg"
import Add from "../assets/lightAdd.svg"

export default class GUIFavs extends Component {
    constructor(props) {
        super(props)
        this.openMenu = () => {
            props.navigation.dispatch(DrawerActions.openDrawer())
        }

    }
    render() {
        let style = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: colorScheme[0],
            }
        })
        return (
            <View style={style.container}>
                {this.topBar()}
                {this.favScroller()}
            </View>
        )
    }
    topBar() {
        let style = StyleSheet.create({
            bar: {
                height: 60,
                backgroundColor: colorScheme[0],
                flexDirection: "row"
            },
            menuIcon: {
                width: 60,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
            },
            info: {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            },
            addIcon: {
                width: 60,
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
            }
        })
        return (<View style={style.bar}>

            <TouchableOpacity onPress={() => this.openMenu()} style={style.menuIcon}>
                <Menu height="100%" />
            </TouchableOpacity>

            <View style={style.info}>
                <Text style={{ color: colorScheme[1], fontSize: 18 }}>
                    Favorites
                </Text>
            </View>
            <TouchableOpacity style={style.addIcon}>
                <Add />
            </TouchableOpacity>

        </View>)
    }
    favScroller() {
        return(<ScrollView>
            <Text>test</Text>
        </ScrollView>)
    }
    favEntry() {
        
    }
}
