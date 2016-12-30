import sendHttpRequest from '../http/httpAjax';
import CryptoJS from '../../../../local_modules/crypto';
/**
 * Transaction types
 */
// const TX_TYPE_INVALID   = '';
// const TX_TYPE_REDIRECT  = 'R';
// const TX_TYPE_HASH      = 'H';
const TX_TYPE_TEXT = 'T';
const TX_TYPE_HASHLINK = 'L';
// const TX_TYPE_ENCRYPTED = 'E';

/**
 * Supported file types
 */
const FILE_TYPE_UNKNOWN = 'raw';
const FILE_TYPE_PDF = 'pdf';
const FILE_TYPE_ARCHIVE = 'arc';
const FILE_TYPE_TEXT = 'txt';
const FILE_TYPE_IMAGE = 'img';

const PDF = ['pdf'];
const ARCHIVE = ['zip', 'rar', 'gz', 'arj', '7z', 'tgz', 'lzh'];
const TEXT = ['txt', 'doc', 'dox', 'rtf'];
const IMAGE = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'psd', 'tiff', 'ico', 'pic', 'pcx'];

const REQ_SHORT_CODE_TIMES = 15;
const senderAddr = '0xbd2d69e3e68e1ab3944a865b3e566ca5c48740da';

const getFileType = (filename) => {
  let filetype = FILE_TYPE_UNKNOWN;
  const arr = filename.split('.');
  const fileExt = arr[arr.length - 1];
  if ($.inArray(fileExt, PDF) !== -1) {
    filetype = FILE_TYPE_PDF;
  }
  if ($.inArray(fileExt, ARCHIVE) !== -1) {
    filetype = FILE_TYPE_ARCHIVE;
  }
  if ($.inArray(fileExt, TEXT) !== -1) {
    filetype = FILE_TYPE_TEXT;
  }
  if ($.inArray(fileExt, IMAGE) !== -1) {
    filetype = FILE_TYPE_IMAGE;
  }

  return filetype;
};

const fileHash = (file, callback) => {
  if (!file) {
    return;
  }
  const fileReader = new FileReader();
  // In progress
  console.log('state=' + fileReader.readyState);
  // EMPTY : 0 : No data has been loaded yet.
  // LOADING : 1 : Data is currently being loaded.
  // DONE : 2 : The entire read request has been completed.
  if (fileReader.readyState === 1) {
    // the file loading
    if (!confirm('是否退出hash计算？')) {
      // return;
    } else {
      fileReader.abort();
      setTimeout((function NOName(_f) {
        return function NOName2() {
          // readFile(_f);
          console.log('error!!!!!!!!!!!!!!!!!!!!!!!!!!!');
          console.log(_f);
        };
      }(file)), 500);
      return;
    }
  }

  const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
  const chunkSize = 100000;
  // const startTime = +new Date(), elapsed;
  const chunks = Math.ceil(file.size / chunkSize);
  let currentChunk = 0;
  const sha256 = CryptoJS.algo.SHA256.create();

  const readNextChunk = () =>{
    const start = currentChunk * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    fileReader.readAsBinaryString(blobSlice.call(file, start, end));
  };

  fileReader.onload = (event) =>{
    let text = event.target.result;
    console.log('text=' + text);
    text = CryptoJS.enc.Utf8.parse(text);
    console.log('text-urf8=' + text);
    sha256.update(text);
    ++currentChunk;

    if (currentChunk < chunks) {
      readNextChunk();
    } else {
      const hash = sha256.finalize().toString();
      if (__DEVELOPMENT__) console.log('hash=' + hash);
      // elapsed = +new Date() - startTime;

      if (__DEVELOPMENT__) console.log('callback=' + callback);
      if (typeof callback === 'function') {
        callback(hash);
      }
    }
  };

  fileReader.onerror = function NoName3(error) {
    console.log('error=' + error);
  };

  readNextChunk();
};

const unicode2String = (unicode) => {
  const data = unicode.split('\\u');
  let str = '';
  for (let it = 0; it < data.length; it++) {
    str += String.fromCharCode(parseInt(data[it], 16).toString(10));
  }
  return str;
};

const string2Unicode = (str) => {
  let result = '';
  for (let it = 0; it < str.length; it++) {
    result += '\\u' + parseInt(str[it].charCodeAt(0), 10).toString(16);
  }

  return result;
};
// method name 'add'
const createAddParamsLocalFile = (fileInfo) => {
  const addParams = {
    'id': 'CHAINY',
    'version': 1,
    'type': TX_TYPE_HASHLINK,
    'filename': '',
    'hash': '',
    'filetype': '',
    'filesize': '',
    'description': ''
  };

  addParams.filename = fileInfo.name;
  addParams.hash = fileInfo.hash;
  addParams.filetype = getFileType(fileInfo.name);
  addParams.filesize = fileInfo.size;
  addParams.description = fileInfo.desc;

  return JSON.stringify(addParams);
};

const createAddRemoteReqParams = (fileRemoteInfo) => {
  const addParams = {
    'id': 'CHAINY',
    'version': 1,
    'type': TX_TYPE_HASHLINK,
    'url': '',
    'hash': '',
    'filetype': '',
    'filesize': '',
    'description': ''
  };

  addParams.url = fileRemoteInfo.url;
  addParams.hash = fileRemoteInfo.hash;
  addParams.filetype = getFileType(fileRemoteInfo.url);
  addParams.filesize = fileRemoteInfo.size;
  addParams.description = fileRemoteInfo.desc;

  return JSON.stringify(addParams);
};

const createAddTextParams = (info) => {
  const addParams = {
    'id': 'CHAINY',
    'version': 1,
    'type': TX_TYPE_TEXT,
    'description': '',
    'hash': '',
  };
  addParams.hash = info.hash;
  addParams.description = info.desc;

  return JSON.stringify(addParams);
};

const createAddUploadReqParams = (fileUploadInfo) =>{
  const addParams = {
    'id': 'CHAINY',
    'version': 1,
    'type': TX_TYPE_HASHLINK,
    'filename': '',
    'hash': '',
    'filetype': '',
    'filesize': '',
    'ipfsid': '',
    'description': ''
  };

  addParams.filename = fileUploadInfo.name;
  addParams.hash = fileUploadInfo.hash;
  addParams.filetype = getFileType(fileUploadInfo.name);
  addParams.filesize = fileUploadInfo.size;
  addParams.ipfsid = fileUploadInfo.ipfsid;
  addParams.description = fileUploadInfo.desc;

  return JSON.stringify(addParams);
};

const createStandardReqParams = (params, sndrAddr, method) => {
  const reqData = {
    'jsonrpc': '2.0',
    'id': 1,
    'method': '',
    'params': []
  };

  let paramsResult;

  const methodName = method.name;
  const methodType = method.type;

  switch (methodName) {
    case 'add':
      let createParamsMethod;
      switch (methodType) {
        case 'local':
          createParamsMethod = createAddParamsLocalFile(params);
          break;
        case 'remote':
          createParamsMethod = createAddRemoteReqParams(params);
          break;
        case 'upload':
          createParamsMethod = createAddUploadReqParams(params);
          break;
        case 'text':
          createParamsMethod = createAddTextParams(params);
          break;
        default:
          break;
      }

      paramsResult = [
        sndrAddr,
        createParamsMethod
      ];
      break;
    case 'getLink':
      paramsResult = [params];
      break;
    case 'get':
      // short code
      paramsResult = [params];
      break;

    case 'getTx':
      // short code
      paramsResult = [params];
      break;
    default:
      return null;
  }

  reqData.id = new Date().valueOf();
  reqData.method = methodName;
  reqData.params = paramsResult;

  return JSON.stringify(reqData);
};

const clipShortCode = (shortLink) => {
  const arr = shortLink.split('\/');
  return arr[arr.length - 1];
};

const requestShortCode = (reqTimes, txHash, callback) => {
  if (reqTimes <= 0) {
    return;
  }
  let times = reqTimes;
  if (reqTimes > REQ_SHORT_CODE_TIMES) {
    times = REQ_SHORT_CODE_TIMES;
  }

  const tx = txHash;

  const delay = 5000 + 2000 * (REQ_SHORT_CODE_TIMES - times);
  if (__DEVELOPMENT__) console.log('Req time ' + times + ' delay ' + delay);

  const createMethod = {
    'name': 'getLink',
  };

  const shortCodeParam = createStandardReqParams(tx, senderAddr, createMethod);
  if (__DEVELOPMENT__) console.log('shortCodeParam=' + shortCodeParam);

  sendHttpRequest(shortCodeParam, 2, (result)=>{
    if (__DEVELOPMENT__) {
      console.log('result=' + result);
      console.log('result-json=' + JSON.stringify(result));
      console.log('id=' + result.id);
      console.log('result.result=' + result.result);
      console.log('short-typeof(result)=' + typeof (result));
    }
    const res = result.result;
    if (res === 'undefined' || res === '' || res === null) {
      if (__DEVELOPMENT__) console.log('no exsit-res' + res);
      requestShortCode(--times, tx, callback);
    } else {
      if (__DEVELOPMENT__) console.log('has exsit-res' + res);
      const shortCode = clipShortCode(result.result);
      callback(shortCode);
    }
  }, (error)=>{
    console.log('shortcode-error=' + error);
  }, delay);
};

export {fileHash, createStandardReqParams, clipShortCode, requestShortCode, string2Unicode, unicode2String};
