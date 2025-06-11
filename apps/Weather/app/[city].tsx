import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchWeatherByCity, WeatherData } from '../api/weather';

const WeatherDetails = () => {
  const { city } = useLocalSearchParams();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchWeatherByCity(city as string);
        setWeather(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [city]);

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleRefresh = () => {
    router.replace(`/${city}`);
  };

  if (loading) {
    return (
      <LinearGradient colors={['#1a73e8', '#6ec6ff']} style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    );
  }

  if (error || !weather) {
    return (
      <LinearGradient colors={['#1a73e8', '#6ec6ff']} style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Icon name="refresh" size={20} color="#fff" />
          <Text style={styles.refreshText}>Try Again</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1a73e8', '#6ec6ff']} style={styles.container}>
      <Stack.Screen 
        options={{
          title: `Weather in ${city.toString().toUpperCase()}`,
          headerStyle: { backgroundColor: '#1a73e8' },
          headerTintColor: '#fff',
        }}
      />

      <View style={styles.content}>
        <View style={styles.locationContainer}>
          <Text style={styles.city}>{weather.name}, {weather.sys.country}</Text>
          <Text style={styles.date}>
            {new Date(weather.dt * 1000).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
          </Text>
        </View>

        <View style={styles.weatherMain}>
          <View style={styles.tempContainer}>
            <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
            <Text style={styles.feelsLike}>Feels like {Math.round(weather.main.feels_like)}°</Text>
          </View>
          
          <View style={styles.weatherIcon}>
            <Image 
              source={{uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}} 
              style={styles.weatherImage}
            />
            <Text style={styles.desc}>{weather.weather[0].description}</Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Icon name="water" size={24} color="#4cc9f0" />
                <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
                <Text style={styles.detailLabel}>Humidity</Text>
              </View>

              <View style={styles.detailItem}>
                <Icon name="weather-windy" size={24} color="#4cc9f0" />
                <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
                <Text style={styles.detailLabel}>Wind</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Icon name="gauge" size={24} color="#4cc9f0" />
                <Text style={styles.detailValue}>{weather.main.pressure} hPa</Text>
                <Text style={styles.detailLabel}>Pressure</Text>
              </View>

              <View style={styles.detailItem}>
                <Icon name="weather-cloudy" size={24} color="#4cc9f0" />
                <Text style={styles.detailValue}>{weather.clouds.all}%</Text>
                <Text style={styles.detailLabel}>Clouds</Text>
              </View>
            </View>

            <View style={styles.sunTimes}>
              <View style={styles.sunTime}>
                <Icon name="weather-sunset-up" size={20} color="#FFD700" />
                <Text style={styles.sunTimeText}>Sunrise: {formatTime(weather.sys.sunrise)}</Text>
              </View>
              <View style={styles.sunTime}>
                <Icon name="weather-sunset-down" size={20} color="#FFD700" />
                <Text style={styles.sunTimeText}>Sunset: {formatTime(weather.sys.sunset)}</Text>
              </View>
            </View>
        </View>

        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
          <Icon name="refresh" size={20} color="#fff" />
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
  },
  locationContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  weatherMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  tempContainer: {
    alignItems: 'flex-start',
  },
  temp: {
    fontSize: 72,
    fontWeight: '200',
    color: '#fff',
  },
  feelsLike: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: -10,
  },
  weatherIcon: {
    alignItems: 'center',
  },
  weatherImage: {
    width: 120,
    height: 120,
  },
  desc: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'capitalize',
    marginTop: -15,
  },
  detailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    alignItems: 'center',
    width: '45%',
  },
  detailValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  detailLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  sunTimes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  sunTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sunTimeText: {
    color: '#fff',
    marginLeft: 5,
  },
  // errorText: {
  //   color: '#fff',
  //   fontSize: 18,
  //   textAlign: 'center',
  // },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10,
  },
  refreshText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 16,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default WeatherDetails;