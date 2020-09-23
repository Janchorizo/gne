window.apiUrl = '__STAGE__' === 'prod'
  ? "https://gne-conversion-api.herokuapp.com/parse"
  : "http://localhost:5000/parse";

export default function apiParse(file, nodeProperties, linkProperties) {
  const form = new FormData();
  console.log(JSON.stringify(nodeProperties))
  console.log(JSON.stringify(linkProperties))
  form.append('node', JSON.stringify(nodeProperties));
  form.append('link', JSON.stringify(linkProperties));
  form.append('doc', file, 'doc');

  return new Promise((resolve, reject) => {
    fetch(window.apiUrl, {
      "method": "POST",
      "headers": {
        "content-type": "multipart/form-data;"
      }
    })
    .then(response => {
      resolve(response);
    })
    .catch(err => {
      reject(err);
    });
        
  });
}
