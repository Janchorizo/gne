import React, {useState} from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';


function onPropertyAdd(onChange, clearFields, properties, property) {
  if (property.name.length === 0 || property.xpath.length === 0) {return;}
  const isPresent = properties
    .map(p => p.name === property.name)
    .reduce((ac, dc) => ac || dc, false);
  if (isPresent === true) {return;}
  onChange([...properties, property]);
  clearFields()
}

function onPropertyDelete(onChange, properties, property) {
  const idx = properties.map(p => p.name).indexOf(property.name);
  const newProperties = [...properties];
  newProperties.splice(idx, 1);
  onChange(newProperties);
}

function InputCell({name, placeholder, property, properties, onChange}) {
  return <td><input
    value={property[name]}
    type="text"
    placeholder={placeholder}
    onChange={e => {
      let idx = properties.map(p => p.name).indexOf(property.name);
      if (idx === -1) { // a compulsory property not already present
        properties.push({name: property.name, xpath: '', regex: ''});
        idx = properties.length - 1;
      }
      const newProperties = [...properties];
      newProperties[idx] = {...newProperties[idx], [name]: e.target.value};
      onChange(newProperties);
    }}/>
  </td>
}

export default function Table({compulsory, properties, onChange}) {
  const defaultFields = {name: '', xpath: '', regex: ''}
  const [editing, onEdit] = useState(defaultFields)

  const rows = []
  compulsory.forEach(p => {
    let property = properties.filter(x => x.name === p)?.[0]
    if (property === undefined) {
      property = {name: p, xpath: '', regex: ''};
    }

    rows.push(<tr key={p}>
      <td>{p}</td>
      <InputCell name='xpath' placeholder='Xpath' {...{property, properties, onChange}} />
      <InputCell name='regex' placeholder='Regex format' {...{property, properties, onChange}} />
      <td></td>
    </tr>)
  })

  properties
    .filter(p => !compulsory.includes(p.name))
    .forEach(property => {
      rows.push(<tr key={property.name}>
        <InputCell name='name' placeholder='Name' {...{property, properties, onChange}} />
        <InputCell name='xpath' placeholder='Xpath' {...{property, properties, onChange}} />
        <InputCell name='regex' placeholder='Regex format' {...{property, properties, onChange}} />
        <td>
          <button onClick={() => onPropertyDelete(onChange, properties, property)}>
            <span className="mu mu-delete"></span>
          </button>
        </td>
      </tr>)
    })

  return <table className={style.table + ' primary'}>
      <thead>
        <tr>
          <th>Property</th>
          <th>
            <label>Xpath</label>
          </th>
          <th>
            <label>Regex formatting</label>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows}
        <tr>
          <td><input
            value={editing.name}
            onChange={e => onEdit({...editing, name: e.target.value})}
            type="text" placeholder="Property name"/></td>
          <td><input
            value={editing.xpath}
            onChange={e => onEdit({...editing, xpath: e.target.value})}
            type="text" placeholder="Xpath"/></td>
          <td><input
            value={editing.regex}
            onChange={e => onEdit({...editing, regex: e.target.value})}
            type="text" placeholder="Regex format"/></td>
          <td>
            <button onClick={() => onPropertyAdd(onChange, () => onEdit(defaultFields), properties, editing)}>
              <span className="mu mu-plus"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>;
}

Table.propTypes = {
  compulsory: PropTypes.arrayOf(PropTypes.string),
  properties: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    xpath: PropTypes.string,
    regex: PropTypes.string,
  })),
  onChange: PropTypes.func
};