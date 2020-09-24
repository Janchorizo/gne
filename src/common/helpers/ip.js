// single precompilation to avoid excesive load
const ipv4Format = /([0-9]+\.){3}[0-9]+(:[0-9]+)?/;
const ipv4AddressFormat = /((?:[0-9]+\.){3}[0-9]+)(?::[0-9]+)?/;
const ipv4PortFormat = /(?:[0-9]+\.){3}[0-9]+:([0-9]+)/;
const ipv6Format = /:{2,8}/;

export function isIPv4 (address) {
  return ipv4Format.test(address);
}
export function getIPv4Address (address) {
  return ipv4AddressFormat.exec(address)[1];
}
export function getIPv4Port (address) {
  const matched = ipv4PortFormat.exec(address);
  return matched !== null ? matched[1] : '';
}
export function getIPv4Class (address){
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
export function getIPv4Scope (address, ipClass) {
  const firstOctect = +address.split('.')[0];
  switch (ipClass) {
    case 'A':
      if (firstOctect === 10) { return 'Private'; }
      break;
    case 'B':
      if (firstOctect === 172) { return 'Private'; }
      break;
    case 'C':
      if (firstOctect === 192) { return 'Private'; }
      break;
  }
  return 'Public'
}
export function isIPv6 (address) {
  return ipv6Format.test(address);
}
export function expandedIPv6Address(address) {
  const markCollapsedBlock = d => d.replace(/::/, ':@:');
  const uncollapsedBlocks = 
    address.split(':').filter(b => b.length > 0).length;

  function formatBlock(d) {
    if (d === '@') {
      return 'x'.repeat(8 - uncollapsedBlocks)
                .split('')
                .map(d => '0000')
                .join(':');
    }
    if (d.length < 4) {
      return '0'.repeat(4 - d.length) + d;
    }
    return d;
  }

  return markCollapsedBlock(address)
    .split(':')
    .filter(b => b.length > 0)
    .map(formatBlock)
    .join(':');
}
export function isIPv6Special (expandedAddress) {
  const blocks = expandedAddress.split(':');
  if (expandedAddress.length !== 8) {return [false, null]}
  switch (expandedAddress) {
    case '0000:0000:0000:0000:0000:0000:0000:0000':
      return [true, 'Default'];
    case '0000:0000:0000:0000:0000:0000:0000:0001':
      return [true, 'Loopback'];
    default:
      if (blocks[0].startsWith('ff')) {
        return [true, 'Multicast'];
      }
      if (blocks[0] === '2002') {
        return [true, 'Compatibility 6to4'];
      }
      if (blocks[4] === '5efe' && blocks[6] === '0000') {
        return [true, 'Compatibility Isatap'];
      }
      if (blocks[0] === '2001' && blocks[1] === '0000') {
        return [true, 'Compatibility Teredo'];
      }
  }
  return[false, null]
}
export function getIPv6Type (address) {
  if (address.startsWith('2') || address.startsWith('3')) {
    return 'Gloabl unicast';
  }
  if (address.startsWith('fd')) {
    return 'Unique local';
  }
  if (address.startsWith('fe80')) {
    return 'Link-local';
  }
}