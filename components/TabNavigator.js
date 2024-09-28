// TabNavigator.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Layout from './Layout';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import BookingsScreen from './BookingsScreen';
import AccountScreen from './AccountScreen';

const TabNavigator = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Search':
        return <SearchScreen />;
      case 'Bookings':
        return <BookingsScreen />;
      case 'Account':
        return <AccountScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <Layout>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => setActiveTab('Home')} style={styles.navItem}>
          <Ionicons name="home" size={24} color={activeTab === 'Home' ? '#14b8a6' : '#6b7280'} />
          <Text style={[styles.navText, activeTab === 'Home' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Search')} style={styles.navItem}>
          <Ionicons name="search" size={24} color={activeTab === 'Search' ? '#14b8a6' : '#6b7280'} />
          <Text style={[styles.navText, activeTab === 'Search' && styles.activeNavText]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Bookings')} style={styles.navItem}>
          <Ionicons name="calendar" size={24} color={activeTab === 'Bookings' ? '#14b8a6' : '#6b7280'} />
          <Text style={[styles.navText, activeTab === 'Bookings' && styles.activeNavText]}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Account')} style={styles.navItem}>
          <Ionicons name="person" size={24} color={activeTab === 'Account' ? '#14b8a6' : '#6b7280'} />
          <Text style={[styles.navText, activeTab === 'Account' && styles.activeNavText]}>Account</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#6b7280',
  },
  activeNavText: {
    color: '#14b8a6',
  },
});

export default TabNavigator;
