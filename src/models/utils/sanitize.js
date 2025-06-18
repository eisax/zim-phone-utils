/**
 * Utility functions for sanitizing and extracting phone numbers
 */

function sanitizeNumber(number) {
  if (!number || typeof number !== 'string') {
    return '';
  }
  return number.replace(/[\s\-\(\)\.]/g, '');
}

function extractCore(number) {
  const sanitized = sanitizeNumber(number);
  if (sanitized.startsWith('+263')) return sanitized.substring(4);
  if (sanitized.startsWith('263')) return sanitized.substring(3);
  if (sanitized.startsWith('0')) return sanitized.substring(1);
  return sanitized;
}

module.exports = { sanitizeNumber, extractCore }; 