import React, {useState} from 'react';
import PropTypes from 'prop-types';

import style from './style.module.css';


/**
 * Input component that also sets the corresponding filter.
 * @param {function} onAdd Callback for adding the filter.
 * @return {React.Component} A react component.
 */
function AddressInput({onAdd}) {
  const [value, setValue] = useState('');
  return <React.Fragment>
    <label>
      <input
        type="text"
        value={value}
        placeholder="IP Address"
        onChange={(e) => setValue(e.target.value)}>
      </input>
    </label>
    <button onClick={() => onAdd((d) => d.address.startsWith(value))}>
      Add filter <span className="mu mu-plus"></span>
    </button>
  </React.Fragment>;
}

/**
 * Input component that also sets the corresponding filter.
 * @param {function} onAdd Callback for adding the filter.
 * @return {React.Component} A react component.
 */
function PortCountInput({onAdd}) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const filterFunction = (d) => min <= (Object.keys(d.ports).length &&
      Object.keys(d.ports).length <= max);

  return <React.Fragment>
    <span>Minimum ports:</span>
    <label>
      <input
        className={style.numberInput}
        type="number"
        value={min}
        min={0}
        onChange={(e) => setMin(e.target.value)}>
      </input>
    </label>
    <span>Maximum ports:</span>
    <label>
      <input
        className={style.numberInput}
        type="number"
        value={max}
        min={min+1}
        onChange={(e) => setMax(e.target.value)}>
      </input>
    </label>
    <button onClick={() => onAdd(filterFunction)}>
      Add filter <span className="mu mu-plus"></span>
    </button>
  </React.Fragment>;
}

/**
 * Input component that also sets the corresponding filter.
 * @param {function} onAdd Callback for adding the filter.
 * @return {React.Component} A react component.
 */
function TrafficInput({onAdd}) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const filterFunction = (node) => {
    const [inByPortConnections, outByPortConnections] = [
      Object.values(node.ports).reduce((ac, dc) => ac + dc.in.length, 0),
      Object.values(node.ports).reduce((ac, dc) => ac + dc.out.length, 0)];
    const incoming = node.in.length + inByPortConnections;
    const outgoing = node.out.length + outByPortConnections;
    return min <= (incoming + outgoing) && (incoming + outgoing) <= max;
  };

  return <React.Fragment>
    <span>Minimum connections:</span>
    <label>
      <input
        className={style.numberInput}
        type="number"
        value={min}
        min={0}
        onChange={(e) => setMin(e.target.value)}>
      </input>
    </label>
    <span>Maximum connections:</span>
    <label>
      <input
        className={style.numberInput}
        type="number"
        value={max}
        min={min+1}
        onChange={(e) => setMax(e.target.value)}>
      </input>
    </label>
    <button onClick={() => onAdd(filterFunction)}>
      Add filter <span className="mu mu-plus"></span>
    </button>
  </React.Fragment>;
}

/**
 * Input component that also sets the corresponding filter.
 * @param {function} onAdd Callback for adding the filter.
 * @return {React.Component} A react component.
 */
function IncomingTrafficInput({onAdd}) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const filterFunction = (node) => {
    const inByPortConnections =
      Object.values(node.ports).reduce((ac, dc) => ac + dc.in.length, 0);
    const incoming = node.in.length + inByPortConnections;
    return min <= incoming && incoming <= max;
  };

  return <React.Fragment>
    <span>Minimum connections:</span>
    <label>
      <input
        className={style.numberInput}
        type="number"
        value={min}
        min="0"
        onChange={(e) => setMin(e.target.value)}>
      </input>
    </label>
    <span>Maximum connections:</span>
    <label>
      <input
        className={style.numberInput}
        type="number"
        value={max}
        min={min+1}
        onChange={(e) => setMax(e.target.value)}>
      </input>
    </label>
    <button onClick={() => onAdd(filterFunction)}>
      Add filter <span className="mu mu-plus"></span>
    </button>
  </React.Fragment>;
}

/**
 * Input component that also sets the corresponding filter.
 * @param {function} onAdd Callback for adding the filter.
 * @return {React.Component} A react component.
 */
function OutgoingTrafficInput({onAdd}) {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const filterFunction = (node) => {
    const outByPortConnections =
      Object.values(node.ports).reduce((ac, dc) => ac + dc.out.length, 0);
    const outgoing = node.out.length + outByPortConnections;
    return min <= outgoing && outgoing <= max;
  };

  return <React.Fragment>
    <span>Minimum connections:</span>
    <label>
      <input
        className={style.numberInput}
        type="number"
        value={min}
        min="0"
        onChange={(e) => setMin(e.target.value)}>
      </input>
    </label>
    <span>Maximum connections:</span>
    <label>
      <input
        className={style.numberInput}
        type="number"
        value={max}
        min={min+1}
        onChange={(e) => setMax(e.target.value)}>
      </input>
    </label>
    <button onClick={() => onAdd(filterFunction)}>
      Add filter <span className="mu mu-plus"></span>
    </button>
  </React.Fragment>;
}

/**
 * Input component that also sets the corresponding filter.
 * @param {function} onAdd Callback for adding the filter.
 * @return {React.Component} A react component.
 */
function IpVersionInput({onAdd}) {
  const [version, setVersion] = useState('IPv4');

  const filterFunction =
  (d) => d.type.startsWith(version);

  return <React.Fragment>
    <select value={version} onChange={(e) => setVersion(e.target.value)}>
      <option value="IPv4">IPv4</option>
      <option value="IPv6">IPv6</option>
    </select>
    <button onClick={() => onAdd(filterFunction)}>
      Add filter <span className="mu mu-plus"></span>
    </button>
  </React.Fragment>;
}

export default {
  'Address': AddressInput,
  'Port count': PortCountInput,
  'Traffic': TrafficInput,
  'Incoming traffic': IncomingTrafficInput,
  'Outgoing traffic': OutgoingTrafficInput,
  'IP version': IpVersionInput,
};

AddressInput.propTypes = {
  onAdd: PropTypes.func,
};

PortCountInput.propTypes = {
  onAdd: PropTypes.func,
};

TrafficInput.propTypes = {
  onAdd: PropTypes.func,
};

IncomingTrafficInput.propTypes = {
  onAdd: PropTypes.func,
};

OutgoingTrafficInput.propTypes = {
  onAdd: PropTypes.func,
};

IpVersionInput.propTypes = {
  onAdd: PropTypes.func,
};
