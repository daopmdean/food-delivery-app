import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../redux/store';
import { Order } from '../types';

const OrderCard = ({ order }: { order: Order }) => {
  const navigation = useNavigation();

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return '#FFA500';
      case 'preparing':
        return '#4169E1';
      case 'onTheWay':
        return '#32CD32';
      case 'delivered':
        return '#808080';
      default:
        return '#000000';
    }
  };

  return (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate('OrderTracking', { orderId: order.id })}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order #{order.id.slice(-4)}</Text>
        <Text
          style={[
            styles.orderStatus,
            { color: getStatusColor(order.status) },
          ]}
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Text>
      </View>
      <View style={styles.orderDetails}>
        <Text style={styles.orderDate}>
          {new Date(order.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.orderTotal}>
          Total: ${order.totalAmount.toFixed(2)}
        </Text>
      </View>
      <View style={styles.itemsContainer}>
        {order.items.map((item) => (
          <Text key={item.foodItem.id} style={styles.itemText}>
            {item.quantity}x {item.foodItem.name}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const OrdersScreen = () => {
  const { orders } = useSelector((state: RootState) => state.orders);

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderCard order={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders yet</Text>
          </View>
        }
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
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF6B6B',
  },
  itemsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  itemText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default OrdersScreen; 