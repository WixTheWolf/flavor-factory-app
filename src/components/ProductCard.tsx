import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ProductCardProps {
  product: any;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>

        {product.applications && (
          <View style={styles.appsContainer}>
            <Text style={styles.appsText}>{product.applications.slice(0, 2).join(', ')}</Text>
          </View>
        )}

        <View style={styles.moqContainer}>
          <Icon name="cube-outline" size={12} color="#666" />
          <Text style={styles.moqText}>MOQ: {product.moq} {product.unit}</Text>
        </View>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.priceLabel}>Unit</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View>
            <Text style={styles.priceLabel}>Bulk</Text>
            <Text style={[styles.price, styles.bulkPrice]}>
              ${product.bulkPrice.toFixed(2)}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Icon name="add-circle-outline" size={16} color="#fff" />
          <Text style={styles.buttonText}>View Details</Text>
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
    marginHorizontal: 4,
    marginVertical: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: '#FFF3E0',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 10,
    color: '#FF6B35',
    fontWeight: '500',
  },
  appsContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  appsText: {
    fontSize: 9,
    color: '#1976D2',
    fontWeight: '500',
  },
  moqContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  moqText: {
    fontSize: 9,
    color: '#666',
    marginLeft: 3,
    fontWeight: '500',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 8,
    color: '#999',
    marginBottom: 2,
  },
  price: {
    fontSize: 11,
    fontWeight: '700',
    color: '#333',
  },
  bulkPrice: {
    color: '#FF6B35',
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#eee',
  },
  button: {
    backgroundColor: '#FF6B35',
    borderRadius: 4,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 3,
  },
});

export default ProductCard;
