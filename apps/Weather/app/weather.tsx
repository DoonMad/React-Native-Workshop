import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AirPollutionData, fetch5DayForecast, fetchAirPollution, fetchWeatherByCoords, ForecastData, WeatherData } from '../api/weather';

const WeatherDetails = () => {
  const { lat, lon } = useLocalSearchParams();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [airQuality, setAirQuality] = useState<AirPollutionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'today' | 'forecast'>('today');

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch all data in parallel
        const [currentWeather, forecastData, airData] = await Promise.all([
          fetchWeatherByCoords(parseFloat(lat.toString()), parseFloat(lon.toString())),
          fetch5DayForecast(parseFloat(lat.toString()), parseFloat(lon.toString())),
          fetchAirPollution(parseFloat(lat.toString()), parseFloat(lon.toString()))
        ]);
        // console.log("currentweather : ",currentWeather);
        // console.log("forecast : ",forecastData);
        // console.log("air : ",airData);
        setWeather(currentWeather);
        setForecast(forecastData);
        setAirQuality(airData);
      } catch (err: any) {
        setError(err.message || 'Failed to load weather data');
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();  }, [lat, lon]);

  const formatTime = (timestamp: number) => {
    return new Date((timestamp) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleRefresh = () => {
    router.replace({
      pathname: './weather',
      params: { lat: lat, lon: lon },
    });
  };

  const getAQIDescription = (aqi: number) => {
    const descriptions = [
      'Excellent',
      'Good',
      'Moderate',
      'Poor',
      'Very Poor'
    ];
    return descriptions[aqi - 1] || 'Unknown';
  };

  const getAQIColor = (aqi: number) => {
    const colors = [
      '#4CAF50', // Good
      '#8BC34A', // Fair
      '#FFC107', // Moderate
      '#FF9800', // Poor
      '#F44336'  // Very Poor
    ];
    return colors[aqi - 1] || '#9E9E9E';
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

  // Get today's forecast from the 5-day data
  const todayForecast = forecast?.list.filter(item => {
    const itemDate = new Date(item.dt * 1000).toDateString();
    const today = new Date().toDateString();
    return itemDate === today;
  });

  // Get daily forecast (one entry per day)
  const dailyForecast = forecast?.list.reduce((acc: any[], item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc.find(d => d.date === date)) {
      acc.push({
        date,
        temp: item.main.temp,
        // temp_min: item.main.temp_min,
        icon: item.weather[0].icon,
        description: item.weather[0].description
      });
    }
    return acc;
  }, []).slice(1, 5); // Skip today and get next 4 days

  return (
    <LinearGradient colors={['#1a73e8', '#6ec6ff']} style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.locationContainer}>
            <Text style={styles.city}>{weather.name}, {weather.sys.country}</Text>
            <Text style={styles.date}>
              {new Date(weather.dt * 1000).toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
            </Text>
          </View>

          {/* Main Weather Info */}
          <View style={styles.weatherMain}>
            <View style={styles.tempContainer}>
              <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
              <Text style={styles.feelsLike}>Feels like {Math.round(weather.main.feels_like)}°</Text>
              {/* <Text style={styles.highLow}>
                H: {Math.round(weather.main.temp_max)}° L: {Math.round(weather.main.temp_min)}°
              </Text> */}
            </View>
            
            <View style={styles.weatherIcon}>
              <Image 
                source={{uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}} 
                style={styles.weatherImage}
              />
              <Text style={styles.desc}>{weather.weather[0].description}</Text>
            </View>
          </View>

          {/* Air Quality */}
          {airQuality && (
            <View style={[styles.aqiContainer, { backgroundColor: getAQIColor(airQuality.list[0].main.aqi) }]}>
              <Icon name="air-filter" size={24} color="#fff" />
              <Text style={styles.aqiText}>
                Air Quality: {getAQIDescription(airQuality.list[0].main.aqi)} (AQI: {airQuality.list[0].main.aqi})
              </Text>
            </View>
          )}

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'today' && styles.activeTab]}
              onPress={() => setActiveTab('today')}
            >
              <Text style={styles.tabText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'forecast' && styles.activeTab]}
              onPress={() => setActiveTab('forecast')}
            >
              <Text style={styles.tabText}>5-Day Forecast</Text>
            </TouchableOpacity>
          </View>

          {/* Today's Forecast */}
          {activeTab === 'today' && todayForecast && (
            <View style={styles.hourlyContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {todayForecast.map((item, index) => (
                  <View key={index} style={styles.hourlyItem}>
                    <Text style={styles.hourlyTime}>{formatTime(item.dt)}</Text>
                    <Image 
                      source={{uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}} 
                      style={styles.hourlyIcon}
                    />
                    <Text style={styles.hourlyTemp}>{Math.round(item.main.temp)}°</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* 5-Day Forecast */}
          {activeTab === 'forecast' && dailyForecast && (
            <View style={styles.dailyContainer}>
              {dailyForecast.map((day, index) => (
                <View key={index} style={styles.dailyItem}>
                  <Text style={styles.dailyDay}>
                    {new Date(day.date).toLocaleDateString([], { weekday: 'short' })}
                  </Text>
                  <Image 
                    source={{uri: `https://openweathermap.org/img/wn/${day.icon}.png`}} 
                    style={styles.dailyIcon}
                  />
                  <Text style={styles.dailyDesc}>{day.description}</Text>
                  <View style={styles.dailyTemps}>
                    <Text style={styles.dailyHigh}>{Math.round(parseFloat(day.temp))}°</Text>
                    {/* <Text style={styles.dailyLow}>{Math.round(day.temp_min)}°</Text> */}
                  </View>
                  {/* <View style={styles.dailyTemps}>
                    <Text style={styles.dailyHigh}>{Math.round(day.temp_max)}°</Text>
                    <Text style={styles.dailyLow}>{Math.round(day.temp_min)}°</Text>
                  </View> */}
                  {/* <View style={{...styles.sunTimes, flexDirection: 'column'}}>
                    <View style={styles.sunTime}>
                        <Icon name="weather-sunset-up" size={20} color="#FFD700" />
                        <Text style={{...styles.sunTimeText, fontSize: 14}}>{formatTime(day.sys.sunrise)}</Text>
                    </View>
                    <View style={styles.sunTime}>
                        <Icon name="weather-sunset-down" size={20} color="#FFD700" />
                        <Text style={{...styles.sunTimeText, fontSize: 14}}>{formatTime(day.sys.sunset)}</Text>
                    </View>
                  </View> */}
                </View>
              ))}
            </View>
          )}

          {/* Weather Details */}
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Icon name="water" size={28} color="#1c73e8" />
                <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
                <Text style={styles.detailLabel}>Humidity</Text>
              </View>

              <View style={styles.detailItem}>
                <Icon name="weather-windy" size={28} color="#1c73e8" />
                <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
                <Text style={styles.detailLabel}>Wind</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Icon name="gauge" size={28} color="#1c73e8" />
                <Text style={styles.detailValue}>{weather.main.pressure} hPa</Text>
                <Text style={styles.detailLabel}>Pressure</Text>
              </View>

              <View style={styles.detailItem}>
                <Icon name="weather-cloudy" size={28} color="#1c73e8" />
                <Text style={styles.detailValue}>{weather.clouds.all}%</Text>
                <Text style={styles.detailLabel}>Clouds</Text>
              </View>
            </View>

            {/* <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Icon name="eye" size={28} color="#1c73e8" />
                <Text style={styles.detailValue}>{weather.visibility/1000} km</Text>
                <Text style={styles.detailLabel}>Visibility</Text>
              </View>
            </View> */}

            <View style={styles.sunTimes}>
              <View style={styles.sunTime}>
                <Icon name="weather-sunset-up" size={24} color="#FFD700" />
                <Text style={styles.sunTimeText}>Sunrise: {formatTime(weather.sys.sunrise)}</Text>
              </View>
              <View style={styles.sunTime}>
                <Icon name="weather-sunset-down" size={24} color="#FFD700" />
                <Text style={styles.sunTimeText}>Sunset: {formatTime(weather.sys.sunset)}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Icon name="refresh" size={20} color="#fff" />
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
  locationContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
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
  aqiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
  },
  aqiText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '500',
  },
  weatherMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  highLow: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    color: '#fff',
    fontWeight: '500',
  },
  hourlyContainer: {
    marginBottom: 20,
  },
  hourlyItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 60,
  },
  hourlyTime: {
    color: '#fff',
    fontSize: 14,
  },
  hourlyIcon: {
    width: 40,
    height: 40,
    marginVertical: 5,
  },
  hourlyTemp: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dailyContainer: {
    marginBottom: 20,
  },
  dailyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  dailyDay: {
    color: '#fff',
    width: 60,
    fontSize: 18,
  },
  dailyIcon: {
    width: 35,
    height: 35,
  },
  dailyDesc: {
    color: '#fff',
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  dailyTemps: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
  },
  dailyHigh: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dailyLow: {
    color: 'rgba(255,255,255,0.7)',
  },
  detailsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 20,
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
    fontSize: 16,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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