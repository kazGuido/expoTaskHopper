import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: '1', name: 'Cleaning', icon: 'water' },
  { id: '2', name: 'Repair', icon: 'hammer' },
  { id: '3', name: 'Gardening', icon: 'leaf' },
  { id: '4', name: 'Painting', icon: 'color-palette' },
  { id: '5', name: 'Moving', icon: 'car' },
  { id: '6', name: 'Plumbing', icon: 'water-outline' },
  { id: '7', name: 'Electrical', icon: 'flash' },
  { id: '8', name: 'More', icon: 'ellipsis-horizontal' },
];

export default function CategoryGrid() {
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={24} color="#fff" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.subtitle}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        contentContainerStyle={styles.categoryGrid}
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
  categoryGrid: {
    paddingVertical: 8,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#14b8a6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
  },
});