const getFileBlob = function NoName(url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.addEventListener('load', function NoName4() {
    cb(xhr.response);
  });
  xhr.send();
};

const blobToFile = function NoName2(blob, name) {
  blob.lastModifiedDate = new Date();
  blob.name = name;
  return blob;
};

export default function getFileObject(filePathOrUrl, cb) {
  getFileBlob(filePathOrUrl, function NoName5(blob) {
    cb(blobToFile(blob, new Date().valueOf()));
  });
}

// getFileObject('img/test.jpg', function (fileObject) {
//     console.log(fileObject);
// });
