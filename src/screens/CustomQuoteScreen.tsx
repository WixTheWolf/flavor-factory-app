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
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addCustomQuote, updateCustomQuote } from '../redux/recurringOrderReducer';
import { CustomQuote } from '../redux/recurringOrderReducer';

/**
 * Custom Quote Request Screen
 * Allows customers to request custom flavor formulations
 * Perfect for new product development and specialized applications
 */

interface RootState {
  recurringOrder: any;
}

const CustomQuoteScreen: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const customQuotes = useSelector((state: RootState) => state.recurringOrder?.customQuotes || []);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'quoted'>('all');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    applicationType: '',
    flavorProfile: '',
    targetMarket: '',
    estimatedVolume: '',
    specialRequirements: '',
  });

  const handleSubmitQuoteRequest = () => {
    if (
      !formData.applicationType.trim() ||
      !formData.flavorProfile.trim() ||
      !formData.targetMarket.trim() ||
      !formData.estimatedVolume.trim()
    ) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const newQuote: CustomQuote = {
      id: Date.now().toString(),
      status: 'pending',
      requestDate: new Date().toISOString(),
      applicationType: formData.applicationType,
      flavorProfile: formData.flavorProfile,
      targetMarket: formData.targetMarket,
      estimatedVolume: parseInt(formData.estimatedVolume),
      specialRequirements: formData.specialRequirements,
      notes: '',
    };

    dispatch(addCustomQuote(newQuote));
    resetForm();
    setShowRequestModal(false);
    Alert.alert('Success', 'Quote request submitted to our technical team');
  };

  const resetForm = () => {
    setFormData({
      applicationType: '',
      flavorProfile: '',
      targetMarket: '',
      estimatedVolume: '',
      specialRequirements: '',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FFA500';
      case 'reviewed':
        return '#007AFF';
      case 'quoted':
        return '#34C759';
      case 'accepted':
        return '#00B050';
      case 'rejected':
        return '#FF3B30';
      default:
        return '#666';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Awaiting Review';
      case 'reviewed':
        return 'Under Review';
      case 'quoted':
        return 'Quote Ready';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const filteredQuotes = customQuotes.filter((quote: CustomQuote) => {
    if (activeTab === 'pending') return quote.status === 'pending' || quote.status === 'reviewed';
    if (activeTab === 'quoted') return quote.status === 'quoted';
    return true;
  });

  const applicationTypes = [
    'Bakery & Confectionery',
    'Beverages & Syrups',
    'Pharmaceutical',
    'Nutraceutical',
    'Oral Care',
    'Vape & Inhalants',
    'Dairy & Yogurt',
    'Other Food Manufacturing',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Custom Flavors</Text>
          <Text style={styles.subtitle}>Request custom formulations</Text>
        </View>
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => {
            resetForm();
            setShowRequestModal(true);
          }}
        >
          <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          <Text style={styles.requestButtonText}>Request</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.tabActive]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.tabTextActive]}>
            All ({customQuotes.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pending' && styles.tabActive]}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[styles.tabText, activeTab === 'pending' && styles.tabTextActive]}>
            Pending ({customQuotes.filter((q: CustomQuote) => q.status === 'pending' || q.status === 'reviewed').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'quoted' && styles.tabActive]}
          onPress={() => setActiveTab('quoted')}
        >
          <Text style={[styles.tabText, activeTab === 'quoted' && styles.tabTextActive]}>
            Quoted ({customQuotes.filter((q: CustomQuote) => q.status === 'quoted').length})
          </Text>
        </TouchableOpacity>
      </View>

      {filteredQuotes.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="flask-outline" size={64} color="#ddd" />
          <Text style={styles.emptyText}>No quote requests</Text>
          <Text style={styles.emptySubtext}>
            {activeTab === 'all'
              ? 'Submit a quote request for custom flavor development'
              : `No ${activeTab} requests yet`}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredQuotes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.quoteCard}>
              <View style={styles.cardHeader}>
                <View style={styles.titleSection}>
                  <Text style={styles.applicationType}>{item.applicationType}</Text>
                  <Text style={styles.flavorProfile}>{item.flavorProfile}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(item.status) },
                  ]}
                >
                  <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Target Market</Text>
                  <Text style={styles.detailValue}>{item.targetMarket}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Est. Volume</Text>
                  <Text style={styles.detailValue}>{item.estimatedVolume} lbs/mo</Text>
                </View>
              </View>

              {item.specialRequirements && (
                <View style={styles.requirementsSection}>
                  <Text style={styles.requirementsLabel}>Special Requirements</Text>
                  <Text style={styles.requirementsText}>{item.specialRequirements}</Text>
                </View>
              )}

              <View style={styles.metaInfo}>
                <Text style={styles.metaText}>
                  Requested: {new Date(item.requestDate).toLocaleDateString()}
                </Text>
                {item.quotedDate && (
                  <Text style={styles.metaText}>
                    Quoted: {new Date(item.quotedDate).toLocaleDateString()}
                  </Text>
                )}
              </View>

              {item.quotedPrice && (
                <View style={styles.priceSection}>
                  <Text style={styles.priceLabel}>Quoted Price</Text>
                  <Text style={styles.price}>${item.quotedPrice.toFixed(2)}</Text>
                  {item.expiryDate && (
                    <Text style={styles.expiryText}>
                      Valid until {new Date(item.expiryDate).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              )}

              <View style={styles.cardActions}>
                {item.status === 'quoted' && (
                  <TouchableOpacity style={[styles.actionBtn, styles.acceptBtn]}>
                    <MaterialCommunityIcons name="check-circle" size={18} color="#fff" />
                    <Text style={styles.acceptBtnText}>Accept Quote</Text>
                  </TouchableOpacity>
                )}
                {item.status === 'pending' && (
                  <TouchableOpacity style={[styles.actionBtn, styles.viewBtn]}>
                    <MaterialCommunityIcons name="eye" size={18} color="#007AFF" />
                    <Text style={[styles.actionBtnText, { color: '#007AFF' }]}>View Details</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Request Quote Modal */}
      <Modal visible={showRequestModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Request Custom Quote</Text>
              <TouchableOpacity onPress={() => setShowRequestModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <Text style={styles.label}>Application Type *</Text>
              <View style={styles.selectContainer}>
                <View style={styles.pickerContainer}>
                  {applicationTypes.map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.selectOption,
                        formData.applicationType === type && styles.selectOptionActive,
                      ]}
                      onPress={() => setFormData({ ...formData, applicationType: type })}
                    >
                      <Text
                        style={[
                          styles.selectOptionText,
                          formData.applicationType === type &&
                            styles.selectOptionTextActive,
                        ]}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Text style={styles.label}>Flavor Profile Description *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe the desired flavor profile..."
                value={formData.flavorProfile}
                onChangeText={(text) =>
                  setFormData({ ...formData, flavorProfile: text })
                }
                multiline
                numberOfLines={3}
              />

              <Text style={styles.label}>Target Market/Product *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Sugar-Free Energy Drinks"
                value={formData.targetMarket}
                onChangeText={(text) =>
                  setFormData({ ...formData, targetMarket: text })
                }
              />

              <Text style={styles.label}>Estimated Monthly Volume (lbs) *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 5000"
                value={formData.estimatedVolume}
                onChangeText={(text) =>
                  setFormData({ ...formData, estimatedVolume: text })
                }
                keyboardType="number-pad"
              />

              <Text style={styles.label}>Special Requirements</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="USP/FCC compliance, organic, allergen-free, etc."
                value={formData.specialRequirements}
                onChangeText={(text) =>
                  setFormData({ ...formData, specialRequirements: text })
                }
                multiline
                numberOfLines={3}
              />

              <View style={styles.infoBox}>
                <MaterialCommunityIcons name="information" size={18} color="#007AFF" />
                <Text style={styles.infoText}>
                  Our technical team will review your request and provide a custom quote within 2-3 business days.
                </Text>
              </View>
            </ScrollView>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setShowRequestModal(false);
                  resetForm();
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleSubmitQuoteRequest}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Submit Request</Text>
                )}
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
  header: {
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  requestButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    gap: 6,
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  tabBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  quoteCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleSection: {
    flex: 1,
  },
  applicationType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  flavorProfile: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    marginVertical: 10,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  requirementsSection: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  requirementsLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
    marginBottom: 4,
  },
  requirementsText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 18,
  },
  metaInfo: {
    paddingVertical: 8,
  },
  metaText: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  priceSection: {
    backgroundColor: '#E8F0FF',
    padding: 12,
    borderRadius: 6,
    marginVertical: 10,
  },
  priceLabel: {
    fontSize: 11,
    color: '#007AFF',
    fontWeight: '500',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    marginTop: 4,
  },
  expiryText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  acceptBtn: {
    backgroundColor: '#34C759',
  },
  acceptBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  viewBtn: {
    backgroundColor: '#E8F0FF',
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '600',
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
    marginBottom: 10,
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
    marginBottom: 15,
  },
  pickerContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
  },
  selectOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectOptionActive: {
    backgroundColor: '#007AFF',
  },
  selectOptionText: {
    fontSize: 14,
    color: '#333',
  },
  selectOptionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  infoBox: {
    backgroundColor: '#E8F0FF',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#007AFF',
    lineHeight: 18,
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

export default CustomQuoteScreen;
