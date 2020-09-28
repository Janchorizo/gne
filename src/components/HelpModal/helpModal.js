import React, {useState} from 'react';

import style from './style.module.css';


/**
 * Help modal for the top bar.
 * @return {React.Component} A react component.
 */
export default function HelpModal() {
  const [shown, show] = useState(false);

  const containerStyles = [
    style.container,
    shown === false ? style.none : '',
  ].join(' ');

  return <div className={style.helpModal}>
    <div className={style.toggle}>
      <button className={shown === false ? '' : style.toggled}
        onClick={() => show(!shown)}
      >Help
      </button>
    </div>
    <div className={containerStyles}>
      <p>
        GNE is a tool intended to facilitate the explocartion
        of Graphviz output network graphs.
      </p>
      <b>How to proceed</b>
      <ol>
        <li>
          <span className="mu mu-upload"/> Drag or click the upload button
          to select the SVG file.
        </li>
        <li>
          <span className="mu mu-edit"/> Fill the xpath for finding nodes and
          their properties, or use the <span className="mu mu-link"/> default
          settings.
        </li>
        <li>
          <span className="mu mu-play"/> Click on load to load the network.
        </li>
      </ol>
      <b>The app</b>
      <ul>
        <li>
          <span className="mu mu-matrix"/> The expandable table shows the
          different nodes along with their address and traffic info. Hovering
          over a node will focus it in the network node-link diagram.
        </li>
        <li>
          <span className="mu mu-share"/> The network is presented in a
          node-link diagram that you may reposition by draggin a node to the
          desired position (click again to free it). Hovering over a node will
          focus it in the table.
        </li>
        <li>
          <span className="mu mu-hide"/> Large networks are hard to work with.
          Use filters in the lower part of the app to remove nodes from the
          node-link diagram (It will also affect the table).
        </li>
      </ul>
      <i>
        Iconset used is Microns from <a href="https://www.s-ings.com"
          title="Smartline">
          Stephen Hutchings
        </a> from <a href="https://www.s-ings.com/projects/microns-icon-font/"
          title="Microns">
          https://www.s-ings.com/projects/microns-icon-font/
        </a>
      </i>
      <br/>
      <i>
        Copy icon made by <a href="https://www.flaticon.com/authors/smartline"
          title="Smartline">
          Smartline
        </a> from <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </i>
    </div>
  </div>;
}

HelpModal.propTypes = {};
