// components/Layout.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // You can adjust this padding as needed
    backgroundColor: '#f9f9f9', // Background color for the layout
  },
});

export default Layout;
