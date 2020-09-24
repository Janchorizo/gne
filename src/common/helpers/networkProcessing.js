import * as IP from './ip.js';

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
    node.ports.map(d => [d, {in:[], out:[]}])
  )
  return {
    type,
    ports,
    address: node.address,
    in: [],
    out: [],
  };
}

function getLinkWithPorts(link) {
  let isIPv4 = IP.isIPv4(link.source);
  const sourceAddress = isIPv4 === true
    ? IP.getIPv4Address(link.source)
    : link.source;
  const sourcePort = isIPv4 === true
    ? IP.getIPv4Port(link.source)
    : '';

  isIPv4 = IP.isIPv4(link.dest);
  const destAddress = isIPv4 === true
    ? IP.getIPv4Address(link.dest)
    : link.dest;
  const destPort = isIPv4 === true
    ? IP.getIPv4Port(link.dest)
    : '';

  return {
    sourceAddress,
    sourcePort,
    destAddress,
    destPort
  }
}

export default function (json) {
  window.IP_ = IP
  const nodes = Object.fromEntries(
    json.nodes.map(node => [node.address, getNodeWithType(node)]));

  const links = json.links.map((link, i) => {
    const withPorts = {id: i, ...getLinkWithPorts(link)};

    // update port connections in node entry
    if (nodes?.[withPorts.sourceAddress] !== undefined) {
      if (withPorts.sourcePort === '') {
        nodes?.[withPorts.sourceAddress].out.push(i);
      } else if (nodes[withPorts.sourceAddress].ports?.[withPorts.sourcePort] !== undefined) {
        nodes[withPorts.sourceAddress].ports[withPorts.sourcePort].out.push(i);
      } else {
        nodes?.[withPorts.sourceAddress].out.push(i);
      }
    }

    if (nodes?.[withPorts.destAddress] !== undefined) {
      if (withPorts.destPort === '') {
        nodes?.[withPorts.destAddress].in.push(i);
      } else if (nodes[withPorts.destAddress].ports?.[withPorts.destPort] !== undefined) {
        nodes[withPorts.destAddress].ports[withPorts.destPort].in.push(i);
      } else {
        nodes?.[withPorts.destAddress].in.push(i);
      }
    }

    return withPorts;
  });
  const processed = {nodes: Object.values(nodes), links};
  return Promise.resolve(processed);
}