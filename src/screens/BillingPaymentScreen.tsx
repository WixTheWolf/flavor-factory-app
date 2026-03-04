import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  FlatList,
  Switch,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import paymentService from '../services/paymentService';

/**
 * Billing & Payment Screen
 * Manage payment methods, invoices, and transaction history
 * Process payments and track billing status
 */

interface RootState {
  auth: any;
  orders: any;
}

const BillingPaymentScreen: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth?.user);
  const orders = useSelector((state: RootState) => state.orders?.orders || []);

  const [activeTab, setActiveTab] = useState<'invoices' | 'methods' | 'history'>('invoices');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: '',
    saveCard: true,
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentMethods] = useState([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryDate: '12/25',
    },
  ]);

  const unpaidOrders = orders.filter((order: any) => order.status === 'pending_payment');

  const handleProcessPayment = async () => {
    if (
      !paymentForm.cardNumber ||
      !paymentForm.expiryDate ||
      !paymentForm.cvv ||
      !paymentForm.billingAddress
    ) {
      Alert.alert('Error', 'Please fill all payment details');
      return;
    }

    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      Alert.alert('Success', `Payment of $${selectedOrder?.total?.toFixed(2)} processed`);
      setShowPaymentModal(false);
      resetPaymentForm();
    } catch (error) {
      Alert.alert('Error', 'Payment processing failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetPaymentForm = () => {
    setPaymentForm({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      billingAddress: '',
      city: '',
      state: '',
      zipCode: '',
      saveCard: true,
    });
    setSelectedOrder(null);
  };

  const handleDownloadInvoice = (orderId: string) => {
    Alert.alert('Download', `Downloading invoice for order ${orderId}...`);
    // In a real app, this would trigger actual PDF download
  };

  const mockInvoices = [
    {
      id: 'INV-2024-001',
      amount: 1250.0,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'unpaid',
      issueDate: new Date().toISOString(),
      items: 2,
    },
    {
      id: 'INV-2024-002',
      amount: 3450.5,
      dueDate: new Date().toISOString(),
      status: 'pending',
      issueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      items: 5,
    },
  ];

  const mockTransactions = [
    {
      id: 'TXN-2024-001',
      type: 'payment',
      amount: 2500.0,
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      method: 'Credit Card',
    },
    {
      id: 'TXN-2024-002',
      type: 'refund',
      amount: 150.0,
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'completed',
      method: 'Credit Card',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return '#34C759';
      case 'unpaid':
        return '#FF3B30';
      case 'pending':
        return '#FFA500';
      default:
        return '#666';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'unpaid':
        return 'Unpaid';
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Billing & Payments</Text>
          <Text style={styles.subtitle}>Manage your account payments</Text>
        </View>
        {unpaidOrders.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unpaidOrders.length}</Text>
          </View>
        )}
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        {(['invoices', 'methods', 'history'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {unpaidOrders.length > 0 && (
            <View style={styles.alertBox}>
              <MaterialCommunityIcons name="alert-circle" size={20} color="#FF3B30" />
              <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>Outstanding Payments</Text>
                <Text style={styles.alertText}>
                  {unpaidOrders.length} order(s) awaiting payment
                </Text>
              </View>
              <TouchableOpacity
                style={styles.alertAction}
                onPress={() => {
                  if (unpaidOrders[0]) {
                    setSelectedOrder(unpaidOrders[0]);
                    setShowPaymentModal(true);
                  }
                }}
              >
                <Text style={styles.alertActionText}>Pay Now</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Invoices</Text>
          </View>

          {mockInvoices.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="file-document-outline" size={48} color="#ddd" />
              <Text style={styles.emptyText}>No invoices</Text>
            </View>
          ) : (
            mockInvoices.map((invoice) => (
              <View key={invoice.id} style={styles.invoiceCard}>
                <View style={styles.invoiceHeader}>
                  <View>
                    <Text style={styles.invoiceId}>{invoice.id}</Text>
                    <Text style={styles.invoiceDate}>
                      Issued {new Date(invoice.issueDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(invoice.status) },
                    ]}
                  >
                    <Text style={styles.statusText}>{getStatusLabel(invoice.status)}</Text>
                  </View>
                </View>

                <View style={styles.invoiceDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Amount</Text>
                    <Text style={styles.detailValue}>${invoice.amount.toFixed(2)}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Due Date</Text>
                    <Text style={styles.detailValue}>
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Items</Text>
                    <Text style={styles.detailValue}>{invoice.items} product(s)</Text>
                  </View>
                </View>

                <View style={styles.invoiceActions}>
                  {invoice.status === 'unpaid' && (
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.payBtn]}
                      onPress={() => {
                        setSelectedOrder({ total: invoice.amount });
                        setShowPaymentModal(true);
                      }}
                    >
                      <MaterialCommunityIcons name="credit-card" size={16} color="#fff" />
                      <Text style={styles.payBtnText}>Pay Now</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={[styles.actionBtn, styles.downloadBtn]}
                    onPress={() => handleDownloadInvoice(invoice.id)}
                  >
                    <MaterialCommunityIcons name="download" size={16} color="#007AFF" />
                    <Text style={[styles.btnText, { color: '#007AFF' }]}>Download</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'methods' && (
        <ScrollView style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => setShowPaymentMethodModal(true)}
            >
              <MaterialCommunityIcons name="plus" size={18} color="#fff" />
              <Text style={styles.addBtnText}>Add</Text>
            </TouchableOpacity>
          </View>

          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.methodCard}>
              <View style={styles.methodIcon}>
                <MaterialCommunityIcons name="credit-card" size={32} color="#007AFF" />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodBrand}>{method.brand}</Text>
                <Text style={styles.methodNumber}>•••• •••• •••• {method.last4}</Text>
                <Text style={styles.methodExpiry}>Expires {method.expiryDate}</Text>
              </View>
              <View style={styles.methodActions}>
                <TouchableOpacity style={styles.methodActionBtn}>
                  <MaterialCommunityIcons name="pencil" size={18} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.methodActionBtn}>
                  <MaterialCommunityIcons name="trash-can" size={18} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={styles.infoBox}>
            <MaterialCommunityIcons name="lock" size={18} color="#007AFF" />
            <Text style={styles.infoText}>
              All payment information is encrypted and secured per PCI-DSS standards
            </Text>
          </View>
        </ScrollView>
      )}

      {/* Transaction History Tab */}
      {activeTab === 'history' && (
        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Transaction History</Text>

          {mockTransactions.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="swap-horizontal" size={48} color="#ddd" />
              <Text style={styles.emptyText}>No transactions</Text>
            </View>
          ) : (
            mockTransactions.map((txn) => (
              <View key={txn.id} style={styles.transactionCard}>
                <View style={styles.txnIcon}>
                  <MaterialCommunityIcons
                    name={txn.type === 'payment' ? 'arrow-top-left' : 'arrow-bottom-right'}
                    size={24}
                    color={txn.type === 'payment' ? '#FF3B30' : '#34C759'}
                  />
                </View>

                <View style={styles.txnInfo}>
                  <Text style={styles.txnType}>
                    {txn.type === 'payment' ? 'Payment' : 'Refund'}
                  </Text>
                  <Text style={styles.txnMethod}>{txn.method}</Text>
                </View>

                <View style={styles.txnDetails}>
                  <Text
                    style={[
                      styles.txnAmount,
                      { color: txn.type === 'payment' ? '#FF3B30' : '#34C759' },
                    ]}
                  >
                    {txn.type === 'payment' ? '-' : '+'}${txn.amount.toFixed(2)}
                  </Text>
                  <Text style={styles.txnStatus}>{getStatusLabel(txn.status)}</Text>
                </View>
              </View>
            ))
          )}

          <View style={styles.txnFooter}>
            <Text style={styles.txnFooterText}>
              Showing last 30 days • {mockTransactions.length} transactions
            </Text>
          </View>
        </ScrollView>
      )}

      {/* Payment Modal */}
      <Modal visible={showPaymentModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Process Payment</Text>
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              {selectedOrder && (
                <View style={styles.amountBox}>
                  <Text style={styles.amountLabel}>Amount Due</Text>
                  <Text style={styles.amountValue}>
                    ${selectedOrder.total?.toFixed(2) || '0.00'}
                  </Text>
                </View>
              )}

              <Text style={styles.label}>Payment Method</Text>
              <View style={styles.methodOptions}>
                {['card', 'ach', 'paypal'].map((method) => (
                  <TouchableOpacity
                    key={method}
                    style={[
                      styles.methodOption,
                      paymentMethod === method && styles.methodOptionActive,
                    ]}
                    onPress={() => setPaymentMethod(method)}
                  >
                    <MaterialCommunityIcons
                      name={
                        method === 'card'
                          ? 'credit-card'
                          : method === 'ach'
                          ? 'bank'
                          : 'paypal'
                      }
                      size={20}
                      color={paymentMethod === method ? '#007AFF' : '#999'}
                    />
                    <Text
                      style={[
                        styles.methodOptionText,
                        paymentMethod === method && styles.methodOptionTextActive,
                      ]}
                    >
                      {method === 'card'
                        ? 'Credit Card'
                        : method === 'ach'
                        ? 'Bank Transfer'
                        : 'PayPal'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {paymentMethod === 'card' && (
                <>
                  <Text style={styles.label}>Card Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="1234 5678 9012 3456"
                    value={paymentForm.cardNumber}
                    onChangeText={(text) =>
                      setPaymentForm({ ...paymentForm, cardNumber: text })
                    }
                    keyboardType="number-pad"
                  />

                  <View style={styles.formRow}>
                    <View style={styles.formCol}>
                      <Text style={styles.label}>Expiry Date</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="MM/YY"
                        value={paymentForm.expiryDate}
                        onChangeText={(text) =>
                          setPaymentForm({ ...paymentForm, expiryDate: text })
                        }
                      />
                    </View>
                    <View style={styles.formCol}>
                      <Text style={styles.label}>CVV</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="123"
                        value={paymentForm.cvv}
                        onChangeText={(text) =>
                          setPaymentForm({ ...paymentForm, cvv: text })
                        }
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                </>
              )}

              <Text style={styles.label}>Billing Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Street address"
                value={paymentForm.billingAddress}
                onChangeText={(text) =>
                  setPaymentForm({ ...paymentForm, billingAddress: text })
                }
              />

              <View style={styles.formRow}>
                <View style={styles.formCol}>
                  <TextInput
                    style={styles.input}
                    placeholder="City"
                    value={paymentForm.city}
                    onChangeText={(text) =>
                      setPaymentForm({ ...paymentForm, city: text })
                    }
                  />
                </View>
                <View style={styles.formCol}>
                  <TextInput
                    style={styles.input}
                    placeholder="State"
                    value={paymentForm.state}
                    onChangeText={(text) =>
                      setPaymentForm({ ...paymentForm, state: text })
                    }
                  />
                </View>
                <View style={styles.formCol}>
                  <TextInput
                    style={styles.input}
                    placeholder="ZIP"
                    value={paymentForm.zipCode}
                    onChangeText={(text) =>
                      setPaymentForm({ ...paymentForm, zipCode: text })
                    }
                  />
                </View>
              </View>

              <View style={styles.checkboxRow}>
                <Switch
                  value={paymentForm.saveCard}
                  onValueChange={(value) =>
                    setPaymentForm({ ...paymentForm, saveCard: value })
                  }
                  trackColor={{ false: '#ddd', true: '#007AFF' }}
                />
                <Text style={styles.checkboxLabel}>Save this card for future payments</Text>
              </View>
            </ScrollView>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setShowPaymentModal(false);
                  resetPaymentForm();
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={handleProcessPayment}
                disabled={loading}
              >
                <Text style={styles.submitButtonText}>
                  {loading ? 'Processing...' : 'Pay Now'}
                </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  badge: {
    backgroundColor: '#FF3B30',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
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
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  alertBox: {
    backgroundColor: '#FFE8E8',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    gap: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF3B30',
  },
  alertText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  alertAction: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  alertActionText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
    gap: 4,
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
  invoiceCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  invoiceId: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  invoiceDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  invoiceDetails: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
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
  invoiceActions: {
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
  payBtn: {
    backgroundColor: '#007AFF',
  },
  payBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  downloadBtn: {
    backgroundColor: '#E8F0FF',
  },
  btnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  methodCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  methodIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#E8F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodInfo: {
    flex: 1,
  },
  methodBrand: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  methodNumber: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  methodExpiry: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  methodActions: {
    flexDirection: 'row',
    gap: 8,
  },
  methodActionBtn: {
    padding: 6,
  },
  infoBox: {
    backgroundColor: '#E8F0FF',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    gap: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: '#007AFF',
    lineHeight: 18,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  txnIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txnInfo: {
    flex: 1,
  },
  txnType: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  txnMethod: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  txnDetails: {
    alignItems: 'flex-end',
  },
  txnAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  txnStatus: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  txnFooter: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  txnFooterText: {
    fontSize: 12,
    color: '#999',
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
  amountBox: {
    backgroundColor: '#E8F0FF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '500',
  },
  amountValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#007AFF',
    marginTop: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  methodOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  methodOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  methodOptionActive: {
    backgroundColor: '#E8F0FF',
    borderColor: '#007AFF',
  },
  methodOptionText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  methodOptionTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  formRow: {
    flexDirection: 'row',
    gap: 10,
  },
  formCol: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20,
    marginBottom: 20,
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

export default BillingPaymentScreen;
