import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { FoodItem, Restaurant } from '../types';

// Mock data - In a real app, this would come from an API
const mockMenuItems: FoodItem[] = [
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Juicy beef patty with fresh vegetables',
    price: 12.99,
    image: 'https://via.placeholder.com/150',
    category: 'Burgers',
    restaurantId: '1',
  },
  {
    id: '2',
    name: 'Cheese Burger',
    description: 'Classic burger with melted cheese',
    price: 14.99,
    image: 'https://via.placeholder.com/150',
    category: 'Burgers',
    restaurantId: '1',
  },
  {
    id: '3',
    name: 'French Fries',
    description: 'Crispy golden fries',
    price: 5.99,
    image: 'https://via.placeholder.com/150',
    category: 'Sides',
    restaurantId: '1',
  },
];

const MenuItem = ({ item }: { item: FoodItem }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = () => {
    dispatch(addToCart({ foodItem: item, quantity: 1 }));
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddToCart}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const RestaurantScreen = () => {
  const route = useRoute();
  const { restaurant } = route.params as { restaurant: Restaurant };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: restaurant.image }} style={styles.headerImage} />
        <View style={styles.headerInfo}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
          <View style={styles.headerDetails}>
            <Text style={styles.rating}>⭐ {restaurant.rating}</Text>
            <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={mockMenuItems}
        renderItem={({ item }) => <MenuItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.menuList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  headerInfo: {
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantCuisine: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  headerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 14,
    color: '#FF6B6B',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666',
  },
  menuList: {
    padding: 16,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: '100%',
    height: 150,
  },
  itemInfo: {
    padding: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RestaurantScreen; 