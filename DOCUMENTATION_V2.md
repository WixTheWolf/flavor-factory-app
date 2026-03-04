# Flavor Factory B2B Mobile App - Complete Documentation

A professional React Native mobile application for flavor ingredient ordering, inventory management, and complete B2B commerce solutions.

## Overview

Flavor Factory B2B is a specialized flavor ingredient ordering platform designed for manufacturers and businesses across multiple industries. The app enables seamless bulk purchasing, technical specification review, formulation support, purchase order management, admin dashboard capabilities, recurring order templates, custom quote requests, and integrated payment processing with vDosPlus inventory system.

### Industries Served

- **Bakery & Confectionery**: Vanilla extracts, fruit flavors, spice compounds, chocolate flavors
- **Beverages**: Juice flavors, soda systems, coffee flavors, beverage concentrates
- **Food Manufacturing**: Specialized food ingredients and compounds, savory flavors
- **Pharmaceutical**: USP/FCC grade flavoring agents for medications and APIs
- **Nutraceutical**: Vitamin-compatible flavors, supplement ingredients, health drink formulations
- **Syrups & Bases**: Concentrated flavor syrups for beverages and fountain drinks
- **Oral Care**: Toothpaste, mouthwash, pharmaceutical-grade oral care flavors
- **Vape & Inhalants**: Specialized vaping compounds and flavoring systems
- **Dairy Products**: Ice cream, yogurt, milk flavoring, butter compounds
- **Other Manufacturing**: Custom applications and specialized flavor solutions

## Core Features

### 1. **Advanced Flavor Product Catalog** 🏭
- Browse 500+ flavor ingredients organized by industry application
- Advanced search and filtering by:
  - Flavor type and family (citrus, berry, spice, vanilla, etc.)
  - Target industry (bakery, pharma, beverage, etc.)
  - Grade certifications (USP/FCC, food-grade, pharmaceutical)
  - Solubility type (water-soluble, oil-soluble, dual-phase)
  - Price range and minimum order quantities
- Detailed flavor specifications for each compound:
  - Complete flavor profiles and sensory notes
  - Application suggestions (e.g., "Cakes, Cookies, Pastries")
  - Grade certifications and compliance standards (USP/FCC)
  - Solubility information and processing guidelines
  - Heat stability and shelf-life characteristics
  - Storage and handling instructions
  - Compatibility information and mixing ratios
- Minimum Order Quantities (MOQ) specific to each flavor type
- Tiered bulk pricing:
  - Tier 1 (0-99 units): Standard pricing
  - Tier 2 (100-499 units): 5-10% bulk discount
  - Tier 3 (500+ units): 10-15% premium bulk discount
- Real-time stock status directly from vDosPlus inventory system
- Product ratings and customer usage recommendations

### 2. **Technical Flavor Information & Compliance** 🧪
- Comprehensive technical specifications for each flavor compound:
  - Chemical components and flavor families
  - Flavor potency and concentration levels
  - Solubility data (water, oil, propylene glycol, etc.)
  - Heat stability specifications and processing recommendations
  - Shelf-life and storage conditions
  - Organoleptic characteristics (aroma, taste profile, mouthfeel)
- Grade certifications and compliance:
  - FCC (Food Chemicals Codex) compliance
  - USP (United States Pharmacopeia) certification for pharma-grade
  - European food additive regulations
  - Kosher and Halal certifications
- Application guides for different industries:
  - Usage rates and concentration recommendations
  - Compatibility with common bases and carriers
  - Processing method recommendations (hot, cold, fermentation)
  - Examples of successful formulations
- Safety data sheets (SDS) and quality certifications downloadable
- Allergen information and cross-contamination warnings

### 3. **B2B Purchase Order System** 🛒
- Create and manage purchase orders with professional templates:
  - Add flavor compounds with precise quantities
  - Real-time price calculation based on current rates and quantity
  - Automatic bulk pricing tier application
  - Multi-unit support (lbs, gallons, kilograms)
  - Line-item notes and special handling instructions
  - Order subtotal, tax, and total calculation
- Draft orders for later completion and modification
- Purchase order history with filtering and search
- Status tracking for submitted orders:
  - Draft → Submitted → Confirmed → Shipped → Delivered
  - Real-time notifications for status changes
- Email confirmations and order summaries
- Ability to clone previous orders for repeat purchases
- Custom PO number generation and integration

### 4. **Recurring Orders & Order Templates** 📅
- Create order templates for frequently purchased products:
  - Save order configurations with custom names
  - Set repeat frequency (weekly, bi-weekly, monthly, quarterly)
  - Automatic order generation on schedule
  - Customize shipping address and special instructions per order
- Manage multiple recurring order templates
- Autopilot mode: Automatically place recurring orders without manual intervention
- Track recurring order history and next scheduled delivery
- Flexible modification of recurring templates
- One-click order placement from templates for manual processing
- Email reminders for upcoming scheduled orders
- Perfect for consistent bulk orders from regular customers

### 5. **Custom Flavor Quote Requests** ✨
- Request quotes for custom flavor formulations:
  - Specify application type (bakery, pharma, beverage, etc.)
  - Describe desired flavor profile and sensory characteristics
  - Indicate target market and product category
  - Provide estimated monthly volume requirements
  - List special requirements (organic, non-GMO, allergen-free, etc.)
- Quote request tracking with status updates:
  - Pending → Reviewed → Quoted → Accepted/Rejected
- Receive technical recommendations from flavor specialists:
  - Recommended flavor compounds and combinations
  - Detailed specifications and processing guidelines
  - Pricing quotes with minimum order volumes
  - Quote validity period (typically 30 days)
- Direct communication with technical/sales team
- Quote comparison and acceptance workflow
- Integration with product catalog for accepted custom formulations

### 6. **Admin Dashboard for Product Management** ⚙️
- Comprehensive admin portal restricted to authorized users:
  - Product inventory management (add, edit, delete)
  - Pricing and bulk discount tier management
  - Real-time inventory level synchronization with vDosPlus
  - Stock alert configuration and low-inventory warnings
  - Product image and specification management
- **Products Tab**:
  - Add new flavor products to catalog
  - Edit existing products (name, category, specifications, MOQ, price)
  - Delete discontinued products
  - Bulk import of product data
  
- **Pricing Tab**:
  - Configure tiered pricing structure for all products
  - Set bulk discount levels (Tier 1, 2, 3)
  - Manage promotional pricing and special offers
  - Pricing history and change tracking
  
- **Inventory Tab**:
  - Monitor current stock levels
  - Visual inventory bars showing stock percentage
  - Stock status indicators (good/low/out-of-stock)
  - MOQ compliance checking
  - Automatic sync with vDosPlus inventory system
  
- **Analytics Tab**:
  - Sales analytics and trending products
  - Revenue tracking by product category
  - Order volume metrics
  - Customer purchasing patterns
  - Report generation and export capabilities

### 7. **vDosPlus Integration** 🔌
Complete synchronization with existing vDosPlus inventory management system:
- **Real-time Inventory Sync**:
  - Automatic inventory level updates every 5 minutes
  - Low stock alerts when inventory falls below MOQ
  - Prevents overselling of products
  - Bi-directional sync with vDosPlus database
  
- **Product Data Sync**:
  - Automatic product catalog updates from vDosPlus
  - Specification and pricing synchronization
  - New product automatic addition to app
  - Discontinued product removal
  
- **Order Integration**:
  - Submitted purchase orders sent to vDosPlus for fulfillment
  - Inventory automatically deducted upon order submission
  - Order status updates from vDosPlus ERP system
  - Shipping and tracking information sync
  
- **Stock Monitoring**:
  - Real-time stock level visibility
  - Stock alert generation for low-inventory situations
  - Bulk inventory update capabilities
  - Inventory forecasting based on historical orders

### 8. **Billing & Payment Integration** 💳
Complete payment processing and billing workflow:
- **Payment Methods**:
  - Credit card processing (Visa, Mastercard, American Express)
  - ACH/Bank transfer for large orders
  - PayPal business account integration
  - Saved payment methods for quick checkout
  - Payment method management (add, edit, delete)

- **Invoice Management**:
  - Automatic invoice generation for submitted orders
  - Professional invoice PDF download
  - Invoice history with filtering and search
  - DueDate tracking with payment reminders
  - Net 30/60/90 day payment terms

- **Payment Processing**:
  - PCI-DSS compliant secure payment processing
  - Automatic tax calculation by location
  - Multiple currency support (coming soon)
  - Payment confirmation emails with receipts
  - Failed payment retry workflows

- **Billing History**:
  - Complete transaction history
  - Payment receipt downloads
  - Refund tracking and status
  - Tax document export for accounting

- **Subscription & Recurring Billing**:
  - Automatic billing for recurring orders
  - Flexible subscription management
  - Upgrade/downgrade recurring order values
  - Payment failure recovery workflows

### 9. **Order Tracking & History** 📦
- View all submitted purchase orders with status indicators
- Real-time order status updates:
  - Pending confirmation
  - Confirmed and preparing for shipment
  - In transit with tracking information
  - Delivered with signature confirmation
- Filter orders by status, date range, and value
- Download order copies and invoices
- Track shipment details and carrier information
- Automated email notifications for status changes

### 10. **Company Profile & Account Management** 👤
- Business account setup with company details:
  - Company name, registration number
  - Primary contact information
  - Billing and shipping addresses (multiple address support)
  - Payment terms and credit limits configuration
- Account preference settings:
  - Default units (lbs vs. kg)
  - Notification preferences
  - Communication frequency
  - Language and display preferences
- User management (for admin users):
  - Team member access control
  - Role-based permissions
  - Activity logging and audit trail

### 11. **About Us & Company Information** ℹ️
- Comprehensive company information:
  - Flavor Factory company history and mission
  - Founded in 1998, 25+ years manufacturing experience
  - Team member profiles with technical expertise
  - Manufacturing certifications and capabilities
- Contact information:
  - Multiple phone lines by department
  - Email contacts for different business functions
  - Office address in Charlotte, NC
  - Social media links and online presence
- Company achievements:
  - Industry certifications and recognitions
  - Customer success stories
  - Manufacturing capabilities and capacity information

## Technical Architecture

### Technology Stack
- **Frontend**: React Native with TypeScript 5.0
- **State Management**: Redux with Redux Thunk middleware
- **Navigation**: React Navigation (bottom tabs + stack navigators)
- **HTTP Client**: Axios 1.4.0 for API communication
- **Local Storage**: AsyncStorage for cart/order persistence
- **UI Components**: React Native Vector Icons, custom styled components
- **Development**: Node.js 14+, Expo for development/testing
- **Target Platforms**: iOS 12+ and Android API 21+

### Redux State Structure
```
├── products: { products: [], loading, error, filters }
├── cart: { items: [], subtotal, tax, total, discounts }
├── orders: { orders: [], loading, error, currentOrder }
├── auth: { user: {}, isAuthenticated, role, userPreferences }
├── ui: { loading, notifications, modals, theme }
└── recurringOrder: { recurringOrders: [], customQuotes: [], loading }
```

### API Integration Points
1. **vDosPlus Service** (`src/services/vdosplus.ts`):
   - `getInventoryLevels()` - Real-time stock monitoring
   - `getProductWithStock()` - Product with current inventory
   - `getAllProducts()` - Full product catalog
   - `searchProducts()` - Advanced product search
   - `submitPurchaseOrder()` - Order submission
   - `getOrderStatus()` - Track submitted orders
   - `bulkUpdateInventory()` - Admin inventory updates
   - `getStockAlerts()` - Low inventory warnings

2. **Payment Service** (`src/services/paymentService.ts`):
   - `createPaymentIntent()` - Initialize payment for order
   - `processCardPayment()` - Credit card transactions
   - `processACHPayment()` - Bank transfer processing
   - `createInvoice()` - Generate billing documents
   - `getPaymentMethods()` - Customer payment method management
   - `savePaymentMethod()` - Store secure payment info
   - `getTransactionHistory()` - Payment audit trail
   - `getInvoiceStatus()` - Payment status tracking
   - `setupRecurringPayment()` - Subscription management
   - `calculateTax()` - Sales tax computation

3. **API Service** (`src/services/apiService.ts`):
   - `getProducts()` - Fetch product catalog
   - `searchProducts()` - Search and filter products
   - `createOrder()` - Submit purchase order
   - `getOrders()` - Order history
   - `getCompanyInfo()` - Business account details

## File Structure

```
flavor-factory-app/
├── src/
│   ├── screens/
│   │   ├── ProductsScreen.tsx         # Product catalog & search
│   │   ├── ProductDetailsScreen.tsx   # Product specifications
│   │   ├── CartScreen.tsx             # PO items and management
│   │   ├── CheckoutScreen.tsx         # Order submission form
│   │   ├── OrdersScreen.tsx           # Order history & tracking
│   │   ├── AboutUsScreen.tsx          # Company information
│   │   ├── ProfileScreen.tsx          # Account management
│   │   ├── RecurringOrdersScreen.tsx  # Order templates & automation
│   │   ├── CustomQuoteScreen.tsx      # Custom flavor requests
│   │   ├── AdminDashboardScreen.tsx   # Product/inventory management
│   │   └── BillingPaymentScreen.tsx   # Payments & invoicing
│   ├── components/
│   │   ├── ProductCard.tsx            # Product grid item
│   │   └── BulkProductCard.tsx        # Bulk-focused product card
│   ├── redux/
│   │   ├── store.ts                   # Redux store configuration
│   │   ├── productReducer.ts          # Product state management
│   │   ├── cartReducer.ts             # Cart/PO state management
│   │   ├── orderReducer.ts            # Order state management
│   │   ├── authReducer.ts             # Authentication state
│   │   ├── uiReducer.ts               # UI state (loading, notifications)
│   │   └── recurringOrderReducer.ts   # Recurring orders & quotes state
│   ├── services/
│   │   ├── apiService.ts              # Main API client
│   │   ├── vdosplus.ts                # vDosPlus inventory integration
│   │   ├── paymentService.ts          # Payment/billing processing
│   │   └── storageService.ts          # Local persistence (AsyncStorage)
│   ├── navigation/
│   │   └── RootNavigator.tsx          # App navigation structure
│   ├── types/
│   │   └── index.ts                   # TypeScript interfaces
│   ├── App.tsx                        # Root component
│   └── index.js                       # App entry point
├── package.json
├── tsconfig.json
├── README.md
├── DOCUMENTATION.md                   # This file
├── DEVELOPMENT.md
├── GETTING_STARTED.md
└── CHANGELOG.md
```

## Data Models

### Product
```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  moq: number;
  price: number;
  stock: number;
  image?: string;
  specifications?: string[];
  applications?: string[];
  certifications?: string[];
}
```

### Cart Item
```typescript
interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  moq: number;
  subtotal: number;
}
```

### Purchase Order
```typescript
interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'submitted' | 'confirmed' | 'shipped' | 'delivered';
  shippingAddress: string;
  companyName: string;
  email: string;
  phone: string;
  poNumber?: string;
  notes?: string;
  createdAt: string;
  estimatedDelivery?: string;
}
```

### Recurring Order
```typescript
interface RecurringOrder {
  id: string;
  name: string;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'quarterly';
  nextDelivery: string;
  items: CartItem[];
  totalValue: number;
  automateReordering: boolean;
  notes: string;
  createdAt: string;
  lastOrdered?: string;
}
```

### Custom Quote
```typescript
interface CustomQuote {
  id: string;
  status: 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'rejected';
  requestDate: string;
  applicationType: string;
  flavorProfile: string;
  targetMarket: string;
  estimatedVolume: number;
  specialRequirements: string;
  quotedPrice?: number;
  quotedDate?: string;
  expiryDate?: string;
  notes: string;
}
```

## Configuration & Environment Variables

Create a `.env` file in the project root:

```env
# vDosPlus Integration
VDOSPLUS_API_URL=https://api.vdosplus.com/api
VDOSPLUS_API_KEY=your-api-key-here

# Payment Processing
STRIPE_API_KEY=pk_test_your_stripe_key
PAYPAL_API_KEY=your-paypal-api-key
PAYMENT_API_URL=https://api.payments.local/api

# App Configuration
API_BASE_URL=https://api.flavorfactory.local
APP_ENV=production
LOG_LEVEL=info
```

## Security Considerations

- **PCI-DSS Compliance**: Payment processing follows PCI-DSS standards
- **Data Encryption**: All API calls use HTTPS/TLS encryption
- **Authentication**: JWT-based session management (when backend is implemented)
- **Role-Based Access**: Admin dashboard restricted to authorized users only
- **Input Validation**: All user inputs validated before submission
- **Secure Storage**: Sensitive data stored securely in AsyncStorage (encrypted in production)
- **Error Handling**: Sensitive error details not exposed to end users

## Performance Optimization

- **Image Optimization**: Product images optimized for mobile networks
- **Redux Caching**: Product data cached to minimize API calls
- **Lazy Loading**: Product lists use virtualization for large catalogs
- **Code Splitting**: Navigation structure enables code lazy loading
- **Network Requests**: Debounced search and filter operations
- **Memory Management**: Proper stream/resource cleanup in lifecycle

## Testing Recommendations

### Unit Tests
- Product search and filtering logic
- Price calculation and bulk discount logic
- Redux reducer functions
- Order validation logic

### Integration Tests
- vDosPlus API integration
- Payment processing workflow
- Complete order submission flow
- Recurring order generation

### E2E Tests
- Product search → add to cart → checkout → payment
- Admin product management workflow
- Custom quote request and acceptance
- Recurring order creation and automation

## Deployment & Release

### Development Build
```bash
npm install
npm start
```

### Production Build
```bash
npm run build:ios
npm run build:android
```

### App Store Deployment
- Target iOS deployment: App Store with TestFlight beta
- Target Android deployment: Google Play Store with beta testing

## Support & Maintenance

### Common Issues & Troubleshooting
- **vDosPlus Connection Failed**: Check API_KEY and network connectivity
- **Payment Declined**: Verify card details and contact payment processor
- **Empty Product List**: Ensure vDosPlus sync is completed and API is accessible
- **Order Not Submitted**: Check network connection and form validation

### Monitoring & Logging
- API request/response logging
- Error event tracking
- User action analytics
- Performance metrics (load time, responsiveness)

### Future Enhancements
- Multi-language support (Spanish, French, Chinese)
- Advanced analytics dashboard with charts and reporting
- Integration with accounting software (QuickBooks, Xero)
- Mobile app push notifications for order updates
- Voice-activated ordering (upcoming)
- AI-powered flavor recommendations based on history
- Supplier integration for ingredient sourcing
- Quality certifications and compliance document management

## API Documentation

Detailed API endpoint documentation is available in:
- [vDosPlus API Guide](./docs/VDOSPLUS_API.md)
- [Payment API Guide](./docs/PAYMENT_API.md)
- [Internal API Reference](./docs/API_REFERENCE.md)

## Contributing

All team members should follow the development guidelines in [DEVELOPMENT.md](./DEVELOPMENT.md).

## License

Proprietary - Flavor Factory © 2024

## Contact & Support

- **Development Team**: dev@flavorfactory.net
- **Technical Support**: support@flavorfactory.net
- **Sales & Account Management**: sales@flavorfactory.net
