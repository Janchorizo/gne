import React from 'react';
import PropTypes from 'prop-types';


/**
 * Input component for a property field.
 * @param   {object} onChange Callback for setting the new property list.
 * @param   {object} clearFields Callback for clearing input cells.
 * @param   {object} properties A list of the current properties.
 * @param   {object} property Object holding the name, xpath and regex.
 * @return {React.Component} A react component.
 */
export default function InputCell(
    {name, placeholder, property, properties, onChange}) {
  return <td><input
    value={property[name]}
    type="text"
    placeholder={placeholder}
    onChange={(e) => {
      let idx = properties.map((p) => p.name).indexOf(property.name);
      if (idx === -1) { // a compulsory property not already present
        properties.push({name: property.name, xpath: '', regex: ''});
        idx = properties.length - 1;
      }
      const newProperties = [...properties];
      newProperties[idx] = {...newProperties[idx], [name]: e.target.value};
      onChange(newProperties);
    }}/>
  </td>;
}

InputCell.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  property: PropTypes.shape({
    name: PropTypes.string,
    xpath: PropTypes.string,
    regex: PropTypes.string,
  }),
  properties: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    xpath: PropTypes.string,
    regex: PropTypes.string,
  })),
  onChange: PropTypes.func,
};
