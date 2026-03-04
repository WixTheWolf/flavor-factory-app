# Development Guide

This document provides guidelines for developing and maintaining the Flavor Factory B2B Mobile App.

## Getting Started

### Development Environment

1. **Node.js & NPM**
   - Install Node.js 14+ from https://nodejs.org
   - Verify installation: `node --version && npm --version`

2. **React Native CLI**
   ```bash
   npm install -g react-native-cli
   ```

3. **Android Development**
   - Install Android Studio
   - Set ANDROID_HOME environment variable
   - Create an AVD (Android Virtual Device) or use physical device

4. **iOS Development**
   - Install Xcode from App Store
   - Install command line tools: `xcode-select --install`
   - Install Cocoapods: `sudo gem install cocoapods`

## Code Standards

### TypeScript

- Always use TypeScript for new features
- Define interfaces for all data types
- Use strict mode in tsconfig.json
- Avoid using `any` type

### Component Structure

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ComponentProps {
  // Define all props here
  prop1: string;
  prop2?: number;
}

const MyComponent: React.FC<ComponentProps> = ({ prop1, prop2 }) => {
  // Component logic

  return (
    <View style={styles.container}>
      <Text>{prop1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyComponent;
```

### Redux Actions

- Use action types defined in actionTypes.ts
- Use consistent naming: `ACTION_NAME`, `ACTION_NAME_SUCCESS`, `ACTION_NAME_ERROR`
- Always include error handling in reducers

### File Naming

- Components: PascalCase (MyComponent.tsx)
- Services: camelCase (apiService.ts)
- Types/Interfaces: PascalCase (User.ts)
- Styles: camelCase (appStyles.ts)

## Adding New Features

### 1. Add a New Screen

1. Create screen file in `src/screens/NewScreen.tsx`
2. Add to navigation in `src/navigation/RootNavigator.tsx`
3. Add corresponding reducer if needed
4. Update types in `src/types/index.ts`

### 2. Add a New Redux Action

1. Add action type to `src/redux/actionTypes.ts`
2. Create/update reducer in `src/redux/`
3. Add reducer to combineReducers in `src/redux/store.ts`
4. Dispatch action from components using `useDispatch()`

### 3. Add API Integration

1. Add method to `src/services/apiService.ts`
2. Handle loading/error states in Redux
3. Call API from thunk middleware if needed

## State Management Pattern

### Using Redux

```typescript
// Dispatch action
const dispatch = useDispatch();
dispatch({ type: 'ACTION_NAME', payload: data });

// Access state
const state = useSelector((state: RootState) => state.product.items);
```

### Local Component State

Use `useState` for UI-only state:
```typescript
const [isOpen, setIsOpen] = useState(false);
```

## Styling Guidelines

### Color Palette

- **Primary:** #FF6B35 (Orange)
- **Surface:** #fff (White)
- **Background:** #f5f5f5 (Light Gray)
- **Text:** #333, #666, #999
- **Success:** #4CAF50
- **Error:** #F44336

### Responsive Design

- Use Dimensions API for responsive layouts
- Test on multiple screen sizes
- Use flex for flexible layouts
- Set proper padding/margin for different screen sizes

### Typography

- Headings: 24px, fontWeight: 'bold'
- Section titles: 18px, fontWeight: '700'
- Body text: 14px, fontWeight: 'normal'
- Labels: 12px, fontWeight: '600'

## Testing

### Unit Tests

```typescript
import { productReducer } from '../redux/productReducer';

describe('productReducer', () => {
  it('should handle FETCH_PRODUCTS_SUCCESS', () => {
    const action = {
      type: 'FETCH_PRODUCTS_SUCCESS',
      payload: [{ id: '1', name: 'Product' }],
    };
    const result = productReducer(undefined, action);
    expect(result.items).toHaveLength(1);
  });
});
```

### Integration Tests

Test navigation and Redux integration:
```typescript
// Test that navigating and fetching works together
```

## Performance Tips

1. **Use FlatList for Lists**
   - Never use ScrollView with many items
   - Use keyExtractor for proper key management
   - Use renderItem efficiently

2. **Memoize Components**
   ```typescript
   export default React.memo(MyComponent);
   ```

3. **Lazy Loading**
   - Load images on demand
   - Paginate API results
   - Cache responses locally

4. **Avoid Re-renders**
   - Use useCallback for event handlers
   - Use useMemo for expensive calculations
   - Keep Redux selectors specific

## Debugging

### Development Tools

- React Native Debugger: http://localhost:8081/debugger-ui
- Redux DevTools: Monitor state changes
- Network Monitor: Inspect API calls

### Common Debugging Steps

1. **Check console logs**
   ```bash
   react-native log-ios
   react-native log-android
   ```

2. **Inspect Redux state**
   - Use Redux DevTools or Redux Logger

3. **Network debugging**
   - Use Postman for API testing
   - Check network tab in React Native Debugger

## Git Workflow

### Branch Naming

- Feature: `feature/short-description`
- Bug fix: `fix/issue-description`
- Hotfix: `hotfix/urgent-issue`
- Release: `release/v1.0.0`

### Commit Messages

- Use present tense: "Add feature" not "Added feature"
- Be descriptive: "Add bulk pricing feature to product details"
- Reference issues: "Fix #123: Correct MOQ validation"

### Pull Request Process

1. Create feature branch from `main`
2. Make changes and commit
3. Push to remote
4. Create Pull Request with description
5. Wait for code review
6. Merge to main

## Deployment

### Staging Builds

```bash
# Build for staging with staging API
API_URL=https://staging-api.example.com npm run build:android
```

### Production Builds

```bash
# Build for production
npm run build:android
npm run build:ios
```

### Release Checklist

- [ ] Update version in package.json
- [ ] Update CHANGELOG.md
- [ ] Run all tests
- [ ] Build binaries
- [ ] Test on real devices
- [ ] Create release tag
- [ ] Deploy to store

## Environment Variables

Create a `.env` file:

```
API_BASE_URL=https://api.example.com
API_TIMEOUT=10000
LOG_LEVEL=debug
```

Load in app:
```typescript
import Config from 'react-native-config';
const apiUrl = Config.API_BASE_URL;
```

## Troubleshooting Guide

### Build Issues

1. **Dependency conflicts**
   ```bash
   rm -rf node_modules && npm install
   ```

2. **Gradle issues (Android)**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

3. **Pod issues (iOS)**
   ```bash
   cd ios && pod deintegrate && pod install && cd ..
   ```

### Runtime Issues

- Check React version compatibility
- Verify all imports are correct
- Check for circular dependencies
- Inspect Redux state for unexpected values

## Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Redux Docs](https://redux.js.org/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

Contact the development team for questions or issues.
