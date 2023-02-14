import React, { useState, Component, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';



export default class GUIFavs extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <View style={{backgroundColor:"red", flex:1}}>
                <AddressSearch/>
            </View>
        )
    }
}

const AddressSearch = () => {
  const [query, setQuery] = useState('');
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (!query) return setAddresses([]);



    // Use a fetch API to get address predictions from the internet
    fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${query}`)
      .then(response => response.json())
      .then(data => setAddresses(data))
      .catch(error => console.error(error));
  }, [query]);

  try{
    console.log(addresses[0].display_name)
    console.log(addresses[0].lon)
    console.log(addresses[0].lat)
  }
  catch(err) {}

  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter address"
        value={query}
        onChangeText={text => setQuery(text)}
      />
      {addresses.length > 0 && (
        <FlatList
          style={styles.addressList}
          data={addresses}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.addressItem}>
              <Text>{item.formatted_address}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  addressList: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  addressItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
});
