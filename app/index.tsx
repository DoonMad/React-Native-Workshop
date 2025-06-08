import { useState } from "react";
import { Text, View, TextInput, Button } from "react-native";

export default function Index() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  if(parseInt(height) < 0 || parseInt(weight) < 0) {
    alert("Enter both height and weight.");
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Height (in cm)</Text>
      <TextInput 
        placeholder="Enter your height in cm"
        value={height}
        onChangeText={setHeight}
        style={{borderColor: 'black', borderWidth: 2, width: '80%', margin: 10, borderRadius: 7}}
      />
      <Text>Weight (in kg)</Text>
      <TextInput 
        placeholder="Enter your weight in kg"
        value={weight}
        onChangeText={setWeight}
        style={{borderColor: 'black', borderWidth: 2, width: '80%', margin: 10, borderRadius: 7}}
      />

      <Button 
        title={"Calculate BMI"}  
        onPress={() => {
          const heightInMeters = parseFloat(height) / 100;
          const weightInKg = parseFloat(weight);
          const bmi = weightInKg / (heightInMeters * heightInMeters);
          let status;
          if (bmi < 18.5) {
            status = "Underweight";
          } else if (bmi < 25) {
            status = "Normal";
          } else if (bmi < 30) {
            status = "Overweight";
          } else{
            status = "Obese";
          }
          alert(`Your BMI is ${bmi.toFixed(2)}. You are ${status}.`);
        }}
      />
    </View>
  );
}
