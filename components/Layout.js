import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

const Layout = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Add your header content here */}
      </View>
      <View style={styles.content}>
        {children}
      </View>
      <View style={styles.footer}>
        {/* Add your footer content here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    // Header styles
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  footer: {
    // Footer styles
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 10,
  },
});

export default Layout;
