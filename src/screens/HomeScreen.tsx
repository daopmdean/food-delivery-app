import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Restaurant } from '../types';

// Mock data - In a real app, this would come from an API
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    cuisine: 'American',
    rating: 4.5,
    deliveryTime: '20-30 min',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    name: 'Pizza Express',
    cuisine: 'Italian',
    rating: 4.3,
    deliveryTime: '25-35 min',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Sushi Master',
    cuisine: 'Japanese',
    rating: 4.7,
    deliveryTime: '30-40 min',
    image: 'https://via.placeholder.com/150',
  },
];

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Restaurant', { restaurant })}
    >
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
        <View style={styles.details}>
          <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
          <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockRestaurants}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cuisine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen; 