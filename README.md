# zim-phone-utils

A comprehensive JavaScript utility library for validating, formatting, and detecting carriers for Zimbabwean phone numbers (mobile and landline).

## Features

✅ **Mobile Number Support**
- Econet: 077, 078
- NetOne: 071  
- Telecel: 073

✅ **Landline Number Support**
- Harare: 024
- Bulawayo: 029
- Gweru: 054
- Mutare: 020
- Masvingo: 039
- Kwekwe: 055
- Chinhoyi: 067
- Marondera: 065
- Bindura: 066

✅ **Multiple Format Support**
- Local: 0772123456, 0242123456
- International: +263772123456, +263242123456
- Without +: 263772123456, 263242123456

✅ **MVC Architecture**
- Clean separation of concerns
- Easy to maintain and extend
- Well-documented code

## Installation

```bash
npm install zim-phone-utils
```

## Quick Start

```javascript
const phoneUtils = require('zim-phone-utils');

// Validate a phone number
phoneUtils.isValid('0772123456'); // true
phoneUtils.isValid('0242123456'); // true
phoneUtils.isValid('invalid');    // false

// Format numbers
phoneUtils.formatLocal('+263772123456');        // '0772123456'
phoneUtils.formatInternational('0772123456');   // '+263772123456'

// Detect carrier (mobile only)
phoneUtils.detectCarrier('0772123456'); // 'Econet'
phoneUtils.detectCarrier('0712123456'); // 'NetOne'
phoneUtils.detectCarrier('0732123456'); // 'Telecel'

// Detect area (landline only)
phoneUtils.detectArea('0242123456'); // 'Harare'
phoneUtils.detectArea('0292123456'); // 'Bulawayo'
```

## API Reference

### Core Functions

#### `isValid(number)`
Validates if a phone number is a valid Zimbabwean number.

```javascript
phoneUtils.isValid('0772123456');     // true
phoneUtils.isValid('+263772123456');  // true
phoneUtils.isValid('0242123456');     // true
phoneUtils.isValid('invalid');        // false
```

#### `formatLocal(number)`
Formats a phone number to local Zimbabwean format.

```javascript
phoneUtils.formatLocal('+263772123456');  // '0772123456'
phoneUtils.formatLocal('263772123456');   // '0772123456'
phoneUtils.formatLocal('0772123456');     // '0772123456'
```

#### `formatInternational(number)`
Formats a phone number to international format.

```javascript
phoneUtils.formatInternational('0772123456');    // '+263772123456'
phoneUtils.formatInternational('263772123456');  // '+263772123456'
phoneUtils.formatInternational('+263772123456'); // '+263772123456'
```

#### `formatBoth(number)`
Returns both local and international formats.

```javascript
const result = phoneUtils.formatBoth('0772123456');
// {
//   local: '0772123456',
//   international: '+263772123456'
// }
```

### Detection Functions

#### `detectCarrier(number)`
Detects the mobile carrier for mobile numbers.

```javascript
phoneUtils.detectCarrier('0772123456'); // 'Econet'
phoneUtils.detectCarrier('0782123456'); // 'Econet'
phoneUtils.detectCarrier('0712123456'); // 'NetOne'
phoneUtils.detectCarrier('0732123456'); // 'Telecel'
phoneUtils.detectCarrier('0242123456'); // null (landline)
```

#### `detectArea(number)`
Detects the city/area for landline numbers.

```javascript
phoneUtils.detectArea('0242123456'); // 'Harare'
phoneUtils.detectArea('0292123456'); // 'Bulawayo'
phoneUtils.detectArea('0542123456'); // 'Gweru'
phoneUtils.detectArea('0772123456'); // null (mobile)
```

### Type Detection

#### `getNumberType(number)`
Returns the type of phone number.

```javascript
phoneUtils.getNumberType('0772123456'); // 'mobile'
phoneUtils.getNumberType('0242123456'); // 'landline'
phoneUtils.getNumberType('invalid');    // 'invalid'
```

#### `isMobile(number)`
Checks if a number is a mobile number.

```javascript
phoneUtils.isMobile('0772123456'); // true
phoneUtils.isMobile('0242123456'); // false
```

#### `isLandline(number)`
Checks if a number is a landline number.

```javascript
phoneUtils.isLandline('0242123456'); // true
phoneUtils.isLandline('0772123456'); // false
```

### Comprehensive Information

#### `getPhoneInfo(number)`
Returns comprehensive information about a phone number.

```javascript
const info = phoneUtils.getPhoneInfo('0772123456');
// {
//   isValid: true,
//   type: 'mobile',
//   local: '0772123456',
//   international: '+263772123456',
//   carrier: 'Econet',
//   area: null
// }

const landlineInfo = phoneUtils.getPhoneInfo('0242123456');
// {
//   isValid: true,
//   type: 'landline',
//   local: '0242123456',
//   international: '+263242123456',
//   carrier: null,
//   area: 'Harare'
// }
```

### Utility Functions

#### `getCarrierPrefixes()`
Returns all supported mobile carrier prefixes.

```javascript
const prefixes = phoneUtils.getCarrierPrefixes();
// {
//   econet: ['077', '078'],
//   netone: ['071'],
//   telecel: ['073']
// }
```

#### `getAreaCodes()`
Returns all supported landline area codes.

```javascript
const areaCodes = phoneUtils.getAreaCodes();
// {
//   harare: '024',
//   bulawayo: '029',
//   gweru: '054',
//   mutare: '020',
//   masvingo: '039',
//   kwekwe: '055',
//   chinhoyi: '067',
//   marondera: '065',
//   bindura: '066'
// }
```

## Usage Examples

### Form Validation

```javascript
const phoneUtils = require('zim-phone-utils');

function validatePhoneForm(phoneNumber) {
  if (!phoneUtils.isValid(phoneNumber)) {
    return { valid: false, error: 'Invalid phone number' };
  }
  
  const info = phoneUtils.getPhoneInfo(phoneNumber);
  
  return {
    valid: true,
    formatted: info.local,
    type: info.type,
    carrier: info.carrier,
    area: info.area
  };
}

// Usage
const result = validatePhoneForm('077 212 3456');
console.log(result);
// {
//   valid: true,
//   formatted: '0772123456',
//   type: 'mobile',
//   carrier: 'Econet',
//   area: null
// }
```

### Database Normalization

```javascript
const phoneUtils = require('zim-phone-utils');

function normalizePhoneForDatabase(phoneNumber) {
  if (!phoneUtils.isValid(phoneNumber)) {
    throw new Error('Invalid phone number');
  }
  
  return {
    local: phoneUtils.formatLocal(phoneNumber),
    international: phoneUtils.formatInternational(phoneNumber),
    carrier: phoneUtils.detectCarrier(phoneNumber),
    area: phoneUtils.detectArea(phoneNumber),
    type: phoneUtils.getNumberType(phoneNumber)
  };
}
```

### Contact List Processing

```javascript
const phoneUtils = require('zim-phone-utils');

function processContactList(contacts) {
  return contacts.map(contact => {
    const phoneInfo = phoneUtils.getPhoneInfo(contact.phone);
    
    return {
      ...contact,
      phone: phoneInfo.local,
      phoneInternational: phoneInfo.international,
      carrier: phoneInfo.carrier,
      area: phoneInfo.area,
      isValid: phoneInfo.isValid
    };
  }).filter(contact => contact.isValid);
}
```

## Supported Formats

### Mobile Numbers
- **Local**: `0772123456`, `0782123456`, `0712123456`, `0732123456`
- **International with +**: `+263772123456`, `+263782123456`, `+263712123456`, `+263732123456`
- **International without +**: `263772123456`, `263782123456`, `263712123456`, `263732123456`

### Landline Numbers
- **Local**: `0242123456`, `0292123456`, `0542123456`, etc.
- **International with +**: `+263242123456`, `+263292123456`, `+263542123456`, etc.
- **International without +**: `263242123456`, `263292123456`, `263542123456`, etc.

### Input Sanitization
The library automatically handles:
- Spaces: `077 212 3456`
- Dashes: `077-212-3456`
- Parentheses: `(077) 212-3456`
- Dots: `077.212.3456`

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

## Architecture

This library follows the MVC (Model-View-Controller) pattern:

- **Model** (`src/models/phoneModel.js`): Contains all business logic for phone number validation, formatting, and carrier detection
- **Controller** (`src/controllers/phoneController.js`): Handles input sanitization and provides clean public methods
- **View**: Not applicable in this context, but logging and result formatting are separated

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ for Zimbabwe @kudahndhlovu** 