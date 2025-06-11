import { useState } from "react";
import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { LinearGradient } from 'expo-linear-gradient'; // Changed to expo-linear-gradient
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Index() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) {
      Alert.alert("Error", "Please enter both height and weight.");
      return;
    }
    
    const heightValue = parseFloat(height);
    const weightValue = parseFloat(weight);
    
    if (isNaN(heightValue) || isNaN(weightValue) || heightValue <= 0 || weightValue <= 0) {
      Alert.alert("Error", "Please enter valid positive numbers.");
      return;
    }

    const heightInMeters = heightValue / 100;
    const bmi = weightValue / (heightInMeters * heightInMeters);
    
    let status;
    if (bmi < 18.5) {
      status = "Underweight";
    } else if (bmi < 25) {
      status = "Normal";
    } else if (bmi < 30) {
      status = "Overweight";
    } else {
      status = "Obese";
    }

    Alert.alert(
      "BMI Result",
      `Your BMI is ${bmi.toFixed(2)}. You are ${status}.`,
      [{ text: "OK" }]
    );
    setHeight("");
    setWeight("");
  };

  return (
    <View
      style={styles.container}
    >
      <StatusBar barStyle={'light-content'}/>
      <View style={styles.card}>
        <Text style={styles.title}>BMI Calculator</Text>
        
        <View style={styles.inputContainer}>
          <Icon name="human-male-height" size={24} color="#fff" style={styles.icon} />
          <TextInput 
            placeholder="Enter height in cm"
            placeholderTextColor="#aaa"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="weight-kilogram" size={24} color="#fff" style={styles.icon} />
          <TextInput 
            placeholder="Enter weight in kg"
            placeholderTextColor="#aaa"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={calculateBMI}
        >
          <Text style={styles.buttonText}>Calculate BMI</Text>
          <Icon name="calculator" size={20} color="#fff" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#181818'
  },
  card: {
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: '#646464',
    width: '100%',
    padding: 25,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: 10,
  },
});