/**
 * Utility functions for getting phone number type and info
 */

const { isValidMobileNumber, isValidLandlineNumber, validateNumber } = require('./validation');
const { formatToLocal, formatToInternational } = require('./format');
const { detectMobileCarrier } = require('./carrier');
const { detectLandlineArea } = require('./area');

function getNumberType(number) {
  if (isValidMobileNumber(number)) {
    return 'mobile';
  } else if (isValidLandlineNumber(number)) {
    return 'landline';
  }
  return 'invalid';
}

function getPhoneInfo(number) {
  const isValid = validateNumber(number);
  const type = getNumberType(number);

  const info = {
    isValid,
    type,
    local: null,
    international: null,
    carrier: null,
    area: null
  };

  if (isValid) {
    info.local = formatToLocal(number);
    info.international = formatToInternational(number);

    if (type === 'mobile') {
      info.carrier = detectMobileCarrier(number);
    } else if (type === 'landline') {
      info.area = detectLandlineArea(number);
    }
  }

  return info;
}

module.exports = { getNumberType, getPhoneInfo }; 