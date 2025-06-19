/**
 * Phone Model - Delegates to utility modules for Zimbabwean phone numbers
 */

const { sanitizeNumber, extractCore } = require('./utils/sanitize');
const { isValidMobileNumber, isValidLandlineNumber, validateNumber } = require('./utils/validation');
const { formatToLocal, formatToInternational } = require('./utils/format');
const { detectMobileCarrier, mobileCarriers } = require('./utils/carrier');
const { detectLandlineArea, landlineAreaCodes } = require('./utils/area');
const { getNumberType, getPhoneInfo } = require('./utils/info');
const { countryCode } = require('./utils/data');

class PhoneModel {
  constructor() {
    this.mobileCarriers = mobileCarriers;
    this.landlineAreaCodes = landlineAreaCodes;
    this.countryCode = countryCode;
  }

  sanitizeNumber(number) {
    return sanitizeNumber(number);
  }

  extractCore(number) {
    return extractCore(number);
  }

  isValidMobileNumber(number) {
    return isValidMobileNumber(number);
  }

  isValidLandlineNumber(number) {
    return isValidLandlineNumber(number);
  }

  validateNumber(number) {
    return validateNumber(number);
  }

  formatToLocal(number) {
    return formatToLocal(number);
  }

  formatToInternational(number) {
    return formatToInternational(number);
  }

  detectMobileCarrier(number) {
    return detectMobileCarrier(number);
  }

  detectLandlineArea(number) {
    return detectLandlineArea(number);
  }

  getNumberType(number) {
    return getNumberType(number);
  }

  getPhoneInfo(number) {
    return getPhoneInfo(number);
  }
}

module.exports = PhoneModel; 