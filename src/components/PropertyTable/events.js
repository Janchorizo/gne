/**
 * Event handler for adding propreties.
 * @param   {object} onChange Callback for setting the new property list.
 * @param   {object} clearFields Callback for clearing input cells.
 * @param   {object} properties A list of the current properties.
 * @param   {object} property Object holding the name, xpath and regex.
 */
export function onPropertyAdd(onChange, clearFields, properties, property) {
  if (property.name.length === 0 || property.xpath.length === 0) {
    return;
  }
  const isPresent = properties
      .map((p) => p.name === property.name)
      .reduce((ac, dc) => ac || dc, false);
  if (isPresent === true) {
    return;
  }
  onChange([...properties, property]);
  clearFields();
}

/**
 * Event handler for removing a proprety.
 * @param   {object} onChange Callback for setting the new property list.
 * @param   {object} properties A list of the current properties.
 * @param   {object} property Object holding the name, xpath and regex.
 */
export function onPropertyDelete(onChange, properties, property) {
  const idx = properties.map((p) => p.name).indexOf(property.name);
  const newProperties = [...properties];
  newProperties.splice(idx, 1);
  onChange(newProperties);
}
