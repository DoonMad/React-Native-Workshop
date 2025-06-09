import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "BMI Calculator",
          headerStyle: { 
            backgroundColor: '#0d6bb2',
          },
          headerShown: false,
          headerTintColor: "#fff",
          headerTitleAlign: 'center',
          // headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />
    </Stack>
  );
}