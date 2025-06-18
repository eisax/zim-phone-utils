/**
 * Utility functions for validating Zimbabwean phone numbers
 */

const { extractCore } = require('./sanitize');
const { mobileCarriers, landlineAreaCodes } = require('./data');

function isValidMobileNumber(number) {
  const core = extractCore(number);
  if (core.length !== 9 || !core.startsWith('7')) return false;
  const prefix = '0' + core.substring(0, 2);
  const allPrefixes = [
    ...mobileCarriers.econet,
    ...mobileCarriers.netone,
    ...mobileCarriers.telecel
  ];
  return allPrefixes.includes(prefix);
}

function isValidLandlineNumber(number) {
  const core = extractCore(number);
  if (core.length !== 9) return false;
  const areaCode = '0' + core.substring(0, 2);
  const allAreaCodes = Object.values(landlineAreaCodes);
  return allAreaCodes.includes(areaCode);
}

function validateNumber(number) {
  if (!number || typeof number !== 'string') {
    return false;
  }
  return isValidMobileNumber(number) || isValidLandlineNumber(number);
}

module.exports = { isValidMobileNumber, isValidLandlineNumber, validateNumber }; 