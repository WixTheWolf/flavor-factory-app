import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import Icon from 'react-native-vector-icons/Ionicons';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: auth.user?.name || 'Premium Bakery Co.',
    email: auth.user?.email || 'orders@premiumbakery.com',
    phone: auth.user?.phone || '+1-404-555-0123',
    address: auth.user?.address || '456 Commerce Drive, Atlanta, GA 30303',
  });

  const handleUpdateProfile = () => {
    if (!formData.companyName || !formData.email) {
      Alert.alert('Missing Information', 'Company name and email are required');
      return;
    }

    dispatch({
      type: 'UPDATE_USER',
      payload: formData,
    });

    Alert.alert('Success', 'Profile updated successfully');
    setIsEditing(false);
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          dispatch({ type: 'LOGOUT' });
        },
        style: 'destructive',
      },
    ]);
  };

  if (!auth.isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.loginPrompt}>
          <Icon name="person-circle-outline" size={80} color="#ddd" />
          <Text style={styles.loginTitle}>Not Logged In</Text>
          <Text style={styles.loginSubtitle}>
            Sign in to your account to view profile and order history
          </Text>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarLarge}>
          <Icon name="business-outline" size={60} color="#FF6B35" />
        </View>
        <Text style={styles.companyTitle}>{formData.companyName}</Text>
        <Text style={styles.companySubtitle}>Business Account</Text>
        {!isEditing && (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Icon name="pencil-outline" size={16} color="#FF6B35" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </View>

      {isEditing ? (
        <View style={styles.editSection}>
          <Text style={styles.sectionTitle}>Edit Company Information</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Company Name</Text>
            <TextInput
              style={styles.input}
              value={formData.companyName}
              onChangeText={(text) =>
                setFormData({ ...formData, companyName: text })
              }
              placeholder="Enter company name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) =>
                setFormData({ ...formData, email: text })
              }
              keyboardType="email-address"
              placeholder="Enter email"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) =>
                setFormData({ ...formData, phone: text })
              }
              keyboardType="phone-pad"
              placeholder="Enter phone number"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.address}
              onChangeText={(text) =>
                setFormData({ ...formData, address: text })
              }
              multiline
              numberOfLines={3}
              placeholder="Enter address"
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleUpdateProfile}
          >
            <Icon name="checkmark" size={18} color="#fff" />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setIsEditing(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Icon name="mail-outline" size={20} color="#FF6B35" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{formData.email}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Icon name="call-outline" size={20} color="#FF6B35" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{formData.phone}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Icon name="location-outline" size={20} color="#FF6B35" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Address</Text>
                <Text style={styles.infoValue}>{formData.address}</Text>
              </View>
            </View>
          </View>

          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Orders')}
            >
              <Icon name="document-text-outline" size={20} color="#FF6B35" />
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>My Purchase Orders</Text>
                <Text style={styles.actionSubtitle}>View order history</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('RecurringOrders')}
            >
              <Icon name="calendar-outline" size={20} color="#FF6B35" />
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Recurring Orders</Text>
                <Text style={styles.actionSubtitle}>Manage order templates</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('CustomQuote')}
            >
              <Icon name="flask-outline" size={20} color="#FF6B35" />
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Custom Flavors</Text>
                <Text style={styles.actionSubtitle}>Request custom quotes</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('BillingPayment')}
            >
              <Icon name="card-outline" size={20} color="#FF6B35" />
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Billing & Payments</Text>
                <Text style={styles.actionSubtitle}>Payment methods & invoices</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('AdminDashboard')}
            >
              <Icon name="settings-outline" size={20} color="#FF6B35" />
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>Admin Dashboard</Text>
                <Text style={styles.actionSubtitle}>Manage products & inventory</Text>
              </View>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <View style={styles.settingsSection}>
            <TouchableOpacity style={styles.settingItem}>
              <Icon name="settings-outline" size={20} color="#666" />
              <Text style={styles.settingText}>Account Settings</Text>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <Icon name="help-circle-outline" size={20} color="#666" />
              <Text style={styles.settingText}>Help & Support</Text>
              <Icon name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Icon name="log-out-outline" size={18} color="#fff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  companySubtitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 12,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FF6B35',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  editButtonText: {
    fontWeight: '600',
    color: '#FF6B35',
    fontSize: 12,
  },
  editSection: {
    backgroundColor: '#fff',
    margin: 12,
    padding: 16,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 6,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButton: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  actionSection: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  actionContent: {
    flex: 1,
    marginLeft: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  settingsSection: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  settingText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: '#F44336',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 12,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  spacer: {
    height: 20,
  },
  loginPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginTop: 16,
  },
  loginSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProfileScreen;
