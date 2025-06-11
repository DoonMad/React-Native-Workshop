import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchCityCoordinates, requestLocationPermission } from '../api/weather';

export default function Index() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetLocationWeather = async () => {
    try {
      setLoading(true);
      setError('');
      const location = await requestLocationPermission();
      console.log(location.coords.latitude, location.coords.longitude);
      // const cityName = await getCityFromCoords(location.coords.latitude, location.coords.longitude);
      // console.log(cityName);
      // router.push(`/${cityName}`);
      router.push({
        pathname: './weather',
        params: { lat: location.coords.latitude, lon: location.coords.longitude },
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async() => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const { lat, lon } = await fetchCityCoordinates(city.trim());
      router.push({
        pathname: '/weather',
        params: { lat, lon }
      });
      setCity("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌤️ Weather App</Text>
      
      <TouchableOpacity 
        style={styles.locationButton}
        onPress={handleGetLocationWeather}
        disabled={loading}
      >
        <Icon name="crosshairs-gps" size={20} color="#fff" />
        <Text style={styles.locationButtonText}>
          {loading ? 'Detecting Location...' : 'Use My Current Location'}
        </Text>
      </TouchableOpacity>
      
      <Text style={styles.orText}>- OR -</Text>
      
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={setCity}
        placeholder="Enter city name"
        placeholderTextColor="#999"
        onSubmitEditing={handleSearch}
      />
      
      <Button 
        title="Search" 
        onPress={handleSearch} 
        disabled={loading}
      />
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {loading ? <ActivityIndicator size="large" style={styles.loader} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a73e8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center'
  },
  locationButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500'
  },
  orText: {
    marginVertical: 15,
    color: '#666'
  },
  errorText: {
    color: '#e74c3c',
    marginTop: 20,
    textAlign: 'center'
  },
  loader: {
    marginTop: 20
  }
});