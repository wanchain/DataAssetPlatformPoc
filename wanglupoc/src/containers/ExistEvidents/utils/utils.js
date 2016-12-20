'use strict';
import sendHttpRequest from '../http/httpAjax'
/**
 * Transaction types
 */
const TX_TYPE_INVALID   = '';
const TX_TYPE_REDIRECT  = 'R';
const TX_TYPE_HASH      = 'H';
const TX_TYPE_TEXT      = 'T';
const TX_TYPE_HASHLINK  = 'L';
const TX_TYPE_ENCRYPTED = 'E';

/**
 * Supported file types
 */
const FILE_TYPE_UNKNOWN = 'raw';
const FILE_TYPE_PDF     = 'pdf';
const FILE_TYPE_ARCHIVE = 'arc';
const FILE_TYPE_TEXT    = 'txt';
const FILE_TYPE_IMAGE   = 'img';

const PDF = ['pdf'];
const ARCHIVE = ['zip', 'rar', 'gz', 'arj', '7z', 'tgz', 'lzh'];
const TEXT = ['txt', 'doc', 'dox', 'rtf'];
const IMAGE = ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'psd', 'tiff', 'ico', 'pic', 'pcx'];

const REQ_SHORT_CODE_TIMES = 15;
const senderAddr = '0xbd2d69e3e68e1ab3944a865b3e566ca5c48740da';

const fileReader = new FileReader();
const FileHash = (file,callback) => {
  if(!file){
    return;
  }

  //In progress
  console.log("state=" + fileReader.readyState);
  //EMPTY : 0 : No data has been loaded yet.
  //LOADING : 1 : Data is currently being loaded.
  //DONE : 2 : The entire read request has been completed.
  if (fileReader.readyState === 1) {
    //the file loading
    if (!confirm("是否退出hash计算？")) {
      return;
    } else {
      fileReader.abort();
      ssetTimeout(function(_f) {
        return function() {
          readFile(_f);
        }
      }(file), 500);
      return;
    }
  }

  let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
  let chunkSize = 100000;
  let startTime = +new Date(), elapsed;
  let chunks = Math.ceil(file.size / chunkSize);
  let currentChunk = 0;
  let sha256 = CryptoJS.algo.SHA256.create()

  let readNextChunk = () =>{
    let start = currentChunk * chunkSize;
    let end = Math.min(start + chunkSize, file.size);
    fileReader.readAsBinaryString(blobSlice.call(file, start, end));
  };

  fileReader.onload = (e) =>{
    let text = e.target.result;
    console.log("text="+text);
    text = CryptoJS.enc.Utf8.parse(text);
    console.log("text-urf8="+text);
    sha256.update(text);
    ++currentChunk;

    if (currentChunk < chunks) {
      readNextChunk();
    } else {
      var hash = sha256.finalize().toString();
      if(DEBUG)console.log("hash="+hash);
      elapsed = +new Date() - startTime;

      if(DEBUG)console.log("callback="+callback);
      if(typeof callback === 'function'){
        callback(hash);
      }

    }
  };

  fileReader.onerror = function(error){
    console.log("error="+error);
  };

  readNextChunk();
};

const Unicode2String = (unicode) => {
  let data = unicode.split("\\u");
  var str ='';
  for(var i=0;i<data.length;i++)
  {
    str+=String.fromCharCode(parseInt(data[i],16).toString(10));
  }
  return str;
};

const String2Unicode = (str) => {
  let result ='';
  for(let i=0;i<str.length;i++)
  {
    result+="\\u"+parseInt(str[i].charCodeAt(0),10).toString(16);
  }

  return result;
};
//method name "add"
const createAddParamsLocalFile = (fileInfo) => {
  let addParams = {
    "id":"CHAINY",
    "version":1,
    "type":TX_TYPE_HASHLINK,
    "filename":"",
    "hash":"",
    "filetype":"",
    "filesize":"",
    "description":""
  };

  addParams.filename = fileInfo.name;
  addParams.hash = fileInfo.hash;
  addParams.filetype = getFileType(fileInfo.name);
  addParams.filesize = fileInfo.size;
  addParams.description = fileInfo.desc;

  return JSON.stringify(addParams);

};

const createAddRemoteReqParams = (fileRemoteInfo) => {

  let addParams = {
    "id":"CHAINY",
    "version":1,
    "type":TX_TYPE_HASHLINK,
    "url":"",
    "hash":"",
    "filetype":"",
    "filesize":"",
    "description":""
  };

  addParams.url = fileRemoteInfo.url;
  addParams.hash = fileRemoteInfo.hash;
  addParams.filetype = getFileType(fileRemoteInfo.url);
  addParams.filesize = fileRemoteInfo.size;
  addParams.description = fileRemoteInfo.desc;

  return JSON.stringify(addParams);
};

const createAddTextParams = (info) => {
  let addParams = {
    "id":"CHAINY",
    "version":1,
    "type":TX_TYPE_TEXT,
    "description":"",
    "hash":"",
  };
  addParams.hash = info.hash;
  addParams.description = info.desc;

  return JSON.stringify(addParams);
};

const createAddUploadReqParams = (fileUploadInfo) =>{

  let addParams = {
    "id":"CHAINY",
    "version":1,
    "type":TX_TYPE_HASHLINK,
    "filename":"",
    "hash":"",
    "filetype":"",
    "filesize":"",
    "ipfsid":"",
    "description":""
  };

  addParams.filename = fileUploadInfo.name;
  addParams.hash = fileUploadInfo.hash;
  addParams.filetype = getFileType(fileUploadInfo.name);
  addParams.filesize = fileUploadInfo.size;
  addParams.ipfsid = fileUploadInfo.ipfsid;
  addParams.description = fileUploadInfo.desc;

  return JSON.stringify(addParams);

};

const CreateStandardReqParams = (params, senderAddr, method) => {

  let reqData = {
    "jsonrpc":"2.0",
    "id":1,
    "method":"",
    "params":[]
  };

  let paramsResult;

  let methodName = method.name;
  let methodType = method.type;

  switch (methodName){
    case 'add':

      let createParamsMethod;
      switch(methodType){
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
      }

      paramsResult = [
        senderAddr,
        createParamsMethod
      ];
      break;
    case 'getLink':
      paramsResult = [params];
      break;
    case 'get':
      //short code
      paramsResult = [params];
      break;

    case 'getTx':
      //short code
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

const getFileType = (filename) => {

  let filetype = FILE_TYPE_UNKNOWN;
  let arr = filename.split('.');
  let fileExt = arr[arr.length - 1];
  if($.inArray(fileExt,PDF) !== -1){
    filetype = FILE_TYPE_PDF;
  }
  if($.inArray(fileExt,ARCHIVE) !== -1){
    filetype = FILE_TYPE_ARCHIVE;
  }
  if($.inArray(fileExt,TEXT) !== -1){
    filetype = FILE_TYPE_TEXT;
  }
  if($.inArray(fileExt,IMAGE) !== -1){
    filetype = FILE_TYPE_IMAGE;
  }

  return filetype;
};

const ClipShortCode = (shortLink) => {

  let arr = shortLink.split('\/');
  let shortCode = arr[arr.length - 1];

  return shortCode;

};


const RequestShortCode = (reqTimes,txHash,callback) => {

  if(reqTimes <= 0){
    return;
  }
  let times = reqTimes;
  if(reqTimes > REQ_SHORT_CODE_TIMES){
    times = REQ_SHORT_CODE_TIMES;
  }

  let tx = txHash;

  let delay = 5000 + 2000 * (REQ_SHORT_CODE_TIMES - times);
  if(DEBUG)console.log("Req time "+times+" delay "+delay);

  let createMethod = {
    'name':'getLink',
  };

  let shortCodeParam = CreateStandardReqParams(tx,senderAddr,createMethod);
  if(DEBUG)console.log("shortCodeParam="+shortCodeParam);

  sendHttpRequest(shortCodeParam,2,(result)=> {
    if (DEBUG) {
      console.log("result=" + result);
      console.log("result-json=" + JSON.stringify(result));
      console.log("id=" + result.id);
      console.log("result.result=" + result.result);
      console.log("short-typeof(result)=" + typeof (result));
    }
    let res = result.result;
    if(res === 'undefined' || res === '' || res === null){
      if(DEBUG)console.log("no exsit-res"+res);
      RequestShortCode(--times,tx,callback);
    }else{
      if(DEBUG)console.log("has exsit-res"+res);
      let shortCode = ClipShortCode(result.result);

      callback(shortCode);

    }

  },(error)=>{

    console.log("shortcode-error="+error);
  },delay)

};

export {FileHash,CreateStandardReqParams,ClipShortCode,RequestShortCode,String2Unicode,Unicode2String};