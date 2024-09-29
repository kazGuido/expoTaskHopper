import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerNavigationProp } from '@react-navigation/native';
import ServicesList from './ServicesList';
import CategoryGrid from './CategoryGrid';

type HomeScreenNavigationProp = DrawerNavigationProp<{}>;

const HomeScreen: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleMenuToggle = () => {
    navigation.openDrawer();
  };

  const handleNotificationToggle = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <View style={styles.container}>
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
        <Text style={styles.title}>Welcome to Task Hopper</Text>
        <CategoryGrid />
        <ServicesList />
      </ScrollView>

      {showNotifications && (
        <View style={styles.notificationsContainer}>
          <Text style={styles.notificationsTitle}>Notifications</Text>
          {/* Add your notifications content here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    marginLeft: 16,
  },
  notificationsContainer: {
    position: 'absolute',
    top: 60,
    right: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: 'white',
    borderLeftWidth: 1,
    borderLeftColor: '#e5e7eb',
    padding: 16,
  },
  notificationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default HomeScreen;