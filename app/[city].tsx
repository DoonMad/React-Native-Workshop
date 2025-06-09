import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const WeatherDetails = () => {
  const {city} = useLocalSearchParams();
//   const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const weather = {"base": "stations", "clouds": {"all": 9}, "cod": 200, "coord": {"lat": 19.8833, "lon": 75.3333}, "dt": 1749459661, "id": 1278149, "main": {"feels_like": 38.08, "grnd_level": 936, "humidity": 30, "pressure": 1004, "sea_level": 1004, "temp": 37.2, "temp_max": 37.2, "temp_min": 37.2}, "name": "Aurangabad", "sys": {"country": "IN", "sunrise": 1749428335, "sunset": 1749476226}, "timezone": 19800, "visibility": 10000, "weather": [{"description": "clear sky", "icon": "01d", "id": 800, "main": "Clear"}], "wind": {"deg": 321, "gust": 6.14, "speed": 6.74}}

//   useEffect(() => {
//     if (city) {
//       const getWeather = async () => {
//         try {
//           const response = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//           );
//           const data = await response.json();
//           setWeather(data);
//           console.log(data);
//         } catch (error) {
//           console.error('Error fetching weather:', error);
//         } finally {
//           setLoading(false);
//         }
//       };
//       getWeather();
//     }
//   }, [city]);


  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Weather in ' + city.toString().toUpperCase(),
        }}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : weather!=null ? (
        <View style={styles.card}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Humidity: </Text>
            <Text style={styles.value}>{weather.main.humidity}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Wind: </Text>
            <Text style={styles.value}>{weather.wind.speed} m/s</Text>
          </View>
        </View>
      ) : (
        <Text>City not found.</Text>
      )}
    </LinearGradient>
  );
};

export default WeatherDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA', // Light blue theme
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  desc: {
    fontSize: 20,
    fontStyle: 'italic',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
});
