import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="[city]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="weather"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
