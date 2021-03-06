import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';

import render from './vis';
import handleFocus from './focus';
import style from './style.module.css';


/**
 * Interactive node-link diagram showing the network.
 * @param   {object} data The network.
 * @param   {string} focused Focused network node's address.
 * @param   {function} setFocused Callback to set the focused node.
 * @return {React.Component} A react component.
 */
export default function Network({data, focused, setFocused}) {
  if (data === null) {
    return '';
  }

  const svgRef = useRef();

  useEffect( // render node-link graph
      () => render(svgRef.current, data, setFocused),
      [data]);

  useEffect( // highlight focused nodes
      () => handleFocus(svgRef.current, focused),
      [focused]);

  return <svg ref={svgRef} className={style.network}>
    <g id="legend"></g>
  </svg>;
}

Network.propTypes = {
  data: PropTypes.object,
  focused: PropTypes.string,
  setFocused: PropTypes.func,
};
