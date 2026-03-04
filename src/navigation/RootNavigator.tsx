import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CheckoutScreen from '../screens/CheckoutScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProductsStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: '#FF6B35',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="Products"
      component={ProductsScreen}
      options={{ title: 'Shop' }}
    />
    <Stack.Screen
      name="ProductDetails"
      component={ProductDetailsScreen}
      options={{ title: 'Product Details' }}
    />
  </Stack.Navigator>
);

const CartStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: '#FF6B35',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="CartTab"
      component={CartScreen}
      options={{ title: 'Shopping Cart' }}
    />
    <Stack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{ title: 'Checkout' }}
    />
  </Stack.Navigator>
);

const AboutStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: '#FF6B35',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="AboutTab"
      component={AboutUsScreen}
      options={{ title: 'About Us' }}
    />
  </Stack.Navigator>
);

const ProfileStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: '#FF6B35',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{ title: 'Profile' }}
    />
    <Stack.Screen
      name="Orders"
      component={OrdersScreen}
      options={{ title: 'My Orders' }}
    />
  </Stack.Navigator>
);

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = '';
            if (route.name === 'ProductsStack') {
              iconName = focused ? 'storefront' : 'storefront-outline';
            } else if (route.name === 'CartStack') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'AboutStack') {
              iconName = focused ? 'information-circle' : 'information-circle-outline';
            } else if (route.name === 'ProfileStack') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF6B35',
          tabBarInactiveTintColor: '#999',
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="ProductsStack"
          component={ProductsStackNavigator}
          options={{ tabBarLabel: 'Shop' }}
        />
        <Tab.Screen
          name="CartStack"
          component={CartStackNavigator}
          options={{ tabBarLabel: 'Cart' }}
        />
        <Tab.Screen
          name="AboutStack"
          component={AboutStackNavigator}
          options={{ tabBarLabel: 'About' }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStackNavigator}
          options={{ tabBarLabel: 'Profile' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
