import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface AboutUsScreenProps {
  navigation: any;
}

const AboutUsScreen: React.FC<AboutUsScreenProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const companyData = {
    name: 'Flavor Factory',
    description: 'Premium wholesale ingredients and food products for businesses',
    founded: '2015',
    mission: 'To provide high-quality, affordable bulk food products to restaurants, cafes, bakeries, and food service businesses worldwide.',
    values: [
      'Quality First - We never compromise on product quality',
      'Reliable Delivery - Fast and dependable shipping',
      'Customer Support - 24/7 professional support',
      'Competitive Pricing - Best bulk prices in the industry',
    ],
    phone: '+1-800-FLAVOR1',
    email: 'info@flavorfa ctory.com',
    address: '123 Industrial Ave, Food City, FC 12345',
    website: 'www.flavorfa ctory.com',
  };

  const team = [
    {
      id: '1',
      name: 'John Smith',
      title: 'CEO & Founder',
      bio: 'Industry veteran with 20+ years in wholesale food business',
    },
    {
      id: '2',
      name: 'Maria Garcia',
      title: 'VP of Operations',
      bio: 'Logistics expert ensuring timely delivery',
    },
    {
      id: '3',
      name: 'David Chen',
      title: 'Head of Quality',
      bio: 'Food safety certified with strict quality control',
    },
  ];

  const handleCall = () => {
    Linking.openURL(`tel:${companyData.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${companyData.email}`);
  };

  const handleWebsite = () => {
    Linking.openURL(`https://${companyData.website}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <Icon name="storefront-outline" size={80} color="#FF6B35" />
        <Text style={styles.companyName}>{companyData.name}</Text>
        <Text style={styles.tagline}>{companyData.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Icon name="calendar-outline" size={18} color="#FF6B35" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Founded</Text>
              <Text style={styles.infoValue}>{companyData.founded}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <View style={styles.missionBox}>
          <Text style={styles.missionText}>{companyData.mission}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Values</Text>
        {companyData.values.map((value, index) => (
          <View key={index} style={styles.valueItem}>
            <Icon name="checkmark-circle" size={20} color="#FF6B35" />
            <Text style={styles.valueText}>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <TouchableOpacity style={styles.contactCard} onPress={handleCall}>
          <Icon name="call-outline" size={24} color="#FF6B35" />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>{companyData.phone}</Text>
          </View>
          <Icon name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactCard} onPress={handleEmail}>
          <Icon name="mail-outline" size={24} color="#FF6B35" />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>{companyData.email}</Text>
          </View>
          <Icon name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <View style={styles.contactCard}>
          <Icon name="location-outline" size={24} color="#FF6B35" />
          <View style={styles.contactInfo}>
            <Text style={styles.contactLabel}>Address</Text>
            <Text style={styles.contactValue}>{companyData.address}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leadership Team</Text>
        {team.map((member) => (
          <View key={member.id} style={styles.teamCard}>
            <View style={styles.avatarPlaceholder}>
              <Icon name="person-circle" size={50} color="#FF6B35" />
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberTitle}>{member.title}</Text>
              <Text style={styles.memberBio}>{member.bio}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.websiteButton}
          onPress={handleWebsite}
        >
          <Icon name="globe-outline" size={18} color="#fff" />
          <Text style={styles.websiteButtonText}>Visit Our Website</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerSection: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  tagline: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 14,
  },
  infoCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    padding: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  missionBox: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FF6B35',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
  },
  missionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    fontWeight: '500',
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 6,
  },
  valueText: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    marginLeft: 10,
    fontWeight: '500',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  teamCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  avatarPlaceholder: {
    marginRight: 12,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  memberTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B35',
    marginTop: 2,
  },
  memberBio: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    lineHeight: 18,
  },
  websiteButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  websiteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  spacer: {
    height: 20,
  },
});

export default AboutUsScreen;
