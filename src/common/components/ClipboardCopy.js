import React from 'react';
import PropTypes from 'prop-types';

import {ClipoardUtility} from 'common/helpers';
import style from './style.module.css';


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
    onClick={() => ClipoardUtility.copy(content)}>📋</span>;
}

ClipboardCopy.propTypes = {
  msg: PropTypes.string,
  content: PropTypes.string,
  extraClassName: PropTypes.string,
};
