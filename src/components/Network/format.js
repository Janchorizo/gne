export default function address2class(prefix, address) {
  return prefix + '-' + address.replace(/[\.\:]/g, '-')
}