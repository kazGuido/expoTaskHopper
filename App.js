// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './components/TabNavigator'; // Import the TabNavigator
import { ServiceBookingWizard } from './components/ServiceBookingWizard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="ServiceBookingWizard" component={ServiceBookingWizard} options={{ title: 'Book Service' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
