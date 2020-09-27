import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {PropertyTable} from 'components';
import {API, processNetwork} from 'common/helpers';
import predefinedConf from './predefinedConf.json';
import style from './style.module.css';


const compulsoryNodeProperties = ['address', 'ports'];
const compulsoryLinkProperties = ['source', 'dest'];

/**
 * Creates a click event handler for uploading data.
 * @param   {File} file SVG file with the network.
 * @param   {string} nodeXpath Xpath string for the nodes.
 * @param   {string} linkXpath Xpath string for the links.
 * @param   {list} nodeProperties List of xpath and regex for node properties.
 * @param   {list} linkProperties List of xpath and regex for link properties.
 * @param   {function} setData Function to set the retrieved data.
 * @param   {function} show Function to set the modal visibility.
 * @return  {Function} The event callback
 */
function getUploadHandler(
    file,
    nodeXpath,
    linkXpath,
    nodeProperties,
    linkProperties,
    setData,
    show) {
  return function() {
    const nodeConf = JSON.stringify({
      xpath: nodeXpath,
      properties: nodeProperties,
    });
    const linkConf = JSON.stringify({
      xpath: linkXpath,
      properties: linkProperties,
    });
    API.parse(file, nodeConf, linkConf)
        .then(processNetwork)
        .then((response) => setData(response))
        .catch((err) => {
          console.log(err);
        });

    show(false);
  };
}

/**
 * Sets the target file and opens the upload modal.
 * @param   {Event} e File change event.
 * @param   {function} setFile Function for setting the file.
 * @param   {function} show Function to set the modal visibility.
 */
function handleFileDrop(e, setFile, show) {
  if (e.target.files.length != 1) {
    return;
  }
  setFile(e.target.files[0]);
  show(true);
}

/**
 * Top panel file drop and upload modal for retrieving networks.
 * @param   {function} setData Function to set the retrieved data.
 * @return  {React.Component} A React component.
 */
export default function UploadModal({setData}) {
  const [shown, show] = useState(false);
  const [file, setFile] = useState(null);
  const [nodeXpath, setNodeXpath] = useState('');
  const [linkXpath, setLinkXpath] = useState('');
  const [nodeProperties, setNodeProperties] = useState([]);
  const [linkProperties, setLinkProperties] = useState([]);
  const uploadHandler = getUploadHandler(
      file,
      nodeXpath,
      linkXpath,
      nodeProperties,
      linkProperties,
      setData,
      show);

  const loadDefault = () => {
    setNodeXpath(predefinedConf.node.xpath);
    setLinkXpath(predefinedConf.link.xpath);
    setNodeProperties(predefinedConf.node.properties);
    setLinkProperties(predefinedConf.link.properties);
  };

  const containerStyles = [
    style.container,
    shown === false ? style.none : '',
  ].join(' ');

  return <div className={style.uploadModal}>
    <div className={style.dropImage}>
      <label className="dropimage">
        {file === null ?
          <span>
            Select or drop an image <br/> to upload for exploration.
          </span> :
          <span className={style.fileDetails}>
            {file.name} <br/><i>{Math.trunc(file.size / 1024)}Kb</i>
          </span>
        }
        <input
          onChange={(e) => handleFileDrop(e, setFile, show)}
          title="Drop image or click me"
          type="file"
          accept="image/svg"/>
      </label>
      {file === null || shown === true ?
        '' :
        <button
          className={style.editOptions}
          onClick={() => show(true)}>
          <span className="mu mu-cog"></span>
        </button>
      }
    </div>
    <div className={containerStyles}>
      <h3>
        Nodes
        <input
          className={style.xpathInput}
          value={nodeXpath}
          type="text"
          placeholder="Xpath"
          onChange={(e) => setNodeXpath(e.target.value)}/>
      </h3>
      <p>
        Nodes represent a routable device which may,
        optionally, have open ports.
      </p>
      <PropertyTable
        compulsory={compulsoryNodeProperties}
        properties={nodeProperties}
        onChange={setNodeProperties} />
      <h3>
        Links
        <input
          className={style.xpathInput}
          value={linkXpath}
          type="text"
          placeholder="Xpath"
          onChange={(e) => setLinkXpath(e.target.value)}/>
      </h3>
      <p>
        Links represent a connection between two nodes,
        that may be the same.<br/>
        The port will be infered from the direction.
      </p>
      <PropertyTable
        compulsory={compulsoryLinkProperties}
        properties={linkProperties}
        onChange={setLinkProperties} />
      <div className={style.actionContainer}>
        <button className={style.loadDefault} onClick={() => loadDefault()}>
          <span className="mu mu-link"></span> Use default conf
        </button>
        <button className={style.cancel} onClick={() => show(false)}>
          Cancel
        </button>
        <button className={style.load} onClick={uploadHandler}>
          Load
        </button>
      </div>
    </div>
  </div>;
}

UploadModal.propTypes = {
  setData: PropTypes.func,
};
