/**
 * Phone Controller - Handles input sanitization and routing to model functions
 */

const PhoneModel = require('../models/phoneModel');

class PhoneController {
  constructor() {
    this.model = new PhoneModel();
  }

  /**
   * Validate if a phone number is a valid Zimbabwean number
   * @param {string} number - The phone number to validate
   * @returns {boolean} - True if valid
   */
  isValid(number) {
    try {
      if (!number || typeof number !== 'string') {
        return false;
      }
      
      return this.model.validateNumber(number);
    } catch (error) {
      return false;
    }
  }

  /**
   * Format a phone number to local Zimbabwean format
   * @param {string} number - The phone number to format
   * @returns {string} - Formatted local number
   * @throws {Error} - If number is invalid
   */
  formatLocal(number) {
    if (!this.isValid(number)) {
      throw new Error('Invalid phone number provided');
    }
    
    return this.model.formatToLocal(number);
  }

  /**
   * Format a phone number to international format
   * @param {string} number - The phone number to format
   * @returns {string} - Formatted international number
   * @throws {Error} - If number is invalid
   */
  formatInternational(number) {
    if (!this.isValid(number)) {
      throw new Error('Invalid phone number provided');
    }
    
    return this.model.formatToInternational(number);
  }

  /**
   * Detect the mobile carrier for a phone number
   * @param {string} number - The phone number
   * @returns {string|null} - Carrier name (Econet, NetOne, Telecel) or null
   */
  detectCarrier(number) {
    if (!this.isValid(number)) {
      return null;
    }
    
    return this.model.detectMobileCarrier(number);
  }

  /**
   * Detect the city/area for a landline number
   * @param {string} number - The phone number
   * @returns {string|null} - City name or null if not a landline
   */
  detectArea(number) {
    if (!this.isValid(number)) {
      return null;
    }
    
    return this.model.detectLandlineArea(number);
  }

  /**
   * Get the type of phone number (mobile or landline)
   * @param {string} number - The phone number
   * @returns {string} - 'mobile', 'landline', or 'invalid'
   */
  getNumberType(number) {
    return this.model.getNumberType(number);
  }

  /**
   * Get comprehensive information about a phone number
   * @param {string} number - The phone number
   * @returns {object} - Complete phone information
   */
  getPhoneInfo(number) {
    return this.model.getPhoneInfo(number);
  }

  /**
   * Get all supported mobile carrier prefixes
   * @returns {object} - Object with carrier prefixes
   */
  getCarrierPrefixes() {
    return {
      econet: this.model.mobileCarriers.econet,
      netone: this.model.mobileCarriers.netone,
      telecel: this.model.mobileCarriers.telecel
    };
  }

  /**
   * Get all supported landline area codes
   * @returns {object} - Object with area codes
   */
  getAreaCodes() {
    return this.model.landlineAreaCodes;
  }

  /**
   * Validate and format a phone number to both local and international formats
   * @param {string} number - The phone number
   * @returns {object} - Object with local and international formats
   * @throws {Error} - If number is invalid
   */
  formatBoth(number) {
    if (!this.isValid(number)) {
      throw new Error('Invalid phone number provided');
    }
    
    return {
      local: this.formatLocal(number),
      international: this.formatInternational(number)
    };
  }

  /**
   * Check if a number is a mobile number
   * @param {string} number - The phone number
   * @returns {boolean} - True if mobile number
   */
  isMobile(number) {
    return this.getNumberType(number) === 'mobile';
  }

  /**
   * Check if a number is a landline number
   * @param {string} number - The phone number
   * @returns {boolean} - True if landline number
   */
  isLandline(number) {
    return this.getNumberType(number) === 'landline';
  }
}

module.exports = PhoneController; 