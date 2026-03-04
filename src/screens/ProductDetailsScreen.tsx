import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ProductDetailsScreenProps {
  route: any;
  navigation: any;
}

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(product.moq);

  const handleAddToCart = () => {
    if (quantity < product.moq) {
      Alert.alert(
        'Minimum Order Quantity',
        `Minimum order quantity is ${product.moq} ${product.unit}`
      );
      return;
    }
    Alert.alert(
      'Success',
      `${quantity} ${product.unit} of ${product.name} added to purchase order!`
    );
  };

  const getPrice = (qty: number) => {
    return qty >= product.moq ? product.bulkPrice : product.price;
  };

  const handleQuantityChange = (text: string) => {
    const num = parseInt(text) || 0;
    setQuantity(Math.max(0, num));
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.content}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        <View style={styles.specContainer}>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Category</Text>
            <Text style={styles.specValue}>{product.category}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Unit</Text>
            <Text style={styles.specValue}>{product.unit}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Stock</Text>
            <Text style={[styles.specValue, { color: '#4CAF50' }]}>In Stock</Text>
          </View>
        </View>

        <View style={styles.pricingSection}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceLabel}>Unit Price (1-{product.moq - 1} {product.unit})</Text>
              <Text style={styles.priceValue}>${product.price.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View>
              <Text style={styles.priceLabel}>Bulk Price ({product.moq}+ {product.unit})</Text>
              <Text style={[styles.priceValue, styles.bulkPriceValue]}>
                ${product.bulkPrice.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.quantitySection}>
          <Text style={styles.sectionTitle}>Order Quantity</Text>
          <View style={styles.quantityInputContainer}>
            <TextInput
              style={styles.quantityInput}
              keyboardType="number-pad"
              value={quantity.toString()}
              onChangeText={handleQuantityChange}
              placeholder={`Min: ${product.moq}`}
            />
            <Text style={styles.unitLabel}>{product.unit}</Text>
          </View>
          {quantity < product.moq && (
            <Text style={styles.warningText}>
              ⚠️ Minimum order is {product.moq} {product.unit}
            </Text>
          )}
          {quantity >= product.moq && (
            <Text style={styles.successText}>
              ✓ Bulk pricing applied
            </Text>
          )}
        </View>

        <View style={styles.estimateContainer}>
          <Text style={styles.estimateLabel}>Total Estimate:</Text>
          <Text style={styles.estimatePrice}>
            ${(quantity * getPrice(quantity)).toFixed(2)}
          </Text>
          <Text style={styles.estimateBreakdown}>
            {quantity} × ${getPrice(quantity).toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.addToPOButton, quantity < product.moq && styles.disabledButton]}
          onPress={handleAddToCart}
        >
          <Icon name="document-outline" size={20} color="#fff" />
          <Text style={styles.addToPOButtonText}>Add to Purchase Order</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.requestQuoteButton}>
          <Icon name="mail-outline" size={18} color="#FF6B35" />
          <Text style={styles.requestQuoteButtonText}>Request Custom Quote</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  specContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  specItem: {
    flex: 1,
    alignItems: 'center',
  },
  specLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  pricingSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  bulkPriceValue: {
    color: '#FF6B35',
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: '#ddd',
    marginHorizontal: 12,
  },
  quantitySection: {
    marginBottom: 20,
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  quantityInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  unitLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginLeft: 8,
  },
  warningText: {
    fontSize: 12,
    color: '#F44336',
    fontWeight: '500',
  },
  successText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  estimateContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
    alignItems: 'center',
  },
  estimateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  estimatePrice: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 4,
  },
  estimateBreakdown: {
    fontSize: 12,
    color: '#999',
  },
  addToPOButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  addToPOButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  requestQuoteButton: {
    borderColor: '#FF6B35',
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  requestQuoteButtonText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default ProductDetailsScreen;
