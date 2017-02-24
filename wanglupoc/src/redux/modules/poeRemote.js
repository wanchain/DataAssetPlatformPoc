const CONFIG_FILE = 'wanglupoc/poeRemote/CONFIG_FILE';
const CONFIG_FILE_SUCCESS = 'wanglupoc/poeRemote/CONFIG_FILE_SUCCESS';
const CONFIG_FILE_FAIL = 'wanglupoc/poeRemote/CONFIG_FILE_FAIL';

const UPDATE_FILE_INFO = 'wanglupoc/poeRemote/UPDATE_FILE_INFO';

const ADD = 'wanglupoc/poeRemote/ADD';
const ADD_SUCCESS = 'wanglupoc/poeRemote/ADD_SUCCESS';
const ADD_FAIL = 'wanglupoc/poeRemote/ADD_FAIL';

const GET_SHORT_LINK = 'wanglupoc/poeRemote/GET_SHORT_LINK';
const GET_SHORT_LINK_SUCCESS = 'wanglupoc/poeRemote/GET_SHORT_LINK_SUCCESS';
const GET_SHORT_LINK_FAIL = 'wanglupoc/poeRemote/GET_SHORT_LINK_FAIL';

const CRAWLER_SERVICE_API = 'http://localhost:8090/RemoteFileHashRelay/rfh';

const initialState = {
  fileInfo: {},
  txHash: '',
  shortLink: '',
};

export default function poeUpload(state = initialState, action = {}) {
  switch (action.type) {
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
    case CONFIG_FILE:
      return {
        ...state,
        isLoading: true,
        fileInfo: {
          uri: action.payload.uri,
          description: action.payload.description
        }
      };
    case CONFIG_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fileInfo: {
          ...state.fileInfo,
          id: action.result.result
        }
      };
    case CONFIG_FILE_FAIL:
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_FILE_INFO:
      return {
        ...state,
        fileInfo: {
          ...action.payload
        }
      };
    default:
      return state;
  }
}

export function configFile(params) {
  console.log(params);
  return {
    types: [CONFIG_FILE, CONFIG_FILE_SUCCESS, CONFIG_FILE_FAIL],
    promise: (client) => client.post(CRAWLER_SERVICE_API, {
      data: params.default
    }),
    payload: params
  };
}

export function updateFileInfo(params) {
  return {
    type: UPDATE_FILE_INFO,
    payload: params
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

export function getShortLink(hash) {
  return {
    types: [GET_SHORT_LINK, GET_SHORT_LINK_SUCCESS, GET_SHORT_LINK_FAIL],
    promise: (client) => client.post('/poe/getShortLink', {
      data: hash
    })
  };
}
