import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { Product as ProductType } from '../types';
import ProductCard from '../components/ProductCard';

const ProductsScreen: React.FC<any> = ({ navigation }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { width } = useWindowDimensions();

  const gridConfig = useMemo(() => {
    const horizontalPadding = 16;
    const columnGap = 10;
    const numColumns = width >= 980 ? 4 : width >= 720 ? 3 : width >= 420 ? 2 : 1;
    const cardWidth = (width - horizontalPadding - (numColumns - 1) * columnGap) / numColumns;

    return { numColumns, cardWidth, columnGap };
  }, [width]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const mockProducts: any[] = [
        {
          id: '1',
          name: 'Natural Vanilla Extract FL',
          description: 'Premium natural vanilla flavoring for bakery applications. FDA compliant, soluble in both water and oil bases.',
          price: 18.50,
          bulkPrice: 16.99,
          moq: 5,
          image: 'https://via.placeholder.com/300x200?text=Vanilla+Flavor',
          category: 'Bakery Flavors',
          unit: 'lbs',
          inStock: true,
          applications: ['Cakes', 'Cookies', 'Pastries', 'Bread'],
          spec: 'Natural Vanilla Bean Extract, 40-42% Guaiacol',
        },
        {
          id: '2',
          name: 'Strawberry Flavor Concentrate',
          description: 'Water-soluble strawberry flavor for beverages and dairy. High impact, natural note profile.',
          price: 24.99,
          bulkPrice: 22.50,
          moq: 10,
          image: 'https://via.placeholder.com/300x200?text=Strawberry+Flavor',
          category: 'Beverage & Dairy',
          unit: 'gallons',
          inStock: true,
          applications: ['Beverages', 'Yogurt', 'Ice Cream', 'Smoothies'],
          spec: 'Water-soluble concentrate, 30% flavor load',
        },
        {
          id: '3',
          name: 'Spearmint Flavor (Pharma Grade)',
          description: 'Pharmaceutical-grade spearmint flavor. USP/FCC compliant, suitable for oral formulations.',
          price: 32.75,
          bulkPrice: 29.99,
          moq: 2,
          image: 'https://via.placeholder.com/300x200?text=Spearmint+Flavor',
          category: 'Oral Care & Pharma',
          unit: 'lbs',
          inStock: true,
          applications: ['Toothpaste', 'Mouthwash', 'Pharma Liquids'],
          spec: 'USP/FCC Grade Spearmint Oil, 100% Pure',
        },
        {
          id: '4',
          name: 'Blueberry Nutra Flavor',
          description: 'Natural blueberry flavoring for nutraceutical supplements. Heat stable, compatible with vitamin formulations.',
          price: 28.99,
          bulkPrice: 26.50,
          moq: 5,
          image: 'https://via.placeholder.com/300x200?text=Blueberry+Flavor',
          category: 'Nutraceutical',
          unit: 'lbs',
          inStock: true,
          applications: ['Vitamin Syrups', 'Supplements', 'Protein Powders'],
          spec: 'Natural Blueberry Extract, Heat Stable up to 150°C',
        },
        {
          id: '5',
          name: 'Menthol Flavor Oil',
          description: 'Pure menthol compound for vape and confectionery. Available in multiple strengths.',
          price: 45.00,
          bulkPrice: 41.00,
          moq: 3,
          image: 'https://via.placeholder.com/300x200?text=Menthol+Flavor',
          category: 'Vape & Confectionery',
          unit: 'lbs',
          inStock: true,
          applications: ['E-Liquids', 'Candies', 'Lozenges'],
          spec: 'Natural Menthol Oil, 99.5% Pure',
        },
        {
          id: '6',
          name: 'Caramel Syrup Flavor',
          description: 'Rich caramel flavor compound for syrup production. Water and alcohol soluble.',
          price: 15.99,
          bulkPrice: 14.50,
          moq: 10,
          image: 'https://via.placeholder.com/300x200?text=Caramel+Flavor',
          category: 'Syrups',
          unit: 'gallons',
          inStock: true,
          applications: ['Coffee Syrups', 'Dessert Syrups', 'Beverage Syrups'],
          spec: 'Concentrated caramel compound, 1:4 mixing ratio',
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

  const handleProductPress = (product: ProductType) => {
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
          <View style={[styles.cardWrapper, { width: gridConfig.cardWidth, marginBottom: gridConfig.columnGap }]}>
            <ProductCard
              product={item}
              onPress={() => handleProductPress(item)}
            />
          </View>
        )}
        key={String(gridConfig.numColumns)}
        keyExtractor={(item) => item.id}
        numColumns={gridConfig.numColumns}
        columnWrapperStyle={gridConfig.numColumns > 1 ? styles.row : undefined}
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
    gap: 10,
  },
  cardWrapper: {
    alignSelf: 'stretch',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductsScreen;
