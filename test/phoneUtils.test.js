/**
 * Unit tests for zim-phone-utils
 */

const phoneUtils = require('../src/index');

describe('zim-phone-utils', () => {
  describe('Mobile Number Validation', () => {
    test('should validate Econet mobile numbers', () => {
      expect(phoneUtils.isValid('0772123456')).toBe(true);
      expect(phoneUtils.isValid('0782123456')).toBe(true);
      expect(phoneUtils.isValid('+263772123456')).toBe(true);
      expect(phoneUtils.isValid('263772123456')).toBe(true);
    });

    test('should validate NetOne mobile numbers', () => {
      expect(phoneUtils.isValid('0712123456')).toBe(true);
      expect(phoneUtils.isValid('+263712123456')).toBe(true);
      expect(phoneUtils.isValid('263712123456')).toBe(true);
    });

    test('should validate Telecel mobile numbers', () => {
      expect(phoneUtils.isValid('0732123456')).toBe(true);
      expect(phoneUtils.isValid('+263732123456')).toBe(true);
      expect(phoneUtils.isValid('263732123456')).toBe(true);
    });

    test('should reject invalid mobile numbers', () => {
      expect(phoneUtils.isValid('0792123456')).toBe(false); // Invalid prefix
      expect(phoneUtils.isValid('077212345')).toBe(false);  // Too short
      expect(phoneUtils.isValid('07721234567')).toBe(false); // Too long
      expect(phoneUtils.isValid('0372188888')).toBe(false);  // Wrong prefix
    });
  });

  describe('Landline Number Validation', () => {
    test('should validate Harare landline numbers', () => {
      expect(phoneUtils.isValid('0242123456')).toBe(true);
      expect(phoneUtils.isValid('+263242123456')).toBe(true);
      expect(phoneUtils.isValid('263242123456')).toBe(true);
    });

    test('should validate Bulawayo landline numbers', () => {
      expect(phoneUtils.isValid('0292123456')).toBe(true);
      expect(phoneUtils.isValid('+263292123456')).toBe(true);
      expect(phoneUtils.isValid('263292123456')).toBe(true);
    });

    test('should validate other city landline numbers', () => {
      expect(phoneUtils.isValid('0542123456')).toBe(true); // Gweru
      expect(phoneUtils.isValid('0202123456')).toBe(true); // Mutare
      expect(phoneUtils.isValid('0392123456')).toBe(true); // Masvingo
      expect(phoneUtils.isValid('0552123456')).toBe(true); // Kwekwe
      expect(phoneUtils.isValid('0672123456')).toBe(true); // Chinhoyi
      expect(phoneUtils.isValid('0652123456')).toBe(true); // Marondera
      expect(phoneUtils.isValid('0662123456')).toBe(true); // Bindura
    });

    test('should reject invalid landline numbers', () => {
      expect(phoneUtils.isValid('0252123456')).toBe(false); // Invalid area code
      expect(phoneUtils.isValid('024212345')).toBe(false);  // Too short
      expect(phoneUtils.isValid('02421234567')).toBe(false); // Too long
    });
  });

  describe('Number Formatting', () => {
    test('should format mobile numbers to local format', () => {
      expect(phoneUtils.formatLocal('0772123456')).toBe('0772123456');
      expect(phoneUtils.formatLocal('+263772123456')).toBe('0772123456');
      expect(phoneUtils.formatLocal('263772123456')).toBe('0772123456');
    });

    test('should format landline numbers to local format', () => {
      expect(phoneUtils.formatLocal('0242123456')).toBe('0242123456');
      expect(phoneUtils.formatLocal('+263242123456')).toBe('0242123456');
      expect(phoneUtils.formatLocal('263242123456')).toBe('0242123456');
    });

    test('should format mobile numbers to international format', () => {
      expect(phoneUtils.formatInternational('0772123456')).toBe('+263772123456');
      expect(phoneUtils.formatInternational('+263772123456')).toBe('+263772123456');
      expect(phoneUtils.formatInternational('263772123456')).toBe('+263772123456');
    });

    test('should format landline numbers to international format', () => {
      expect(phoneUtils.formatInternational('0242123456')).toBe('+263242123456');
      expect(phoneUtils.formatInternational('+263242123456')).toBe('+263242123456');
      expect(phoneUtils.formatInternational('263242123456')).toBe('+263242123456');
    });

    test('should format to both formats', () => {
      const result = phoneUtils.formatBoth('0772123456');
      expect(result.local).toBe('0772123456');
      expect(result.international).toBe('+263772123456');
    });

    test('should throw error for invalid numbers during formatting', () => {
      expect(() => phoneUtils.formatLocal('invalid')).toThrow('Invalid phone number provided');
      expect(() => phoneUtils.formatInternational('invalid')).toThrow('Invalid phone number provided');
      expect(() => phoneUtils.formatBoth('invalid')).toThrow('Invalid phone number provided');
    });
  });

  describe('Carrier Detection', () => {
    test('should detect Econet carrier', () => {
      expect(phoneUtils.detectCarrier('0772123456')).toBe('Econet');
      expect(phoneUtils.detectCarrier('0782123456')).toBe('Econet');
      expect(phoneUtils.detectCarrier('+263772123456')).toBe('Econet');
    });

    test('should detect NetOne carrier', () => {
      expect(phoneUtils.detectCarrier('0712123456')).toBe('NetOne');
      expect(phoneUtils.detectCarrier('+263712123456')).toBe('NetOne');
    });

    test('should detect Telecel carrier', () => {
      expect(phoneUtils.detectCarrier('0732123456')).toBe('Telecel');
      expect(phoneUtils.detectCarrier('+263732123456')).toBe('Telecel');
    });

    test('should return null for landline numbers', () => {
      expect(phoneUtils.detectCarrier('0242123456')).toBe(null);
      expect(phoneUtils.detectCarrier('+263242123456')).toBe(null);
    });

    test('should return null for invalid numbers', () => {
      expect(phoneUtils.detectCarrier('invalid')).toBe(null);
    });
  });

  describe('Area Detection', () => {
    test('should detect Harare area', () => {
      expect(phoneUtils.detectArea('0242123456')).toBe('Harare');
      expect(phoneUtils.detectArea('+263242123456')).toBe('Harare');
    });

    test('should detect Bulawayo area', () => {
      expect(phoneUtils.detectArea('0292123456')).toBe('Bulawayo');
      expect(phoneUtils.detectArea('+263292123456')).toBe('Bulawayo');
    });

    test('should detect other areas', () => {
      expect(phoneUtils.detectArea('0542123456')).toBe('Gweru');
      expect(phoneUtils.detectArea('0202123456')).toBe('Mutare');
      expect(phoneUtils.detectArea('0392123456')).toBe('Masvingo');
      expect(phoneUtils.detectArea('0552123456')).toBe('Kwekwe');
      expect(phoneUtils.detectArea('0672123456')).toBe('Chinhoyi');
      expect(phoneUtils.detectArea('0652123456')).toBe('Marondera');
      expect(phoneUtils.detectArea('0662123456')).toBe('Bindura');
    });

    test('should return null for mobile numbers', () => {
      expect(phoneUtils.detectArea('0772123456')).toBe(null);
      expect(phoneUtils.detectArea('+263772123456')).toBe(null);
    });

    test('should return null for invalid numbers', () => {
      expect(phoneUtils.detectArea('invalid')).toBe(null);
    });
  });

  describe('Number Type Detection', () => {
    test('should detect mobile numbers', () => {
      expect(phoneUtils.getNumberType('0772123456')).toBe('mobile');
      expect(phoneUtils.getNumberType('0712123456')).toBe('mobile');
      expect(phoneUtils.getNumberType('0732123456')).toBe('mobile');
    });

    test('should detect landline numbers', () => {
      expect(phoneUtils.getNumberType('0242123456')).toBe('landline');
      expect(phoneUtils.getNumberType('0292123456')).toBe('landline');
    });

    test('should detect invalid numbers', () => {
      expect(phoneUtils.getNumberType('invalid')).toBe('invalid');
      expect(phoneUtils.getNumberType('0792123456')).toBe('invalid');
    });

    test('should use convenience methods', () => {
      expect(phoneUtils.isMobile('0772123456')).toBe(true);
      expect(phoneUtils.isMobile('0242123456')).toBe(false);
      expect(phoneUtils.isLandline('0242123456')).toBe(true);
      expect(phoneUtils.isLandline('0772123456')).toBe(false);
    });
  });

  describe('Comprehensive Phone Info', () => {
    test('should provide complete mobile number info', () => {
      const info = phoneUtils.getPhoneInfo('0772123456');
      expect(info.isValid).toBe(true);
      expect(info.type).toBe('mobile');
      expect(info.local).toBe('0772123456');
      expect(info.international).toBe('+263772123456');
      expect(info.carrier).toBe('Econet');
      expect(info.area).toBe(null);
    });

    test('should provide complete landline number info', () => {
      const info = phoneUtils.getPhoneInfo('0242123456');
      expect(info.isValid).toBe(true);
      expect(info.type).toBe('landline');
      expect(info.local).toBe('0242123456');
      expect(info.international).toBe('+263242123456');
      expect(info.carrier).toBe(null);
      expect(info.area).toBe('Harare');
    });

    test('should handle invalid numbers', () => {
      const info = phoneUtils.getPhoneInfo('invalid');
      expect(info.isValid).toBe(false);
      expect(info.type).toBe('invalid');
      expect(info.local).toBe(null);
      expect(info.international).toBe(null);
      expect(info.carrier).toBe(null);
      expect(info.area).toBe(null);
    });
  });

  describe('Utility Functions', () => {
    test('should return carrier prefixes', () => {
      const prefixes = phoneUtils.getCarrierPrefixes();
      expect(prefixes.econet).toEqual(['077', '078']);
      expect(prefixes.netone).toEqual(['071']);
      expect(prefixes.telecel).toEqual(['073']);
    });

    test('should return area codes', () => {
      const areaCodes = phoneUtils.getAreaCodes();
      expect(areaCodes.harare).toBe('024');
      expect(areaCodes.bulawayo).toBe('029');
      expect(areaCodes.gweru).toBe('054');
      expect(areaCodes.mutare).toBe('020');
      expect(areaCodes.masvingo).toBe('039');
      expect(areaCodes.kwekwe).toBe('055');
      expect(areaCodes.chinhoyi).toBe('067');
      expect(areaCodes.marondera).toBe('065');
      expect(areaCodes.bindura).toBe('066');
    });
  });

  describe('Input Sanitization', () => {
    test('should handle numbers with spaces and dashes', () => {
      expect(phoneUtils.isValid('077 212 3456')).toBe(true);
      expect(phoneUtils.isValid('077-212-3456')).toBe(true);
      expect(phoneUtils.isValid('(077) 212-3456')).toBe(true);
      expect(phoneUtils.formatLocal('077 212 3456')).toBe('0772123456');
    });

    test('should handle null and undefined inputs', () => {
      expect(phoneUtils.isValid(null)).toBe(false);
      expect(phoneUtils.isValid(undefined)).toBe(false);
      expect(phoneUtils.isValid('')).toBe(false);
    });

    test('should handle non-string inputs', () => {
      expect(phoneUtils.isValid(123456789)).toBe(false);
      expect(phoneUtils.isValid({})).toBe(false);
      expect(phoneUtils.isValid([])).toBe(false);
    });
  });

}); 