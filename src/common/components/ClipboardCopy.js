import React from 'react';
import PropTypes from 'prop-types';

import {ClipoardUtility} from 'common/helpers';
import style from './style.module.css';

const icon = <svg version="1.1" id="Capa_1" x="0px" y="0px"
  viewBox="0 0 512 512">
  <g>
    <g>
      <g>
        <path d={'M320,160H32c-17.673,0-32,14.327-32,32v288c0,'+
                 '17.673,14.327,32,32,32h288c17.673,0,32-14.327,32-32V192C'+
                 '352,174.327,337.673,160,320,160z M320,480H32V192h288V480z'}/>
        <path d={'M480,0H192c-17.673,0-32,14.327-32,32v80h32V32h288v288h-80'+
                 'v32h80c17.673,0,32-14.327,32-32V32C512,14.327,497.673,0,4'+
                 '80,0z'}/>
      </g>
    </g>
  </g>
</svg>;

/**
 * Clipboard-icon button for copying to the system clipboard.
 * Additional CSS classes [tooltip-top, tooltip-right, tooltip-left]
 * can be used to customize tooltip positioning.
 * @param   {string} msg Tooltip text content.
 * @param   {string} content The content to be copied upon click.
 * @param   {string} extraClassName Extra CSS classes to be added.
 * @return  {React.Component} A React component
 */
export default function ClipboardCopy({msg, content, extraClassName=''}) {
  const className = `${style.clipboard} ${extraClassName}`;
  return <span
    data-tooltip={msg}
    className={className}
    onClick={() => ClipoardUtility.copy(content)}>
    {icon}
  </span>;
}

ClipboardCopy.propTypes = {
  msg: PropTypes.string,
  content: PropTypes.string,
  extraClassName: PropTypes.string,
};
