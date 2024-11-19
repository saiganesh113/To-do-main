import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import all your screen components
import SplashScreen from './Screens/splashscreen.js';
import HomeScreen from './Screens/Home.js';
// import IndexPage from './pages/indexpage';
import AddPage from './Pages/addpage.js'
import FocusPage from './Pages/focuspage.js';
import OrganizerPage from './Pages/organizer.js';
import ProfilePage from './Pages/profilepage.js';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    if (Platform.OS !== 'web') {
      Notifications.requestPermissionsAsync().then(({ status }) => {
        if (status !== 'granted') {
          alert('You need to grant notifications permission to use this feature');
        }
      });
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Index" component={IndexPage} /> */}
        <Stack.Screen name="Add" component={AddPage} />
        <Stack.Screen name="Focus" component={FocusPage} />
        <Stack.Screen name="Organizer" component={OrganizerPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
