import { API_KEY } from '@env';
import * as Location from 'expo-location';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error('City not found');
  return await response.json();
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error('Location weather not available');
  return await response.json();
};

export const getCityFromCoords = async (lat: number, lon: number): Promise<string> => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
  );
  const data = await response.json();
  console.log(data.name)
  if (!data?.[0]?.name) throw new Error('Could not determine city');
  return data[0].name;
};

export const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') throw new Error('Permission to access location was denied');
  
  const location = await Location.getCurrentPositionAsync({});
  return location;
};