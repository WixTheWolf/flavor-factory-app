import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Icon from 'react-native-vector-icons/Ionicons';

interface CheckoutScreenProps {
  navigation: any;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation }) => {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [companyName, setCompanyName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmitPO = () => {
    if (!companyName || !contactEmail || !shippingAddress) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    Alert.alert(
      'Purchase Order Submitted',
      `PO #${poNumber || 'TBD'} has been submitted for review. You will receive a confirmation email shortly.`,
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('CartTab');
          },
        },
      ]
    );
  };

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="document-outline" size={64} color="#ddd" />
        <Text style={styles.emptyTitle}>No Items in Purchase Order</Text>
        <Text style={styles.emptySubtitle}>Add items before proceeding to checkout</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Total Items: {items.length}</Text>
          <Text style={styles.summaryLabel}>Total Quantity: {items.reduce((sum, item) => sum + item.cartQuantity, 0)}</Text>
          <View style={styles.divider} />
          <Text style={styles.summaryValue}>Estimated Total: ${total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Company Information *</Text>
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          value={companyName}
          onChangeText={setCompanyName}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Email"
          value={contactEmail}
          onChangeText={setContactEmail}
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Phone (Optional)"
          value={contactPhone}
          onChangeText={setContactPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping Address *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter your full shipping address"
          value={shippingAddress}
          onChangeText={setShippingAddress}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Purchase Order Details</Text>
        <TextInput
          style={styles.input}
          placeholder="PO Number (Optional)"
          value={poNumber}
          onChangeText={setPoNumber}
          placeholderTextColor="#999"
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add special notes or requirements here..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        {items.map((item) => (
          <View key={item.id} style={styles.itemSummary}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQty}>{item.cartQuantity} {item.unit}</Text>
            <Text style={styles.itemPrice}>${(item.cartQuantity * item.price).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Shipping:</Text>
          <Text style={styles.totalValue}>TBD</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.totalContainer}>
          <Text style={styles.finalTotalLabel}>Total:</Text>
          <Text style={styles.finalTotalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmitPO}
      >
        <Icon name="checkmark-circle-outline" size={20} color="#fff" />
        <Text style={styles.submitButtonText}>Submit Purchase Order</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>Back to Cart</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  summaryBox: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    textAlignVertical: 'top',
    height: 100,
  },
  itemSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  itemQty: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    minWidth: 70,
    textAlign: 'right',
  },
  divider: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  finalTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
  },
  submitButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButton: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  spacer: {
    height: 20,
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
});

export default CheckoutScreen;
