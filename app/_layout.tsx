import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="[city]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
