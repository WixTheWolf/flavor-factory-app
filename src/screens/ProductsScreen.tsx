import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../types';
import apiService from '../services/apiService';
import ProductCard from '../components/ProductCard';

interface Product extends Product {}

const ProductsScreen: React.FC<any> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // B2B Product Mock Data - replace with API call
      const mockProducts: any[] = [
        {
          id: '1',
          name: 'Vanilla Ice Cream (Bulk)',
          description: 'Premium vanilla ice cream for food service',
          price: 2.99,
          bulkPrice: 2.49,
          moq: 50, // Minimum Order Quantity
          image: 'https://via.placeholder.com/300x200?text=Vanilla+Ice+Cream',
          category: 'Ice Cream',
          unit: 'lbs',
          inStock: true,
        },
        {
          id: '2',
          name: 'Chocolate Cake Mix (Bulk)',
          description: 'Professional chocolate cake mix for commercial use',
          price: 8.99,
          bulkPrice: 7.49,
          moq: 25,
          image: 'https://via.placeholder.com/300x200?text=Chocolate+Cake',
          category: 'Baking Mix',
          unit: 'boxes',
          inStock: true,
        },
        {
          id: '3',
          name: 'Pastry Filling (Bulk)',
          description: 'Fresh strawberry pastry filling for commercial bakeries',
          price: 12.99,
          bulkPrice: 10.99,
          moq: 10,
          image: 'https://via.placeholder.com/300x200?text=Pastry+Filling',
          category: 'Fillings',
          unit: 'gallons',
          inStock: true,
        },
        {
          id: '4',
          name: 'Coffee Beans (Wholesale)',
          description: 'Premium roasted beans for cafes and restaurants',
          price: 8.99,
          bulkPrice: 7.49,
          moq: 100,
          image: 'https://via.placeholder.com/300x200?text=Coffee+Beans',
          category: 'Coffee',
          unit: 'lbs',
          inStock: true,
        },
      ];
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      fetchProducts();
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
      setProducts(filtered);
    }
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetails', { product });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={handleSearch}
        placeholderTextColor="#999"
      />
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => handleProductPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    fontSize: 14,
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductsScreen;
