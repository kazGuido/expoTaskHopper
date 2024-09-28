import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchServices } from '../lib/services/serviceService';

export default function ServicesList() {
  const [services, setServices] = useState([]);
  const navigation = useNavigation(); // Hook to access navigation

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const fetchedServices = await fetchServices();
      setServices(fetchedServices);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  // When a service is clicked, navigate to ServiceBookingWizard and pass the service data
  const handleServicePress = (service) => {
    navigation.navigate('ServiceBookingWizard', { service });
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity style={styles.serviceItem} onPress={() => handleServicePress(item)}>
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.subtitle}>Our Services</Text>
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.servicesList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  servicesList: {
    paddingVertical: 8,
  },
  serviceItem: {
    width: 150,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 14,
    color: '#4b5563',
  },
});