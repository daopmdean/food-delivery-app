import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { updateOrderStatus } from '../redux/ordersSlice';
import { Order } from '../types';

const OrderTrackingScreen = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { orderId } = route.params as { orderId: string };
  const order = useSelector((state: RootState) =>
    state.orders.orders.find((o) => o.id === orderId)
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!order) return;

    const simulateOrderProgress = async () => {
      setLoading(true);
      const statuses: Order['status'][] = ['pending', 'preparing', 'onTheWay', 'delivered'];
      const currentIndex = statuses.indexOf(order.status);

      for (let i = currentIndex + 1; i < statuses.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        dispatch(updateOrderStatus({ orderId: order.id, status: statuses[i] }));
      }
      setLoading(false);
    };

    simulateOrderProgress();
  }, [order, dispatch]);

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Order not found</Text>
      </View>
    );
  }

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

  const statuses: Order['status'][] = ['pending', 'preparing', 'onTheWay', 'delivered'];
  const currentIndex = statuses.indexOf(order.status);

  return (
    <View style={styles.container}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderId}>Order #{order.id.slice(-4)}</Text>
        <Text style={styles.orderTotal}>
          Total: ${order.totalAmount.toFixed(2)}
        </Text>
      </View>

      <View style={styles.timeline}>
        {statuses.map((status, index) => (
          <View key={status} style={styles.timelineItem}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor:
                    index <= currentIndex
                      ? getStatusColor(status)
                      : '#ccc',
                },
              ]}
            />
            {index < statuses.length - 1 && (
              <View
                style={[
                  styles.statusLine,
                  {
                    backgroundColor:
                      index < currentIndex
                        ? getStatusColor(status)
                        : '#ccc',
                  },
                ]}
              />
            )}
          </View>
        ))}
      </View>

      <View style={styles.statusLabels}>
        {statuses.map((status) => (
          <Text
            key={status}
            style={[
              styles.statusLabel,
              {
                color:
                  statuses.indexOf(status) <= currentIndex
                    ? getStatusColor(status)
                    : '#ccc',
              },
            ]}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Text>
        ))}
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Updating order status...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  orderInfo: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderTotal: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  timeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  statusLine: {
    flex: 1,
    height: 2,
    marginHorizontal: -10,
  },
  statusLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  statusLabel: {
    fontSize: 12,
    textAlign: 'center',
    width: 80,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
  },
});

export default OrderTrackingScreen; 