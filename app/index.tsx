import { API_KEY } from '@env';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      // Reverse geocode to get city
      const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&limit=1&appid=${API_KEY}`);
      const geoData = await geoRes.json();
      console.log(geoData)

      if (geoData?.[0]?.name) {
        router.push(`/${geoData[0].name}`);
      } else {
        setErrorMsg('Could not determine your city');
      }
    })();
  }, []);

  if (errorMsg) return <Text>{errorMsg}</Text>;
  if (!location) return <ActivityIndicator size="large" color="blue" />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌤️ Weather App</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Enter your city"
      />
      <Button title="Get Weather" onPress={() => router.push(`/${city}`)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cceeff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    width: '100%',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'white'
  }
});
