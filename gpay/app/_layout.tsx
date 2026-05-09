// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }

import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#667eea',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Random Quotes',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="favorites" 
          options={{ 
            title: 'My Favorites',
            headerShown: false,
            animation: 'slide_from_right'
          }} 
        />
      </Stack>
    </>
  );
}