import * as IP from './ip.js';

export default function (json) {
    window.IP_ = IP
    const nodes = json.nodes.map(node => {
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
        }
    })
    const processed = {nodes, links: json.links};
    return Promise.resolve(processed);
}