import React, {useState} from 'react';
import PropTypes from 'prop-types';

import * as events from './events.js';
import InputCell from './inputCell.js';
import style from './style.module.css';


/**
 * Editable table holding the property description for SVG elements.
 * @param   {list} compulsory A list of compulsory properties.
 * @param   {object} onChange Callback for setting the new property list.
 * @param   {object} properties A list of the current properties.
 * @return {React.Component} A react component.
 */
export default function Table({compulsory, properties, onChange}) {
  const defaultFields = {name: '', xpath: '', regex: ''};
  const [editing, onEdit] = useState(defaultFields);
  const reset = () => onEdit(defaultFields);
  const rows = [];

  compulsory.forEach((p) => {
    let property = properties.filter((x) => x.name === p)?.[0];
    if (property === undefined) {
      property = {name: p, xpath: '', regex: ''};
    }

    rows.push(<tr key={p}>
      <td>{p}</td>
      <InputCell
        name='xpath'
        placeholder='Xpath'
        {...{property, properties, onChange}} />
      <InputCell
        name='regex'
        placeholder='Regex format'
        {...{property, properties, onChange}} />
      <td></td>
    </tr>);
  });

  properties
      .filter((p) => !compulsory.includes(p.name))
      .forEach((property) => {
        rows.push(<tr key={property.name}>
          <InputCell
            name='name'
            placeholder='Name'
            {...{property, properties, onChange}} />
          <InputCell
            name='xpath'
            placeholder='Xpath'
            {...{property, properties, onChange}} />
          <InputCell
            name='regex'
            placeholder='Regex format'
            {...{property, properties, onChange}} />
          <td>
            <button
              onClick={() =>
                events.onPropertyDelete(onChange, properties, property)}>
              <span className="mu mu-delete"></span>
            </button>
          </td>
        </tr>);
      });

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
          onChange={(e) => onEdit({...editing, name: e.target.value})}
          type="text" placeholder="Property name"/></td>
        <td><input
          value={editing.xpath}
          onChange={(e) => onEdit({...editing, xpath: e.target.value})}
          type="text" placeholder="Xpath"/></td>
        <td><input
          value={editing.regex}
          onChange={(e) => onEdit({...editing, regex: e.target.value})}
          type="text" placeholder="Regex format"/></td>
        <td>
          <button
            onClick={() =>
              events.onPropertyAdd(onChange, reset, properties, editing)}>
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
  onChange: PropTypes.func,
};
