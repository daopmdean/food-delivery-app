import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';
import { placeOrder } from '../redux/ordersSlice';
import { RootState } from '../redux/store';
import { CartItem } from '../types';

const CartItemComponent = ({ item }: { item: CartItem }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.foodItem.id));
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: item.foodItem.id, quantity: newQuantity }));
    }
  };

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.foodItem.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.foodItem.name}</Text>
        <Text style={styles.itemPrice}>
          ${(item.foodItem.price * item.quantity).toFixed(2)}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.quantity - 1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleUpdateQuantity(item.quantity + 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={handleRemoveItem}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );
};

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    const order = {
      id: Date.now().toString(),
      items,
      totalAmount: total,
      status: 'pending' as const,
      restaurantId: items[0].foodItem.restaurantId,
      createdAt: new Date().toISOString(),
    };

    dispatch(placeOrder(order));
    dispatch(clearCart());
    navigation.navigate('OrderTracking', { orderId: order.id });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItemComponent item={item} />}
        keyExtractor={(item) => item.foodItem.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.checkoutButton, items.length === 0 && styles.disabledButton]}
          onPress={handlePlaceOrder}
          disabled={items.length === 0}
        >
          <Text style={styles.checkoutButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
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
  cartItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
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
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: '#FF6B6B',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#f0f0f0',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 16,
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    fontSize: 24,
    color: '#FF6B6B',
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  checkoutButton: {
    backgroundColor: '#FF6B6B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen; 