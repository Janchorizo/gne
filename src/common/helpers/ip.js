// single precompilation to avoid excesive load
const ipv4Format = /([0-9]+\.){3}[0-9]+(:[0-9]+)?/;
const ipv4AddressFormat = /((?:[0-9]+\.){3}[0-9]+)(?::[0-9]+)?/;
const ipv4PortFormat = /(?:[0-9]+\.){3}[0-9]+:([0-9]+)/;
const ipv6Format = /:{2,8}/;


/**
 * Checks whether the address is IPv4 compliant.
 * @param   {string} address The IP address.
 * @return  {bool} Whether the address is IPv4 compliant.
 */
export function isIPv4(address) {
  return ipv4Format.test(address);
}

/**
 * Retrieves the IP address from an IPv4 direction.
 * @param   {string} address The IP address.
 * @return  {address} The IP address without the port
 */
export function getIPv4Address(address) {
  return ipv4AddressFormat.exec(address)[1];
}

/**
 * Retrieves the port, is present, of an IPv4 direction.
 * @param   {string} address The IP address.
 * @return  {string} The port if present, else empty string.
 */
export function getIPv4Port(address) {
  const matched = ipv4PortFormat.exec(address);
  return matched !== null ? matched[1] : '';
}

/**
 * Retrieves the address class based on the address range.
 * @param   {string} address The IP address.
 * @return  {string} The IPv4 address class.
 */
export function getIPv4Class(address) {
  const firstOctect = +address.split('.')[0];
  if (firstOctect < 126) {
    return 'A';
  } else if (firstOctect === 127) {
    return 'Loopback';
  } else if (firstOctect < 191) {
    return 'B';
  } else if (firstOctect < 223) {
    return 'C';
  } else if (firstOctect < 239) {
    return 'D-Multicast';
  } else {
    return 'E-Experimental';
  }
}

/**
 * Retrieves the scope of the IPv4 address.
 * @param   {string} address The IP address.
 * @param   {string} ipClass The IPv4 address class.
 * @return  {string} A string representing the scope.
 */
export function getIPv4Scope(address, ipClass) {
  const firstOctect = +address.split('.')[0];
  switch (ipClass) {
    case 'A':
      if (firstOctect === 10) {
        return 'Private';
      }
      break;
    case 'B':
      if (firstOctect === 172) {
        return 'Private';
      }
      break;
    case 'C':
      if (firstOctect === 192) {
        return 'Private';
      }
      break;
  }
  return 'Public';
}

/**
 * Checks whether the address is IPv6 compliant.
 * @param   {string} address The IP address.
 * @return  {bool} Whether the address is IPv6 compliant.
 */
export function isIPv6(address) {
  return ipv6Format.test(address);
}

/**
 * Retrieves an IPv6 with collapsed and ommited 0 expanded.
 * @param   {string} address The IP address.
 * @return  {string} The expanded address
 */
export function expandedIPv6Address(address) {
  const markCollapsedBlock = (d) => d.replace(/::/, ':@:');
  const uncollapsedBlocks =
    address.split(':').filter((b) => b.length > 0).length;

  /**
   * Fills or expands a block.
   * @param   {string} d 16 bit hex block.
   * @return  {string} The formated block
   */
  function formatBlock(d) {
    if (d === '@') {
      return 'x'.repeat(8 - uncollapsedBlocks)
          .split('')
          .map((d) => '0000')
          .join(':');
    }
    if (d.length < 4) {
      return '0'.repeat(4 - d.length) + d;
    }
    return d;
  }

  return markCollapsedBlock(address)
      .split(':')
      .filter((b) => b.length > 0)
      .map(formatBlock)
      .join(':');
}

/**
 * Gets the type for special addresses.
 * @param   {string} expandedAddress A full length IPv6 address.
 * @return  {string} The special type if eligible, else null
 */
export function getIPv6SpecialType(expandedAddress) {
  const blocks = expandedAddress.split(':');
  if (expandedAddress.length !== 8) {
    return null;
  }
  switch (expandedAddress) {
    case '0000:0000:0000:0000:0000:0000:0000:0000':
      return 'Default';
    case '0000:0000:0000:0000:0000:0000:0000:0001':
      return 'Loopback';
    default:
      if (blocks[0].startsWith('ff')) {
        return 'Multicast';
      }
      if (blocks[0] === '2002') {
        return 'Compatibility 6to4';
      }
      if (blocks[4] === '5efe' && blocks[6] === '0000') {
        return 'Compatibility Isatap';
      }
      if (blocks[0] === '2001' && blocks[1] === '0000') {
        return 'Compatibility Teredo';
      }
  }
  return null;
}

/**
 * Gets the address type from the prefix of a non-special IPv6 address.
 * @param   {string} expandedAddress A full length IPv6 address.
 * @return  {string} A string representing the network address type
 */
export function getIPv6Type(expandedAddress) {
  if (expandedAddress.startsWith('2') || expandedAddress.startsWith('3')) {
    return 'Gloabl unicast';
  }
  if (expandedAddress.startsWith('fd')) {
    return 'Unique local';
  }
  if (expandedAddress.startsWith('fe80')) {
    return 'Link-local';
  }
}
