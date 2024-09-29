import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const WorkScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Ongoing');

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      {['Ongoing', 'Invitations', 'Finished'].map((tab) => (
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

  const renderContent = () => {
    switch (activeTab) {
      case 'Ongoing':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Ongoing tasks content</Text>
            {/* Add your ongoing tasks list or components here */}
          </View>
        );
      case 'Invitations':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Invitations content</Text>
            {/* Add your invitations list or components here */}
          </View>
        );
      case 'Finished':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>Finished tasks content</Text>
            {/* Add your finished tasks list or components here */}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Work Dashboard</Text>
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
  contentText: {
    fontSize: 16,
    color: '#1f2937',
  },
});

export default WorkScreen;