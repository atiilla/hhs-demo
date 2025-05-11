/**
 * Utility functions for input validation
 */

/**
 * Validates an IPv4 address
 * @param {string} ip - The IP address to validate
 * @returns {boolean} - True if valid IPv4 address
 */
export const isValidIPv4 = (ip) => {
  if (!ip) return false;
  
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Regex.test(ip)) return false;

  const octets = ip.split('.');
  return octets.every(octet => {
    const num = parseInt(octet);
    return num >= 0 && num <= 255;
  });
};

/**
 * Validates a port number
 * @param {number|string} port - The port number to validate
 * @returns {boolean} - True if valid port number
 */
export const isValidPort = (port) => {
  const portNum = parseInt(port);
  return !isNaN(portNum) && portNum >= 1 && portNum <= 65535;
};

/**
 * Validates a URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid URL
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates a hostname
 * @param {string} hostname - The hostname to validate
 * @returns {boolean} - True if valid hostname
 */
export const isValidHostname = (hostname) => {
  if (!hostname) return false;
  
  const hostnameRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return hostnameRegex.test(hostname) && hostname.length <= 255;
};

/**
 * Validates a MAC address
 * @param {string} mac - The MAC address to validate
 * @returns {boolean} - True if valid MAC address
 */
export const isValidMAC = (mac) => {
  if (!mac) return false;
  
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(mac);
};

/**
 * Validates a port range
 * @param {number|string} startPort - Starting port number
 * @param {number|string} endPort - Ending port number
 * @returns {boolean} - True if valid port range
 */
export const isValidPortRange = (startPort, endPort) => {
  const start = parseInt(startPort);
  const end = parseInt(endPort);
  
  return (
    isValidPort(start) &&
    isValidPort(end) &&
    start <= end
  );
};

/**
 * Sanitizes user input by removing potentially dangerous characters
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>'"&]/g, '');
};
