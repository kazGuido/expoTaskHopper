import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const OngoingTaskScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderSection = (title: string, content: React.ReactNode) => (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => toggleSection(title)}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons
          name={expandedSection === title ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#4b5563"
        />
      </TouchableOpacity>
      {expandedSection === title && (
        <View style={styles.sectionContent}>{content}</View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ongoing Task</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
              title="Task Location"
              description="123 Main St, Anytown USA"
            />
          </MapView>
        </View>
        {renderSection(
          'Instructions',
          <View>
            <Text style={styles.instructionText}>1. Arrive at the location</Text>
            <Text style={styles.instructionText}>2. Meet the client</Text>
            <Text style={styles.instructionText}>3. Complete the assigned task</Text>
            <Text style={styles.instructionText}>4. Confirm completion with the client</Text>
          </View>
        )}
        {renderSection(
          'Time Spent',
          <View>
            <Text style={styles.timerText}>01:23:45</Text>
          </View>
        )}
        {renderSection(
          'Additional Info',
          <View>
            <Text style={styles.infoText}>Address: 123 Main St, Anytown USA</Text>
            <Text style={styles.infoText}>Client: Jane Doe</Text>
            <Text style={styles.infoText}>Phone: (555) 123-4567</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
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
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    height: 200,
    marginBottom: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  section: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  sectionContent: {
    padding: 16,
  },
  instructionText: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
});

export default OngoingTaskScreen;