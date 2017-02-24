const GET_IPFS_PATH = 'wanglupoc/poeUpload/GET_IPFS_PATH';
const GET_IPFS_PATH_SUCCESS = 'wanglupoc/poeUpload/GET_IPFS_PATH_SUCCESS';
const GET_IPFS_PATH_FAIL = 'wanglupoc/poeUpload/GET_SHORT_LINK_FAIL';
const ADD = 'wanglupoc/poeUpload/ADD';
const ADD_SUCCESS = 'wanglupoc/poeUpload/ADD_SUCCESS';
const ADD_FAIL = 'wanglupoc/poeUpload/ADD_FAIL';
const IPFS_SERVICE = 'http://127.0.0.1:8090/RemoteFileHashRelay/ipfs';
const SET_FILE_INFO = 'wanglupoc/poeUpload/SET_FILE_INFO';
const GET_SHORT_LINK = 'wanglupoc/poeUpload/GET_SHORT_LINK';
const GET_SHORT_LINK_SUCCESS = 'wanglupoc/poeUpload/GET_SHORT_LINK_SUCCESS';
const GET_SHORT_LINK_FAIL = 'wanglupoc/poeUpload/GET_SHORT_LINK_FAIL';

const initialState = {
  fileInfo: {},
  desc: '',
  txHash: '',
  shortLink: '',
};

export default function poeUpload(state = initialState, action = {}) {
  switch (action.type) {
    case SET_FILE_INFO:
      return {
        ...state,
        fileInfo: action.payload
      };
    case ADD:
      return state;
    case ADD_SUCCESS:
      return {
        ...state,
        txHash: action.result.data
      };
    case ADD_FAIL:
      return state;
    case GET_SHORT_LINK:
      return {
        ...state,
        isLoading: true
      };
    case GET_SHORT_LINK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        shortLink: action.result.data
      };
    case GET_SHORT_LINK_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case GET_IPFS_PATH:
      return {
        ...state,
        isLoading: true
      };
    case GET_IPFS_PATH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fileInfo: {
          ...state.fileInfo,
          ipfsid: action.result.result
        }
      };
    case GET_IPFS_PATH_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

export function setFileInfo(val) {
  return {
    type: SET_FILE_INFO,
    payload: val
  };
}

export function add(meta) {
  return {
    types: [ADD, ADD_SUCCESS, ADD_FAIL],
    promise: (client) => client.post('/poe/add', {
      data: meta
    })
  };
}

export function getIpfsPath(file) {
  return {
    types: [GET_IPFS_PATH, GET_IPFS_PATH_SUCCESS, GET_IPFS_PATH_FAIL],
    promise: (client) => client.post(IPFS_SERVICE, {
      data: file
    })
  };
}

export function getShortLink(hash) {
  return {
    types: [GET_SHORT_LINK, GET_SHORT_LINK_SUCCESS, GET_SHORT_LINK_FAIL],
    promise: (client) => client.post('/poe/getShortLink', {
      data: hash
    })
  };
}
