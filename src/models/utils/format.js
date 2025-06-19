/**
 * Utility functions for formatting Zimbabwean phone numbers
 */

const { extractCore } = require('./sanitize');
const { validateNumber } = require('./validation');
const { countryCode } = require('./data');

function formatToLocal(number) {
  if (!validateNumber(number)) throw new Error('Invalid phone number');
  return '0' + extractCore(number);
}

function formatToInternational(number) {
  if (!validateNumber(number)) throw new Error('Invalid phone number');
  return `+${countryCode}${extractCore(number)}`;
}

module.exports = { formatToLocal, formatToInternational }; 