/**
 * Phone Model - Contains all business logic for Zimbabwean phone numbers
 */

class PhoneModel {
  constructor() {
    // Mobile carrier prefixes
    this.mobileCarriers = {
      econet: ['077', '078'],
      netone: ['071'],
      telecel: ['073']
    };

    // Landline area codes for major cities
    this.landlineAreaCodes = {
      harare: '024',
      bulawayo: '029',
      gweru: '054',
      mutare: '020',
      masvingo: '039',
      kwekwe: '055',
      chinhoyi: '067',
      marondera: '065',
      bindura: '066'
    };

    // Country code for Zimbabwe
    this.countryCode = '263';
  }

  /**
   * Sanitize phone number by removing spaces, dashes, and other non-digit characters
   * @param {string} number - The phone number to sanitize
   * @returns {string} - Sanitized phone number
   */
  sanitizeNumber(number) {
    if (!number || typeof number !== 'string') {
      return '';
    }
    return number.replace(/[\s\-\(\)\.]/g, '');
  }

  /**
   * Remove country code or leading zero, return the rest
   */
  extractCore(number) {
    const sanitized = this.sanitizeNumber(number);
    if (sanitized.startsWith('+263')) return sanitized.substring(4);
    if (sanitized.startsWith('263')) return sanitized.substring(3);
    if (sanitized.startsWith('0')) return sanitized.substring(1);
    return sanitized;
  }

  /**
   * Check if the number is a valid mobile number
   */
  isValidMobileNumber(number) {
    const core = this.extractCore(number);
    if (core.length !== 9 || !core.startsWith('7')) return false;
    const prefix = '0' + core.substring(0, 2);
    const allPrefixes = [
      ...this.mobileCarriers.econet,
      ...this.mobileCarriers.netone,
      ...this.mobileCarriers.telecel
    ];
    return allPrefixes.includes(prefix);
  }

  /**
   * Check if the number is a valid landline number
   */
  isValidLandlineNumber(number) {
    const core = this.extractCore(number);
    if (core.length !== 9) return false;
    const areaCode = '0' + core.substring(0, 3);
    const allAreaCodes = Object.values(this.landlineAreaCodes);
    return allAreaCodes.includes(areaCode);
  }

  /**
   * Validate if the number is a valid Zimbabwean phone number (mobile or landline)
   * @param {string} number - The phone number to validate
   * @returns {boolean} - True if valid
   */
  validateNumber(number) {
    if (!number || typeof number !== 'string') {
      return false;
    }
    
    return this.isValidMobileNumber(number) || this.isValidLandlineNumber(number);
  }

  /**
   * Format number to local format
   */
  formatToLocal(number) {
    if (!this.validateNumber(number)) throw new Error('Invalid phone number');
    return '0' + this.extractCore(number);
  }

  /**
   * Format number to international format
   */
  formatToInternational(number) {
    if (!this.validateNumber(number)) throw new Error('Invalid phone number');
    return `+${this.countryCode}${this.extractCore(number)}`;
  }

  /**
   * Detect mobile carrier for mobile numbers
   */
  detectMobileCarrier(number) {
    if (!this.isValidMobileNumber(number)) return null;
    const core = this.extractCore(number);
    const prefix = '0' + core.substring(0, 3);
    if (this.mobileCarriers.econet.includes(prefix)) return 'Econet';
    if (this.mobileCarriers.netone.includes(prefix)) return 'NetOne';
    if (this.mobileCarriers.telecel.includes(prefix)) return 'Telecel';
    return null;
  }

  /**
   * Detect city/area for landline numbers
   */
  detectLandlineArea(number) {
    if (!this.isValidLandlineNumber(number)) return null;
    const core = this.extractCore(number);
    const areaCode = '0' + core.substring(0, 3);
    for (const [city, code] of Object.entries(this.landlineAreaCodes)) {
      if (code === areaCode) return city.charAt(0).toUpperCase() + city.slice(1);
    }
    return null;
  }

  /**
   * Get phone number type (mobile or landline)
   * @param {string} number - The phone number
   * @returns {string} - 'mobile' or 'landline'
   */
  getNumberType(number) {
    if (this.isValidMobileNumber(number)) {
      return 'mobile';
    } else if (this.isValidLandlineNumber(number)) {
      return 'landline';
    }
    return 'invalid';
  }

  /**
   * Get detailed information about a phone number
   * @param {string} number - The phone number
   * @returns {object} - Detailed phone information
   */
  getPhoneInfo(number) {
    const isValid = this.validateNumber(number);
    const type = this.getNumberType(number);
    
    const info = {
      isValid,
      type,
      local: null,
      international: null,
      carrier: null,
      area: null
    };
    
    if (isValid) {
      info.local = this.formatToLocal(number);
      info.international = this.formatToInternational(number);
      
      if (type === 'mobile') {
        info.carrier = this.detectMobileCarrier(number);
      } else if (type === 'landline') {
        info.area = this.detectLandlineArea(number);
      }
    }
    
    return info;
  }
}

module.exports = PhoneModel; 