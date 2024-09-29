import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { fetchServices } from '../lib/appwrite';

export function HomePage() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadServices = async () => {
      try {
        const documents = await fetchServices();
        const servicesData = documents.map((doc) => ({
          $id: doc.$id,
          name: doc.name,
          description: doc.description,
          image: doc.image,
          location_id: doc.location_id,
        }));
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    loadServices();
  }, []);

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    // Implement search functionality here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Tasks Done with TaskHopper</Text>
      <Text style={styles.subtitle}>Find skilled professionals for all your home, personal, and business needs.</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="What do you need help with?"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Popular Services</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.serviceButton}>
            <Text style={styles.serviceButtonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>How TaskHopper Works</Text>
      {/* Add the "How TaskHopper Works" section here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  serviceButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  serviceButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
