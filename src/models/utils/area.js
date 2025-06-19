/**
 * Utility functions for detecting landline area
 */

const { isValidLandlineNumber } = require('./validation');
const { extractCore } = require('./sanitize');
const { landlineAreaCodes } = require('./data');

function detectLandlineArea(number) {
  if (!isValidLandlineNumber(number)) return null;
  const core = extractCore(number);
  const areaCode = '0' + core.substring(0, 2);
  for (const [city, code] of Object.entries(landlineAreaCodes)) {
    if (code === areaCode) return city.charAt(0).toUpperCase() + city.slice(1);
  }
  return null;
}

module.exports = { detectLandlineArea, landlineAreaCodes }; 