import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BookingsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Ongoing');

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {['Ongoing', 'Completed', 'Invited'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderBookingItem = (title: string, date: string, status: string) => (
    <View style={styles.bookingItem}>
      <Text style={styles.bookingTitle}>{title}</Text>
      <Text style={styles.bookingDate}>{date}</Text>
      <Text style={styles.bookingStatus}>{status}</Text>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Ongoing':
        return (
          <View style={styles.contentContainer}>
            {renderBookingItem('House Cleaning', '2023-09-15', 'In Progress')}
            {renderBookingItem('Gardening', '2023-09-18', 'Scheduled')}
          </View>
        );
      case 'Completed':
        return (
          <View style={styles.contentContainer}>
            {renderBookingItem('Plumbing Repair', '2023-09-10', 'Completed')}
            {renderBookingItem('Painting', '2023-09-05', 'Completed')}
          </View>
        );
      case 'Invited':
        return (
          <View style={styles.contentContainer}>
            {renderBookingItem('Furniture Assembly', '2023-09-20', 'Pending')}
            {renderBookingItem('Electrical Work', '2023-09-22', 'Pending')}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>My Bookings</Text>
        {renderTabs()}
        {renderContent()}
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e5e7eb',
    borderRadius: 9999,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
  },
  activeTab: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    textAlign: 'center',
    color: '#4b5563',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#ffffff',
  },
  contentContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  bookingItem: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 8,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  bookingDate: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
  },
  bookingStatus: {
    fontSize: 14,
    color: '#3b82f6',
    marginTop: 4,
  },
});

export default BookingsScreen;