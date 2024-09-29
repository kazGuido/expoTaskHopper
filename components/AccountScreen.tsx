import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const AccountScreen: React.FC = () => {
  const renderMenuItem = (icon: string, title: string) => (
    <TouchableOpacity style={styles.menuItem}>
      <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={24} color="#4b5563" />
      <Text style={styles.menuItemText}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#4b5563" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>johndoe@example.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          {renderMenuItem('person-outline', 'Edit Profile')}
          {renderMenuItem('notifications-outline', 'Notifications')}
          {renderMenuItem('lock-closed-outline', 'Privacy & Security')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {renderMenuItem('language-outline', 'Language')}
          {renderMenuItem('moon-outline', 'Dark Mode')}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          {renderMenuItem('help-circle-outline', 'Help Center')}
          {renderMenuItem('chatbubble-outline', 'Contact Us')}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  email: {
    fontSize: 16,
    color: '#4b5563',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#ffffff',
    marginTop: 24,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 16,
  },
  logoutButton: {
    marginTop: 24,
    marginBottom: 32,
    marginHorizontal: 16,
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default AccountScreen;