import style from './style.module.css';

export const genericNode = style.node;
export const genericLink = style.link;

/**
 * Create a HTML selector-safe from joining a prefix and address.
 * @param   {string} prefix Prefix to add.
 * @param   {string} address Address to join.
 * @return {string} The resulting indentifier.
 */
function joinPrefixWithAddress(prefix, address) {
  return prefix + '-' + address.replace(/[\.\:]/g, '-');
}

/**
 * Create a network node indentifier for a specific address.
 * @param   {string} address The IP address.
 * @return {string} The resulting indentifier.
 */
export function nodeIdentifier(address) {
  return joinPrefixWithAddress('netNode', address);
}

/**
 * Create a CSS class selector for a node identifier.
 * @param   {string} address The IP address.
 * @return {string} The resulting indentifier.
 */
export function netNodeClassSelector(address) {
  return '.' + nodeIdentifier(address);
}

/**
 * Create a CSS id selector for a node identifier.
 * @param   {string} address The IP address.
 * @return {string} The resulting indentifier.
 */
export function netNodeIdSelector(address) {
  return '#' + nodeIdentifier(address);
}

/**
 * Create a network link indentifier for a specific address.
 * @param   {string} address The IP address.
 * @return {string} The resulting indentifier.
 */
export function linkIdentifier(address) {
  return joinPrefixWithAddress('netlink', address);
}

/**
 * Create a CSS class selector for a link identifier.
 * @param   {string} address The IP address.
 * @return {string} The resulting indentifier.
 */
export function netLinkClassSelector(address) {
  return '.' + linkIdentifier(address);
}

/**
 * Create a CSS id selector for a link identifier.
 * @param   {string} address The IP address.
 * @return {string} The resulting indentifier.
 */
export function netLinkIdSelector(address) {
  return '#' + linkIdentifier(address);
}
