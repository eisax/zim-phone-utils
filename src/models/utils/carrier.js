/**
 * Utility functions for detecting mobile carriers
 */

const { isValidMobileNumber } = require('./validation');
const { extractCore } = require('./sanitize');
const { mobileCarriers } = require('./data');

function detectMobileCarrier(number) {
  if (!isValidMobileNumber(number)) return null;
  const core = extractCore(number);
  const prefix = '0' + core.substring(0, 2);
  if (mobileCarriers.econet.includes(prefix)) return 'Econet';
  if (mobileCarriers.netone.includes(prefix)) return 'NetOne';
  if (mobileCarriers.telecel.includes(prefix)) return 'Telecel';
  return null;
}

module.exports = { detectMobileCarrier, mobileCarriers }; 