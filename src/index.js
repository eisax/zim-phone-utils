/**
 * zim-phone-utils - Main entry point
 * A JavaScript utility library for Zimbabwean phone numbers
 */

const PhoneController = require('./controllers/phoneController');

// Create a singleton instance
const phoneUtils = new PhoneController();

// Export the main functions
module.exports = {
  // Core validation and formatting
  isValid: (number) => phoneUtils.isValid(number),
  formatLocal: (number) => phoneUtils.formatLocal(number),
  formatInternational: (number) => phoneUtils.formatInternational(number),
  formatBoth: (number) => phoneUtils.formatBoth(number),
  
  // Carrier and area detection
  detectCarrier: (number) => phoneUtils.detectCarrier(number),
  detectArea: (number) => phoneUtils.detectArea(number),
  
  // Number type detection
  getNumberType: (number) => phoneUtils.getNumberType(number),
  isMobile: (number) => phoneUtils.isMobile(number),
  isLandline: (number) => phoneUtils.isLandline(number),
  
  // Comprehensive information
  getPhoneInfo: (number) => phoneUtils.getPhoneInfo(number),
  
  // Utility functions
  getCarrierPrefixes: () => phoneUtils.getCarrierPrefixes(),
  getAreaCodes: () => phoneUtils.getAreaCodes(),
  
  // Export the controller class for advanced usage
  PhoneController
}; 