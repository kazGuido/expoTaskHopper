import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ServicesList from './ServiceList';
import CategoryGrid from './CategoryGrid';
import Layout from './Layout';

export default function HomeScreen({ navigation }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleMenuToggle = () => {
    navigation.openDrawer(); // Open the drawer for the burger menu
  };

  const handleNotificationToggle = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <Layout>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuToggle} style={styles.iconButton}>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            placeholder="Search..."
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity onPress={handleNotificationToggle} style={styles.iconButton}>
          <Ionicons name="notifications" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Welcome to Home Screen</Text>
        <CategoryGrid />
        <ServicesList />
      </ScrollView>

      {showNotifications && (
        <View style={styles.notificationsContainer}>
          <Text style={styles.notificationsTitle}>Notifications</Text>
          {/* Add your notifications content here */}
        </View>
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  iconButton: {
    padding: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    marginHorizontal: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 36,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationsContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  notificationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});