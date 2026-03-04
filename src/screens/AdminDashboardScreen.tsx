import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  FlatList,
  Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import vdosplus from '../services/vdosplus';

/**
 * Admin Dashboard Screen
 * Manage product catalog, pricing, inventory levels
 * Control product availability and promotions
 * Monitor sales and stock alerts
 */

interface RootState {
  products: any;
  auth: any;
}

const AdminDashboardScreen: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products?.products || []);
  const user = useSelector((state: RootState) => state.auth?.user);

  const [activeTab, setActiveTab] = useState<'products' | 'pricing' | 'inventory' | 'analytics'>('products');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    description: '',
    moq: '',
    basePrice: '',
    applications: '',
  });

  const [pricingForm, setPricingForm] = useState({
    tier1: '', // 0-99 units
    tier2: '', // 100-499 units
    tier3: '', // 500+ units
  });

  // Check admin access
  const isAdmin = user?.role === 'admin' || user?.email?.includes('admin');

  if (!isAdmin) {
    return (
      <View style={styles.accessDenied}>
        <MaterialCommunityIcons name="lock" size={64} color="#FF3B30" />
        <Text style={styles.accessDeniedText}>Admin Access Required</Text>
        <Text style={styles.accessDeniedSubtext}>
          You don't have permission to access this dashboard
        </Text>
      </View>
    );
  }

  const handleAddProduct = () => {
    if (!productForm.name.trim() || !productForm.category.trim()) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    Alert.alert('Success', `Product "${productForm.name}" added to catalog`);
    setProductForm({
      name: '',
      category: '',
      description: '',
      moq: '',
      basePrice: '',
      applications: '',
    });
    setShowProductModal(false);
  };

  const handleUpdatePricing = () => {
    if (!pricingForm.tier1 || !pricingForm.tier2 || !pricingForm.tier3) {
      Alert.alert('Error', 'Please enter all tier prices');
      return;
    }

    Alert.alert('Success', `Pricing updated for ${selectedProduct?.name}`);
    setPricingForm({ tier1: '', tier2: '', tier3: '' });
    setShowPricingModal(false);
  };

  const handleSyncInventory = async () => {
    setLoading(true);
    try {
      const inventory = await vdosplus.getInventoryLevels();
      Alert.alert('Success', 'Inventory synced from vDosPlus');
    } catch (error) {
      Alert.alert('Error', 'Failed to sync inventory');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Bakery Flavors',
    'Beverage Flavors',
    'Pharma Grade',
    'Nutraceutical',
    'Oral Care',
    'Vape Flavors',
    'Syrup Bases',
    'Dairy Flavors',
  ];

  return (
    <View style={styles.container}>
      {/* Admin Header */}
      <View style={styles.adminHeader}>
        <View>
          <Text style={styles.adminTitle}>Admin Dashboard</Text>
          <Text style={styles.adminSubtitle}>Product & Inventory Management</Text>
        </View>
        <View style={styles.syncButton}>
          <TouchableOpacity
            style={styles.syncIconButton}
            onPress={handleSyncInventory}
            disabled={loading}
          >
            <MaterialCommunityIcons
              name="sync"
              size={20}
              color="#007AFF"
              style={loading && { opacity: 0.5 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNav}>
        {(['products', 'pricing', 'inventory', 'analytics'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabLabel, activeTab === tab && styles.tabLabelActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Product Catalog</Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                setProductForm({
                  name: '',
                  category: '',
                  description: '',
                  moq: '',
                  basePrice: '',
                  applications: '',
                });
                setShowProductModal(true);
              }}
            >
              <MaterialCommunityIcons name="plus" size={20} color="#fff" />
              <Text style={styles.addBtnText}>New Product</Text>
            </TouchableOpacity>
          </View>

          {products.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="package-outline" size={48} color="#ddd" />
              <Text style={styles.emptyText}>No products yet</Text>
            </View>
          ) : (
            products.map((product: any, index: number) => (
              <View key={index} style={styles.productItem}>
                <View style={styles.itemHeader}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productCategory}>{product.category}</Text>
                  </View>
                  <View style={styles.itemActions}>
                    <TouchableOpacity style={styles.iconBtn}>
                      <MaterialCommunityIcons name="pencil" size={18} color="#007AFF" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn}>
                      <MaterialCommunityIcons name="trash-can" size={18} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.itemDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>MOQ:</Text>
                    <Text style={styles.detailValue}>{product.moq || '—'} lbs</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Price:</Text>
                    <Text style={styles.detailValue}>${product.price?.toFixed(2) || '—'}/lb</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Stock:</Text>
                    <Text style={styles.detailValue}>{product.stock || '0'} lbs</Text>
                  </View>
                </View>

                <View style={styles.itemActions2}>
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.actionBtnPrimary]}
                    onPress={() => {
                      setSelectedProduct(product);
                      setPricingForm({
                        tier1: product.price?.toString() || '',
                        tier2: (product.price ? product.price * 0.95 : 0).toString(),
                        tier3: (product.price ? product.price * 0.9 : 0).toString(),
                      });
                      setShowPricingModal(true);
                    }}
                  >
                    <MaterialCommunityIcons name="tag-multiple" size={16} color="#fff" />
                    <Text style={styles.actionBtnText}>Pricing</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}

      {/* Pricing Tab */}
      {activeTab === 'pricing' && (
        <ScrollView style={styles.content}>
          <View style={styles.pricingGrid}>
            <Text style={styles.sectionTitle}>Manage Pricing Tiers</Text>
            <Text style={styles.sectionSubtext}>
              Set bulk pricing tiers for different order quantities
            </Text>

            <View style={styles.tierCard}>
              <View style={styles.tierHeader}>
                <MaterialCommunityIcons name="package-variant" size={20} color="#007AFF" />
                <Text style={styles.tierTitle}>Tier 1: 0-99 units</Text>
              </View>
              <View style={styles.tierContent}>
                <Text style={styles.tierLabel}>Base Price ($/unit)</Text>
                <Text style={styles.tierValue}>Standard pricing</Text>
              </View>
            </View>

            <View style={styles.tierCard}>
              <View style={styles.tierHeader}>
                <MaterialCommunityIcons name="package-variant-closed" size={20} color="#34C759" />
                <Text style={styles.tierTitle}>Tier 2: 100-499 units</Text>
              </View>
              <View style={styles.tierContent}>
                <Text style={styles.tierLabel}>Discount: 5-10%</Text>
                <Text style={styles.tierValue}>Volume pricing</Text>
              </View>
            </View>

            <View style={styles.tierCard}>
              <View style={styles.tierHeader}>
                <MaterialCommunityIcons name="truck-outline" size={20} color="#FF9500" />
                <Text style={styles.tierTitle}>Tier 3: 500+ units</Text>
              </View>
              <View style={styles.tierContent}>
                <Text style={styles.tierLabel}>Discount: 10-15%</Text>
                <Text style={styles.tierValue}>Premium bulk pricing</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Inventory Tab */}
      {activeTab === 'inventory' && (
        <ScrollView style={styles.content}>
          <View style={styles.inventorySection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Inventory Levels</Text>
              <TouchableOpacity
                style={styles.syncBtn}
                onPress={handleSyncInventory}
                disabled={loading}
              >
                <MaterialCommunityIcons name="sync" size={18} color="#007AFF" />
                <Text style={styles.syncBtnText}>Sync vDosPlus</Text>
              </TouchableOpacity>
            </View>

            {products.map((product: any, index: number) => (
              <View key={index} style={styles.inventoryCard}>
                <View style={styles.inventoryHeader}>
                  <Text style={styles.inventoryName}>{product.name}</Text>
                  <View
                    style={[
                      styles.stockStatus,
                      product.stock < product.moq
                        ? styles.stockLow
                        : styles.stockGood,
                    ]}
                  >
                    <Text style={styles.stockStatusText}>
                      {product.stock < product.moq ? 'Low' : 'Good'}
                    </Text>
                  </View>
                </View>
                <View style={styles.inventoryBar}>
                  <View
                    style={[
                      styles.inventoryFill,
                      {
                        width: `${Math.min(
                          (product.stock / (product.moq * 5)) * 100,
                          100
                        )}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.inventoryText}>
                  {product.stock} lbs in stock (MOQ: {product.moq} lbs)
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <ScrollView style={styles.content}>
          <View style={styles.analyticsSection}>
            <Text style={styles.sectionTitle}>Sales Analytics</Text>
            <Text style={styles.sectionSubtext}>
              vDosPlus integration tracking coming soon
            </Text>

            <View style={styles.metricCard}>
              <View style={styles.metricIcon}>
                <MaterialCommunityIcons name="chart-line" size={32} color="#007AFF" />
              </View>
              <View style={styles.metricContent}>
                <Text style={styles.metricLabel}>Total Orders (This Month)</Text>
                <Text style={styles.metricValue}>—</Text>
              </View>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricIcon}>
                <MaterialCommunityIcons name="cash-multiple" size={32} color="#34C759" />
              </View>
              <View style={styles.metricContent}>
                <Text style={styles.metricLabel}>Revenue (This Month)</Text>
                <Text style={styles.metricValue}>—</Text>
              </View>
            </View>

            <View style={styles.metricCard}>
              <View style={styles.metricIcon}>
                <MaterialCommunityIcons name="store" size={32} color="#FF9500" />
              </View>
              <View style={styles.metricContent}>
                <Text style={styles.metricLabel}>Top Product</Text>
                <Text style={styles.metricValue}>—</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Add Product Modal */}
      <Modal visible={showProductModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Product</Text>
              <TouchableOpacity onPress={() => setShowProductModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <Text style={styles.label}>Product Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Vanilla Extract Natural"
                value={productForm.name}
                onChangeText={(text) =>
                  setProductForm({ ...productForm, name: text })
                }
              />

              <Text style={styles.label}>Category *</Text>
              <View style={styles.selectContainer}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.selectOption,
                      productForm.category === cat && styles.selectOptionActive,
                    ]}
                    onPress={() => setProductForm({ ...productForm, category: cat })}
                  >
                    <Text
                      style={[
                        styles.selectOptionText,
                        productForm.category === cat &&
                          styles.selectOptionTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Product description..."
                value={productForm.description}
                onChangeText={(text) =>
                  setProductForm({ ...productForm, description: text })
                }
                multiline
                numberOfLines={3}
              />

              <Text style={styles.label}>MOQ (lbs) *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 50"
                value={productForm.moq}
                onChangeText={(text) =>
                  setProductForm({ ...productForm, moq: text })
                }
                keyboardType="number-pad"
              />

              <Text style={styles.label}>Base Price ($/lb) *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 45.00"
                value={productForm.basePrice}
                onChangeText={(text) =>
                  setProductForm({ ...productForm, basePrice: text })
                }
                keyboardType="decimal-pad"
              />

              <Text style={styles.label}>Applications</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="e.g., Cakes, Cookies, Pastries"
                value={productForm.applications}
                onChangeText={(text) =>
                  setProductForm({ ...productForm, applications: text })
                }
                multiline
                numberOfLines={2}
              />
            </ScrollView>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowProductModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleAddProduct}
              >
                <Text style={styles.submitButtonText}>Add Product</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Pricing Modal */}
      <Modal visible={showPricingModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Set Pricing: {selectedProduct?.name}
              </Text>
              <TouchableOpacity onPress={() => setShowPricingModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <Text style={styles.label}>Tier 1 (0-99 units): $/lb *</Text>
              <TextInput
                style={styles.input}
                placeholder="Base price"
                value={pricingForm.tier1}
                onChangeText={(text) =>
                  setPricingForm({ ...pricingForm, tier1: text })
                }
                keyboardType="decimal-pad"
              />

              <Text style={styles.label}>Tier 2 (100-499 units): $/lb *</Text>
              <TextInput
                style={styles.input}
                placeholder="Volume discount price"
                value={pricingForm.tier2}
                onChangeText={(text) =>
                  setPricingForm({ ...pricingForm, tier2: text })
                }
                keyboardType="decimal-pad"
              />

              <Text style={styles.label}>Tier 3 (500+ units): $/lb *</Text>
              <TextInput
                style={styles.input}
                placeholder="Premium bulk price"
                value={pricingForm.tier3}
                onChangeText={(text) =>
                  setPricingForm({ ...pricingForm, tier3: text })
                }
                keyboardType="decimal-pad"
              />
            </ScrollView>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowPricingModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleUpdatePricing}
              >
                <Text style={styles.submitButtonText}>Update Pricing</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  accessDenied: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  accessDeniedText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginTop: 15,
  },
  accessDeniedSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  adminHeader: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  adminTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  adminSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  syncButton: {},
  syncIconButton: {
    padding: 8,
  },
  tabNav: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 20,
  },
  tabItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginRight: 8,
  },
  tabItemActive: {
    borderBottomColor: '#007AFF',
  },
  tabLabel: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  sectionSubtext: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
    marginBottom: 15,
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    gap: 6,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
  productItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  productCategory: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    padding: 6,
  },
  itemDetails: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    paddingVertical: 8,
    marginVertical: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  itemActions2: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  actionBtnPrimary: {
    backgroundColor: '#007AFF',
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  pricingGrid: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  tierCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  tierTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  tierContent: {
    marginTop: 8,
  },
  tierLabel: {
    fontSize: 12,
    color: '#666',
  },
  tierValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 2,
  },
  inventorySection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  syncBtn: {
    flexDirection: 'row',
    backgroundColor: '#E8F0FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    gap: 6,
  },
  syncBtnText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
  },
  inventoryCard: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  inventoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inventoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  stockStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  stockLow: {
    backgroundColor: '#FFE8E8',
  },
  stockGood: {
    backgroundColor: '#E8F5E8',
  },
  stockStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },
  inventoryBar: {
    backgroundColor: '#f0f0f0',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  inventoryFill: {
    backgroundColor: '#007AFF',
    height: '100%',
  },
  inventoryText: {
    fontSize: 12,
    color: '#666',
  },
  analyticsSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  metricCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  metricIcon: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#E8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricContent: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '95%',
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  selectContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  selectOption: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectOptionActive: {
    backgroundColor: '#007AFF',
  },
  selectOptionText: {
    fontSize: 13,
    color: '#333',
  },
  selectOptionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#007AFF',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default AdminDashboardScreen;
