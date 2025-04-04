import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Import screens (we'll create these next)
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderTrackingScreen from '../screens/OrderTrackingScreen';
import RestaurantScreen from '../screens/RestaurantScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Restaurants' }} />
      <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{ title: 'Restaurant Menu' }} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} options={{ title: 'Track Order' }} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Orders') {
              iconName = focused ? 'list' : 'list-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF6B6B',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 