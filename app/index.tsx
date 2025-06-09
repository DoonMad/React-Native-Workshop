import { router } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
export default function Index() {
  const [city, setCity] = useState("");
  // const apiKey = API_KEY;
  // const getWeather = async() => {
  //   router.push(`./${city}`)
  //   // const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  //   // console.log(await response.json());
  // }
  return (
    <View 
      style={styles.container}
    >
      <View
        style={{
          width: '100%',
          padding: 20,
        }}
      >
        <Text>City</Text>
        <TextInput 
          value={city}
          onChangeText={setCity}
          placeholder="Enter your city"
        />
        <Button 
          title="Get Weather"
          onPress={() => router.push(`./${city}`) }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue', // Light blue theme
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
})
