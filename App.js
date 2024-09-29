import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './components/TabNavigator';
import Layout from './components/Layout';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Layout>
        <Drawer.Navigator>
          <Drawer.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
          {/* Add other drawer screens here */}
        </Drawer.Navigator>
      </Layout>
    </NavigationContainer>
  );
}