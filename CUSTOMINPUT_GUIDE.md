# CustomInput Component - Usage Guide

## Overview
Enhanced text input component with built-in validation, accessibility, and visual feedback.

---

## Basic Usage

```typescript
import CustomInput from '@components/CustomInput';

// Simple text input
<CustomInput
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
/>
```

---

## All Available Props

```typescript
interface CustomInputProps extends TextInputProps {
  // Basic Props
  label?: string;                 // Label text above input
  placeholder?: string;           // Placeholder text
  value?: string;                 // Input value
  onChangeText?: (text: string) => void;  // Change handler
  
  // Visual Props
  iconName?: string;              // Ionicons icon name (e.g., 'mail-outline')
  containerStyle?: ViewStyle;     // Custom container styling
  
  // Validation Props
  error?: string;                 // Error message to display
  success?: boolean;              // Show success state
  successMessage?: string;        // Success message to display
  required?: boolean;             // Show required indicator (*)
  
  // Helper Props
  helperText?: string;            // Helper text below input
  showCharacterCount?: boolean;   // Show character counter
  maxLength?: number;             // Maximum character length
  
  // Special Props
  password?: boolean;             // Password input with toggle
  editable?: boolean;             // Enable/disable input
  
  // All standard TextInput props are also supported
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: KeyboardType;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  // ... and more
}
```

---

## Common Use Cases

### 1. Email Input with Validation

```typescript
const [email, setEmail] = useState('');
const [emailTouched, setEmailTouched] = useState(false);

const emailError = useMemo(() => {
  if (!emailTouched || !email) return undefined;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return undefined;
}, [email, emailTouched]);

<CustomInput
  label="Email"
  iconName="mail-outline"
  placeholder="Enter your email"
  value={email}
  onChangeText={setEmail}
  onBlur={() => setEmailTouched(true)}
  keyboardType="email-address"
  autoCapitalize="none"
  autoCorrect={false}
  error={emailError}
  required
/>
```

### 2. Password Input

```typescript
const [password, setPassword] = useState('');

<CustomInput
  label="Password"
  iconName="lock-closed-outline"
  placeholder="Enter your password"
  value={password}
  onChangeText={setPassword}
  password  // Enables password toggle
  autoCapitalize="none"
  required
/>
```

### 3. Password with Strength Validation

```typescript
const [password, setPassword] = useState('');
const [passwordTouched, setPasswordTouched] = useState(false);

const passwordError = useMemo(() => {
  if (!passwordTouched || !password) return undefined;
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain an uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain a lowercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain a number';
  }
  return undefined;
}, [password, passwordTouched]);

<CustomInput
  label="Password"
  iconName="lock-closed-outline"
  placeholder="Create a password"
  value={password}
  onChangeText={setPassword}
  onBlur={() => setPasswordTouched(true)}
  password
  autoCapitalize="none"
  error={passwordError}
  helperText="Must be 8+ characters with uppercase, lowercase, and number"
  required
/>
```

### 4. Confirm Password with Match Validation

```typescript
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

const confirmPasswordError = useMemo(() => {
  if (!confirmPasswordTouched || !confirmPassword) return undefined;
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return undefined;
}, [password, confirmPassword, confirmPasswordTouched]);

<CustomInput
  label="Confirm Password"
  iconName="lock-closed-outline"
  placeholder="Confirm your password"
  value={confirmPassword}
  onChangeText={setConfirmPassword}
  onBlur={() => setConfirmPasswordTouched(true)}
  password
  autoCapitalize="none"
  error={confirmPasswordError}
  success={confirmPassword.length > 0 && !confirmPasswordError}
  successMessage={confirmPassword.length > 0 && !confirmPasswordError ? "Passwords match" : undefined}
  required
/>
```

### 5. Text Input with Character Counter

```typescript
const [bio, setBio] = useState('');

<CustomInput
  label="Bio"
  placeholder="Tell us about yourself"
  value={bio}
  onChangeText={setBio}
  multiline
  numberOfLines={4}
  maxLength={200}
  showCharacterCount
  helperText="Share a brief description about yourself"
/>
```

### 6. Phone Number Input

```typescript
const [phone, setPhone] = useState('');

<CustomInput
  label="Phone Number"
  iconName="call-outline"
  placeholder="Enter your phone number"
  value={phone}
  onChangeText={setPhone}
  keyboardType="phone-pad"
  required
/>
```

### 7. Disabled Input (Display Only)

```typescript
<CustomInput
  label="Account ID"
  value={accountId}
  editable={false}
  iconName="id-card-outline"
/>
```

### 8. Multiline Text Area

```typescript
const [message, setMessage] = useState('');

<CustomInput
  label="Message"
  placeholder="Enter your message"
  value={message}
  onChangeText={setMessage}
  multiline
  numberOfLines={6}
  maxLength={500}
  showCharacterCount
/>
```

---

## Validation Patterns

### Email Validation
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = emailRegex.test(email);
```

### Password Strength
```typescript
const validatePassword = (password: string) => {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: hasMinLength && hasUppercase && hasLowercase && hasNumber,
    strength: hasSpecial && password.length >= 12 ? 'strong' : 
              hasMinLength && hasUppercase && hasLowercase && hasNumber ? 'medium' : 
              'weak'
  };
};
```

### Phone Number
```typescript
const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
const isValidPhone = phoneRegex.test(phone);
```

---

## Styling

### Custom Container Style
```typescript
<CustomInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  containerStyle={{
    marginBottom: 24,
    paddingHorizontal: 16,
  }}
/>
```

### Custom Input Style
```typescript
<CustomInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  style={{
    fontSize: 18,
    fontWeight: '500',
  }}
/>
```

---

## Accessibility

The component automatically handles:
- ✅ Accessibility labels from `label` prop
- ✅ Accessibility hints from `helperText` prop
- ✅ Accessibility states (disabled, required, error)
- ✅ Screen reader support
- ✅ Keyboard navigation

---

## Icons

Use any Ionicons icon name:
- `mail-outline` - Email
- `lock-closed-outline` - Password
- `person-outline` - Name/User
- `call-outline` - Phone
- `location-outline` - Address
- `calendar-outline` - Date
- `card-outline` - Payment
- `search-outline` - Search
- `chatbubble-outline` - Message
- And 1000+ more from Ionicons

---

## Best Practices

### 1. Always use `useMemo` for validation
```typescript
const emailError = useMemo(() => {
  // validation logic
}, [email, emailTouched]);
```

### 2. Only show errors after field is touched
```typescript
const [emailTouched, setEmailTouched] = useState(false);

<CustomInput
  onBlur={() => setEmailTouched(true)}
  error={emailTouched ? emailError : undefined}
/>
```

### 3. Trim whitespace before validation
```typescript
const handleSubmit = () => {
  const trimmedEmail = email.trim();
  // use trimmedEmail for validation and submission
};
```

### 4. Disable inputs during loading
```typescript
<CustomInput
  editable={!loading}
  value={email}
  onChangeText={setEmail}
/>
```

### 5. Use appropriate keyboard types
```typescript
// Email
keyboardType="email-address"

// Phone
keyboardType="phone-pad"

// Numbers
keyboardType="numeric"

// URL
keyboardType="url"
```

---

## Theme Integration

The component automatically uses theme colors:
- `theme.colors.primary[600]` - Focus state
- `theme.colors.error.main` - Error state
- `theme.colors.success.main` - Success state
- `theme.colors.text.primary` - Text color
- `theme.colors.text.secondary` - Label color
- `theme.colors.text.disabled` - Placeholder color
- `theme.colors.border.light` - Border color
- `theme.colors.background.paper` - Background color

---

## Performance Tips

1. **Use `useMemo` for computed values**
2. **Use `useCallback` for event handlers**
3. **Avoid inline functions in props**
4. **Minimize re-renders with proper state management**

---

## Common Mistakes to Avoid

❌ **Don't** show errors immediately
```typescript
// Bad
<CustomInput error={emailError} />
```

✅ **Do** show errors after user interaction
```typescript
// Good
<CustomInput error={emailTouched ? emailError : undefined} />
```

❌ **Don't** validate on every keystroke
```typescript
// Bad - causes performance issues
onChange={(text) => {
  setEmail(text);
  validateEmail(text); // Heavy operation
}}
```

✅ **Do** use debounced validation or validate on blur
```typescript
// Good
onBlur={() => setEmailTouched(true)}
```

❌ **Don't** forget to trim whitespace
```typescript
// Bad
if (email === '') return;
```

✅ **Do** trim before validation
```typescript
// Good
if (email.trim() === '') return;
```

---

## TypeScript Support

Full TypeScript support with type inference:

```typescript
import { CustomInputProps } from '@components/CustomInput';

const MyInput: React.FC<CustomInputProps> = (props) => {
  return <CustomInput {...props} />;
};
```

---

## Testing

### Unit Test Example
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import CustomInput from '@components/CustomInput';

test('shows error message when error prop is provided', () => {
  const { getByText } = render(
    <CustomInput
      label="Email"
      value=""
      error="Invalid email"
    />
  );
  
  expect(getByText('Invalid email')).toBeTruthy();
});
```

---

## Migration from Standard TextInput

### Before:
```typescript
<View>
  <Text>Email</Text>
  <TextInput
    value={email}
    onChangeText={setEmail}
    placeholder="Enter email"
  />
  {error && <Text style={{ color: 'red' }}>{error}</Text>}
</View>
```

### After:
```typescript
<CustomInput
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="Enter email"
  error={error}
/>
```

---

## Support

For issues or questions:
1. Check this guide
2. Review the component source code
3. Check existing implementations in LoginScreen and RegisterScreen
4. Refer to the IMPROVEMENTS_SUMMARY.md document

---

**Last Updated**: February 14, 2026
**Version**: 2.0.0
**Status**: Production Ready ✅
