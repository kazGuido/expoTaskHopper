import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchServices } from '../lib/services/serviceService';
import { Service } from '../lib/models/Service';

const ServicesList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const navigation = useNavigation();

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

  const handleServicePress = (service: Service) => {
    navigation.navigate('ServiceBookingWizard' as never, { service } as never);
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
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
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 16,
  },
  servicesList: {
    paddingHorizontal: 16,
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

export default ServicesList;