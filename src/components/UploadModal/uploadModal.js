import React, {useState} from 'react';

import style from './style.module.css';


function handleUpload(e, setFile, show) {
  console.log(e.target)
  if (e.target.files.length != 1) {return}
  setFile(e.target.files[0])
  show(true)
}

export default function UploadModal() {
  const [shown, show] = useState(false);
  const [file, setFile] = useState(null)

  const containerStyles = [
    style.container,
    shown === false ? style.none : '',
  ].join(' ');

  return <div className={style.uploadModal}>
    <div className={style.dropImage}>
      <label className="dropimage">
        {file === null
          ? <span>Select or drop an image <br/> to upload for exploration.</span>
          : <span className={style.fileDetails}>
              {file.name} <br/><i>{Math.trunc(file.size / 1024)}Kb</i>
            </span>
        }
        <input
          onChange={e => handleUpload(e, setFile, show)}
          title="Drop image or click me"
          type="file"
          accept="image/svg"/>
      </label>
      {file === null || shown === true
        ? ''
        : <button
            className={style.editOptions} 
            onClick={() => show(true)}>
            (edit options)
          </button>
      }
    </div>
    <div className={containerStyles}>
      <p>
        Change the graph to be explored.
        <button onClick={() => show(false)}>Cancel</button>
      </p>
    </div>
  </div>;
}

UploadModal.propTypes = {};
