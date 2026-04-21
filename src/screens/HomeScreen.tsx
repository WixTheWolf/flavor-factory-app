import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const openWebsite = async () => {
    await Linking.openURL('https://www.flavorfactory.net/');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.heroCard}>
        <Icon name="flask" size={42} color="#FF6B35" />
        <Text style={styles.title}>The Flavor Factory</Text>
        <Text style={styles.subtitle}>
          Specialty flavor ingredients for food, beverage, and wellness brands.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What you can do in this app</Text>

        <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('ProductsStack')}>
          <Icon name="storefront-outline" size={22} color="#FF6B35" />
          <View style={styles.actionTextWrap}>
            <Text style={styles.actionTitle}>Browse Products</Text>
            <Text style={styles.actionDescription}>Explore catalog items and view product details.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('CartStack')}>
          <Icon name="cart-outline" size={22} color="#FF6B35" />
          <View style={styles.actionTextWrap}>
            <Text style={styles.actionTitle}>Build Your Order</Text>
            <Text style={styles.actionDescription}>Add products to cart and move to checkout.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('AboutStack')}>
          <Icon name="information-circle-outline" size={22} color="#FF6B35" />
          <View style={styles.actionTextWrap}>
            <Text style={styles.actionTitle}>Learn About Us</Text>
            <Text style={styles.actionDescription}>Read company mission, values, and contact options.</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.websiteButton} onPress={openWebsite}>
        <Icon name="globe-outline" size={18} color="#fff" />
        <Text style={styles.websiteButtonText}>Open FlavorFactory.net</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE2D7',
  },
  title: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '800',
    color: '#202020',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  actionTextWrap: {
    marginLeft: 10,
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  actionDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  websiteButton: {
    backgroundColor: '#FF6B35',
    marginTop: 16,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  websiteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});

export default HomeScreen;
