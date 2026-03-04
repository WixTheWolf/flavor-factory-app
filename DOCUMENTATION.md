# Flavor Factory B2B Mobile App - Complete Documentation

A professional React Native mobile application for comprehensive flavor ingredient ordering, inventory management, admin dashboards, recurring order automation, custom formulation requests, and complete B2B commerce solutions.

## Overview

Flavor Factory B2B is a feature-rich flavor ingredient ordering and business management platform designed for manufacturers and businesses across multiple industries. The app enables seamless bulk purchasing, technical specification review, formulation support, complete purchase order management, recurring order automation, custom flavor requests, admin product/inventory control, integrated payment processing, and direct synchronization with vDosPlus inventory system.

### Industries Served

- **Bakery**: Vanilla extracts, fruit flavors, spice compounds
- **Beverage**: Juice flavors, soda systems, coffee flavors
- **Food Manufacturing**: Specialized food ingredients and compounds
- **Pharmaceutical**: USP/FCC grade flavoring agents for medications
- **Nutraceutical**: Vitamin-compatible flavors, supplement ingredients
- **Syrups**: Concentrated flavor syrups for beverages
- **Oral Care**: Toothpaste, mouthwash, pharmaceutical-grade flavors
- **Vape**: Specialized vaping compounds and flavoring systems
- **Confectionery**: Candy, chocolate, and confection flavors
- **Dairy**: Ice cream, yogurt, and dairy product flavors

## Features

### 1. Advanced Flavor Product Catalog
- Browse 500+ flavor ingredients organized by industry application
- Search and filter by flavor type, industry, and certifications
- View detailed flavor specifications:
  - Technical flavor profiles and notes
  - Application suggestions (e.g., "Cakes, Cookies, Pastries")
  - Grade certifications (USP/FCC for pharma-grade options)
  - Solubility information (water-soluble, oil-soluble, dual-phase)
  - Heat stability and processing guidelines
- Minimum Order Quantities specific to each flavor compound
- Tiered pricing (unit vs. bulk discounts)
- Real-time stock status from vDosPlus inventory

### 2. Technical Flavor Information
- Comprehensive specifications for each flavor compound
- Flavor family categorization
- Grade certifications and compliance standards
- Application guides for different industries
- Usage rates and mixing recommendations
- Storage and handling instructions
- Compatibility charts with common bases and carriers
### 3. B2B Purchase Order & Checkout
- Add flavor compounds to purchase orders with quantity specifications
- Real-time price calculation based on order quantity
- Automatic bulk pricing application for MOQ compliance
- Support for multiple units (lbs, gallons, etc.)
- Draft purchase orders before submission
- Add company and shipping information
- Specify custom PO numbers for internal tracking
- Add technical notes or formulation requirements
- Request custom quotes for specialized blends
- Submit orders with confirmation

### 4. Order Tracking & Management
- View all submitted purchase orders
- Track order status (pending, confirmed, shipped, delivered)
- Access order details and history
- Download order fulfillment confirmations
- Monitor shipment status synchronized with vDosPlus

### 5. Technical Support & Account Features
- Company profile management for manufacturing partners
- Multiple shipping and receiving addresses
- Contact information and procurement contact management
- Flavor technical knowledge base
- Application notes and usage guidelines
- Direct access to technical support team

### 6. Custom Quote Requests
- Request custom flavor blends and formulations
- Submit special requests for non-standard applications
- Direct communication with Flavor Factory technical team
- Quote tracking and follow-up

## About Flavor Factory

Flavor Factory is a premier flavor ingredient manufacturer serving multiple industries for over 25 years. We specialize in:

- **High-Impact Flavorings** for bakery, beverage, confectionery, and dairy products
- **Pharmaceutical-Grade Compounds** meeting USP/FCC standards
- **Nutraceutical Solutions** compatible with vitamin and supplement formulations
- **Specialty Oral Care Flavors** for toothpaste, mouthwash, and medicated products
- **Advanced Vape Compounds** with precise flavor delivery systems
- **Custom Formulations** tailored to specific application requirements

Our commitment is to provide technical excellence, consistent quality, and innovative flavor solutions backed by deep industry expertise.

**Location:** Charlotte, NC  
**Industries Served:** Bakery, Beverage, Food Manufacturing, Pharmaceutical, Nutraceutical, Oral Care, Vape, Confectionery, Dairy  
**Integrations:** vDosPlus inventory management, direct sales CRM, B2B ordering systems

## Technology Stack

- **Framework:** React Native 0.72.0
- **Language:** TypeScript
- **State Management:** Redux with Redux Thunk
- **Navigation:** React Navigation (Bottom Tab + Stack Navigators)
- **HTTP Client:** Axios
- **Storage:** AsyncStorage
- **UI Components:** React Native Vector Icons
- **Build Tools:** Native Swift/Kotlin support

## Project Structure

```
src/
├── screens/              # Full-page screen components
│   ├── ProductsScreen.tsx
│   ├── ProductDetailsScreen.tsx
│   ├── CartScreen.tsx (PO Draft)
│   ├── CheckoutScreen.tsx (PO Submission)
│   ├── OrdersScreen.tsx
│   ├── AboutUsScreen.tsx
│   └── ProfileScreen.tsx
├── components/           # Reusable UI components
│   ├── ProductCard.tsx
│   └── BulkProductCard.tsx
├── navigation/           # Navigation configuration
│   └── RootNavigator.tsx
├── redux/                # State management
│   ├── store.ts
│   ├── productReducer.ts
│   ├── cartReducer.ts
│   ├── orderReducer.ts
│   ├── authReducer.ts
│   ├── uiReducer.ts
│   └── actionTypes.ts
├── services/             # API and storage services
│   ├── apiService.ts
│   └── storageService.ts
├── types/                # TypeScript definitions
│   └── index.ts
├── styles/               # Shared styles (if needed)
├── constants/            # App constants
└── utils/                # Utility functions

App.tsx                   # Main app component
index.js                  # Entry point
```

## Installation & Setup

### Prerequisites
- Node.js 14+ and npm/yarn
- Android Studio (for Android development)
- Xcode (for iOS development)
- React Native CLI

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/WixTheWolf/flavor-factory-app.git
   cd flavor-factory-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install pod dependencies (iOS)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro Bundler**
   ```bash
   npm start
   ```

5. **Run on Android**
   ```bash
   npm run android
   ```

6. **Run on iOS**
   ```bash
   npm run ios
   ```

## API Integration

The app connects to a RESTful API for product data and order management. Update the `API_BASE_URL` in `src/services/apiService.ts`:

```typescript
const API_BASE_URL = 'https://your-api-domain.com/api';
```

### Available Endpoints

- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `GET /products/search?q=query` - Search products
- `POST /orders` - Create a purchase order
- `GET /orders?userId=id` - Get user orders
- `GET /orders/:id` - Get order details
- `GET /company/info` - Get company information
- `GET /company/team` - Get team members

## Redux State Structure

```typescript
{
  products: {
    items: Product[],
    selectedProduct: Product | null,
    loading: boolean,
    error: string | null
  },
  cart: {
    items: CartItem[],
    total: number
  },
  orders: {
    items: Order[],
    loading: boolean,
    error: string | null
  },
  auth: {
    user: User | null,
    isAuthenticated: boolean
  },
  ui: {
    isLoading: boolean,
    error: string | null
  }
}
```

## Data Types

### Product
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;           // Unit price
  bulkPrice: number;       // Bulk pricing
  moq: number;             // Minimum Order Quantity
  image: string;
  category: string;
  unit: string;            // e.g., "lbs", "boxes"
  inStock: boolean;
}
```

### CartItem / PO Item
```typescript
interface CartItem extends Product {
  cartQuantity: number;    // Quantity in the order
}
```

### Order / Purchase Order
```typescript
interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: string;
}
```

## Styling

The app uses a consistent design system with:
- **Primary Color:** #FF6B35 (Orange)
- **Background:** #fff (White), #f5f5f5 (Light Gray)
- **Text:** #333 (Dark), #666 (Gray), #999 (Light Gray)
- **Status Colors:** 
  - Success: #4CAF50 (Green)
  - Error: #F44336 (Red)
  - Warning: #FFC107 (Amber)
  - Info: #2196F3 (Blue)

## Testing

Run tests with:
```bash
npm test
```

Run tests in watch mode:
```bash
npm test -- --watch
```

## Build & Release

### Android
```bash
npm run build:android
# APK will be in android/app/build/outputs/apk/release/
```

### iOS
```bash
npm run build:ios
# App will be in ios/build folder
```

## Performance Optimization

- Lazy load product images
- Cache API responses locally using AsyncStorage
- Memoize components to prevent unnecessary re-renders
- Use FlatList with optimized rendering for large product lists

## Security Considerations

- Sanitize user inputs
- Use HTTPS for API calls
- Store sensitive data securely (AsyncStorage encryption recommended)
- Validate user authentication tokens
- Implement rate limiting on API calls

## Troubleshooting

### Common Issues

1. **Metro Bundler Issues**
   ```bash
   npm start -- --reset-cache
   ```

2. **Pod Install Issues (iOS)**
   ```bash
   cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
   ```

3. **Android Build Issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   npm run android
   ```

4. **Port Already in Use**
   ```bash
   # Kill process on port 8081
   lsof -ti:8081 | xargs kill -9
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Submit a Pull Request

## License

This project is confidential and proprietary. All rights reserved.

## Support

For issues and questions:
- Email: support@flavorfa ctory.com
- Phone: +1-800-FLAVOR1

## Version History

- **v1.0.0** (Current) - Initial release with core B2B features
  - Product catalog browsing
  - Purchase order management
  - Business account features
  - Order tracking

## Roadmap

- [ ] Mobile payment integration
- [ ] Recurring order templates
- [ ] Advanced analytics and reporting
- [ ] Multi-warehouse support
- [ ] Integration with accounting software
- [ ] Real-time inventory updates
- [ ] Customer support chat
- [ ] API rate limiting dashboard
