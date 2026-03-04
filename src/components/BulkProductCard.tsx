import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface BulkProductCardProps {
  product: any;
  onPress: () => void;
}

const BulkProductCard: React.FC<BulkProductCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={1}>{product.description}</Text>
        
        <View style={styles.moqContainer}>
          <Icon name="cube-outline" size={12} color="#666" />
          <Text style={styles.moqText}>MOQ: {product.moq} {product.unit}</Text>
        </View>

        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.priceLabel}>Unit Price</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          <View>
            <Text style={styles.priceLabel}>Bulk Price</Text>
            <Text style={[styles.price, styles.bulkPrice]}>
              ${product.bulkPrice.toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Icon name="cart-outline" size={16} color="#fff" />
          <Text style={styles.buttonText}>Add to PO</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: '#666',
    marginBottom: 6,
  },
  moqContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  moqText: {
    fontSize: 10,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 9,
    color: '#999',
    marginBottom: 2,
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
  bulkPrice: {
    color: '#FF6B35',
  },
  button: {
    backgroundColor: '#FF6B35',
    borderRadius: 6,
    paddingVertical: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default BulkProductCard;
