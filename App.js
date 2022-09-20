import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image,  Button, TextInput } from 'react-native';

export default function App() {
    
  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)      
    .then(response => response.json())
    .then(data => setRecipes(data.meals))
    .catch(err => {
      Alert.alert('Error', err);
    });
  }

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 1,
          width: "100%",
          borderStyle: 'dotted',
          borderTopWidth: 2,
          borderColor: 'black)',
          marginVertical: 6,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text>{item.strMeal}</Text>
            <Image style={styles.image} source={{uri: item.strMealThumb,}}/>
          </View>}
        data={recipes} 
        ItemSeparatorComponent={ItemSeparatorView} /> 
      <TextInput style={{fontSize: 18, width: 100,  borderstyle: 'dotted', borderBottomWidth: 1}} placeholder='keyword' 
        onChangeText={text => setKeyword(text)} />
      <Button title="Find" onPress={getRecipes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 80,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: 150,
    height: 80,
    textAlign: 'center',
  },
  flatlist: {
    marginTop: 50,
    fontSize: 10,
    fontWeight: "bold",
   },
});
