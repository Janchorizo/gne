import * as IP from './ip.js';

/**
 * Creates a JS object with the node address, type, and ports.
 * @param   {object} node Object containing the node description.
 * @return  {object} The processed node
 */
function getNodeWithType(node) {
  let type = 'Null';
  if (IP.isIPv4(node.address)) {
    const ipclass = IP.getIPv4Class(node.address);
    const scope = IP.getIPv4Scope(node.address);
    type = `IPv4:${ipclass}:${scope}`;
  } else if (IP.isIPv6(node.address)) {
    const expanded = IP.expandedIPv6Address(node.address);
    const [isSpecial, specialType] = IP.isIPv6Special(expanded);
    if (isSpecial === true) {
      type = type = `IPv6:${specialType}`;
    } else {
      type = type = `IPv6:${IP.getIPv6Type(expanded)}`;
    }
  }
  const ports = Object.fromEntries(
      node.ports.map((d) => [d, {in: [], out: []}]),
  );
  return {
    type,
    ports,
    address: node.address,
    in: [],
    out: [],
  };
}

/**
 * Creates a JS object with the link source and dest address and ports.
 * @param   {object} link Object containing the link description.
 * @return  {object} The processed link
 */
function getLinkWithPorts(link) {
  let isIPv4 = IP.isIPv4(link.source);
  const sourceAddress = isIPv4 === true ?
    IP.getIPv4Address(link.source) :
    link.source;
  const sourcePort = isIPv4 === true ?
    IP.getIPv4Port(link.source) :
    '';

  isIPv4 = IP.isIPv4(link.dest);
  const destAddress = isIPv4 === true ?
    IP.getIPv4Address(link.dest) :
    link.dest;
  const destPort = isIPv4 === true ?
    IP.getIPv4Port(link.dest) :
    '';

  return {
    sourceAddress,
    sourcePort,
    destAddress,
    destPort,
  };
}

/**
 * Creates a curated version of the network with address types set,
 * and links associated with address and ports.
 * @param   {object} json Retrieved data from the API.
 * @return  {object} The processed network data
 */
export default function(json) {
  const nodes = Object.fromEntries(
      json.nodes.map((node) => [node.address, getNodeWithType(node)]));

  const links = json.links.map((link, i) => {
    const withPorts = {id: i, ...getLinkWithPorts(link)};

    // update port connections in node entry
    if (nodes?.[withPorts.sourceAddress] !== undefined) {
      const source = nodes[withPorts.sourceAddress];
      if (withPorts.sourcePort === '') {
        source.out.push(i);
      } else if (source?.[withPorts.sourcePort] !== undefined) {
        source.ports[withPorts.sourcePort].out.push(i);
      } else {
        source.out.push(i);
      }
    }

    if (nodes?.[withPorts.destAddress] !== undefined) {
      const dest = nodes[withPorts.destAddress];
      if (withPorts.destPort === '') {
        dest.in.push(i);
      } else if (dest?.[withPorts.destPort] !== undefined) {
        dest.ports[withPorts.destPort].in.push(i);
      } else {
        dest.in.push(i);
      }
    }

    return withPorts;
  });
  const processed = {nodes: Object.values(nodes), links};
  return Promise.resolve(processed);
}
