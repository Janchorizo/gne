import React, {useState} from 'react';

import style from './style.module.css';


function handleUpload(e, setFile, show) {
  console.log(e.target);
  if (e.target.files.length != 1) {
    return;
  }
  setFile(e.target.files[0]);
  show(true);
}

export default function UploadModal() {
  const [shown, show] = useState(false);
  const [file, setFile] = useState(null);

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
      <table className="primary">
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
          <tr>
            <td>Name</td>
            <td><input type="text" placeholder="Xpath"/></td>
            <td><input type="text" placeholder="Regex format"/></td>
            <td></td>
          </tr>
          <tr>
            <td>Name</td>
            <td><input type="text" placeholder="Xpath"/></td>
            <td><input type="text" placeholder="Regex format"/></td>
            <td></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="Property name"/></td>
            <td><input type="text" placeholder="Xpath"/></td>
            <td><input type="text" placeholder="Regex format"/></td>
            <td>
              <button onClick={() => show(false)}>
                <span className="mu mu-plus"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <h3>Links</h3>
      <p>
        Links represent a connection between two nodes,
        that may be the same.<br/>
        The port will be infered from the direction.
      </p>
      <table className="primary">
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
          <tr>
            <td>Source</td>
            <td><input type="text" placeholder="Xpath"/></td>
            <td><input type="text" placeholder="Regex format"/></td>
            <td></td>
          </tr>
          <tr>
            <td>Dest</td>
            <td><input type="text" placeholder="Xpath"/></td>
            <td><input type="text" placeholder="Regex format"/></td>
            <td></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="Property name"/></td>
            <td><input type="text" placeholder="Xpath"/></td>
            <td><input type="text" placeholder="Regex format"/></td>
            <td>
              <button onClick={() => show(false)}>
                <span className="mu mu-plus"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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
