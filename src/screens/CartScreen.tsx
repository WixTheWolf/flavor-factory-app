import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { CartItem } from '../types';
import Icon from 'react-native-vector-icons/Ionicons';

interface CartScreenProps {
  navigation: any;
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleRemoveItem = (itemId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from the PO?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => {
            dispatch({
              type: 'REMOVE_FROM_CART',
              payload: itemId,
            });
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { id: itemId, quantity },
      });
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Empty Order', 'Please add items to your purchase order before checkout');
      return;
    }
    navigation.navigate('Checkout');
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.unitPrice}>${item.price.toFixed(2)}/{item.unit}</Text>
        
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() =>
              handleUpdateQuantity(item.id, item.cartQuantity - 1)
            }
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{item.cartQuantity}</Text>
          <TouchableOpacity
            onPress={() =>
              handleUpdateQuantity(item.id, item.cartQuantity + 1)
            }
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.itemActions}>
        <Text style={styles.itemTotal}>
          ${(item.price * item.cartQuantity).toFixed(2)}
        </Text>
        <TouchableOpacity
          onPress={() => handleRemoveItem(item.id)}
          style={styles.removeButton}
        >
          <Icon name="trash-outline" size={20} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Icon name="document-outline" size={64} color="#ddd" />
          <Text style={styles.emptyTitle}>Purchase Order is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Add bulk products to create a Purchase Order
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Items:</Text>
          <Text style={styles.summaryValue}>{items.length}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Estimated Total:</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Icon name="document-outline" size={18} color="#fff" />
          <Text style={styles.checkoutButtonText}>Complete Purchase Order</Text>
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
  listContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  unitPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    width: 90,
  },
  quantityButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  quantityButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  quantityValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    width: 30,
    textAlign: 'center',
  },
  itemActions: {
    marginLeft: 12,
    alignItems: 'flex-end',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  removeButton: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
  checkoutButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CartScreen;
