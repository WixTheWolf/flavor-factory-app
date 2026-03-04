import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addRecurringOrder, updateRecurringOrder, deleteRecurringOrder } from '../redux/recurringOrderReducer';
import { RecurringOrder } from '../redux/recurringOrderReducer';

/**
 * Recurring Orders Screen
 * Allows customers to create and manage recurring order templates
 * Perfect for B2B repeat purchases and automated reordering
 */

interface RootState {
  recurringOrder: any;
}

const RecurringOrdersScreen: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const recurringOrders = useSelector((state: RootState) => state.recurringOrder?.recurringOrders || []);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<RecurringOrder | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'monthly' as const,
    automateReordering: false,
    notes: '',
  });

  const handleCreateTemplate = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter a template name');
      return;
    }

    const newOrder: RecurringOrder = {
      id: Date.now().toString(),
      name: formData.name,
      frequency: formData.frequency,
      nextDelivery: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      items: [],
      totalValue: 0,
      automateReordering: formData.automateReordering,
      notes: formData.notes,
      createdAt: new Date().toISOString(),
    };

    dispatch(addRecurringOrder(newOrder));
    resetForm();
    setShowModal(false);
    Alert.alert('Success', 'Recurring order template created');
  };

  const handleDeleteOrder = (orderId: string) => {
    Alert.alert(
      'Delete Template',
      'Are you sure you want to delete this recurring order template?',
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'Delete',
          onPress: () => {
            dispatch(deleteRecurringOrder(orderId));
            Alert.alert('Deleted', 'Recurring order template removed');
          },
        },
      ]
    );
  };

  const resetForm = () => {
    setFormData({
      name: '',
      frequency: 'monthly',
      automateReordering: false,
      notes: '',
    });
    setEditingOrder(null);
  };

  const frequencyLabels = {
    weekly: 'Weekly',
    biweekly: 'Bi-Weekly',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recurring Orders</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <MaterialCommunityIcons name="plus-circle" size={24} color="#fff" />
          <Text style={styles.addButtonText}>New Template</Text>
        </TouchableOpacity>
      </View>

      {recurringOrders.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="calendar-repeat" size={64} color="#ddd" />
          <Text style={styles.emptyText}>No recurring orders yet</Text>
          <Text style={styles.emptySubtext}>
            Create templates for your frequent orders for faster reordering
          </Text>
        </View>
      ) : (
        <FlatList
          data={recurringOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderName}>{item.name}</Text>
                  <Text style={styles.frequency}>
                    {frequencyLabels[item.frequency]} • Next: {new Date(item.nextDelivery).toLocaleDateString()}
                  </Text>
                </View>
                {item.automateReordering && (
                  <View style={styles.autopilotBadge}>
                    <MaterialCommunityIcons name="robot" size={14} color="#fff" />
                    <Text style={styles.badgeText}>Auto</Text>
                  </View>
                )}
              </View>

              <View style={styles.itemsInfo}>
                <Text style={styles.itemsLabel}>Items in template: {item.items.length}</Text>
                <Text style={styles.totalValue}>${item.totalValue.toFixed(2)}</Text>
              </View>

              {item.notes && <Text style={styles.notes}>{item.notes}</Text>}

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.editBtn]}
                  onPress={() => {
                    setEditingOrder(item);
                    // Navigate to edit screen
                  }}
                >
                  <MaterialCommunityIcons name="pencil" size={18} color="#007AFF" />
                  <Text style={styles.actionBtnText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, styles.placeBtn]}
                  onPress={() => {
                    Alert.alert('Place Order', `Order from template "${item.name}"?`, [
                      { text: 'Cancel', onPress: () => {} },
                      {
                        text: 'Place Order',
                        onPress: () => {
                          Alert.alert('Success', 'Order placed from template');
                          // Navigate to checkout or orders screen
                        },
                      },
                    ]);
                  }}
                >
                  <MaterialCommunityIcons name="check-circle" size={18} color="#fff" />
                  <Text style={[styles.actionBtnText, { color: '#fff' }]}>Place Order</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, styles.deleteBtn]}
                  onPress={() => handleDeleteOrder(item.id)}
                >
                  <MaterialCommunityIcons name="trash-can" size={18} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Create/Edit Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>New Recurring Order</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formSection}>
              <Text style={styles.label}>Template Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Weekly Vanilla Extract"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
              />

              <Text style={styles.label}>Frequency</Text>
              <View style={styles.frequencyOptions}>
                {(['weekly', 'biweekly', 'monthly', 'quarterly'] as const).map((freq) => (
                  <TouchableOpacity
                    key={freq}
                    style={[
                      styles.frequencyOption,
                      formData.frequency === freq && styles.frequencyOptionActive,
                    ]}
                    onPress={() => setFormData({ ...formData, frequency: freq })}
                  >
                    <Text
                      style={[
                        styles.frequencyOptionText,
                        formData.frequency === freq && styles.frequencyOptionTextActive,
                      ]}
                    >
                      {frequencyLabels[freq]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add instructions or preferences..."
                value={formData.notes}
                onChangeText={(text) => setFormData({ ...formData, notes: text })}
                multiline
                numberOfLines={3}
              />

              <View style={styles.checkboxRow}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() =>
                    setFormData({
                      ...formData,
                      automateReordering: !formData.automateReordering,
                    })
                  }
                >
                  <MaterialCommunityIcons
                    name={formData.automateReordering ? 'checkbox-marked' : 'checkbox-blank-outline'}
                    size={24}
                    color={formData.automateReordering ? '#007AFF' : '#ccc'}
                  />
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Automatically place orders on schedule</Text>
              </View>
            </ScrollView>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleCreateTemplate}
              >
                <Text style={styles.submitButtonText}>Create Template</Text>
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
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
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
  orderCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 12,
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  orderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  frequency: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  autopilotBadge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  itemsInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
    marginVertical: 10,
  },
  itemsLabel: {
    fontSize: 13,
    color: '#666',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  notes: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 8,
  },
  actionButtons: {
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
  editBtn: {
    backgroundColor: '#E8F0FF',
  },
  placeBtn: {
    backgroundColor: '#34C759',
  },
  deleteBtn: {
    backgroundColor: '#FFE8E8',
    flex: 0,
    paddingHorizontal: 10,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
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
    maxHeight: '90%',
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
  formSection: {
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
  frequencyOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  frequencyOption: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frequencyOptionActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  frequencyOptionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  frequencyOptionTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  checkbox: {
    padding: 4,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
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

export default RecurringOrdersScreen;
