import React, {useState} from 'react';

import {PropertyTable} from 'components';
import style from './style.module.css';


const compulsoryNodeProperties = ['name', 'ports'];
const compulsoryLinkProperties = ['source', 'dest'];

function handleUpload(e, setFile, show) {
  if (e.target.files.length != 1) {
    return;
  }
  setFile(e.target.files[0]);
  show(true);
}

export default function UploadModal() {
  const [shown, show] = useState(false);
  const [file, setFile] = useState(null);
  const [nodeProperties, setNodeProperties] = useState([])
  const [linkProperties, setLinkProperties] = useState([])

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
          onChange={(e) => handleUpload(e, setFile, show)}
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
      <h3>Nodes</h3>
      <p>
        Nodes represent a routable device which may,
        optionally, have open ports.
      </p>
      <PropertyTable
        compulsory={compulsoryNodeProperties}
        properties={nodeProperties}
        onChange={setNodeProperties} />
      <h3>Links</h3>
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
        <button className={style.cancel} onClick={() => show(false)}>
          Cancel
        </button>
        <button className={style.load} onClick={() => show(false)}>
          Load
        </button>
      </div>
    </div>
  </div>;
}

UploadModal.propTypes = {};
