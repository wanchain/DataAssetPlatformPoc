const SET_FILE_INFO = 'wanglupoc/poeLocal/SET_FILE_INFO';
const ADD = 'wanglupoc/poeLocal/ADD';
const ADD_SUCCESS = 'wanglupoc/poeLocal/ADD_SUCCESS';
const ADD_FAIL = 'wanglupoc/poeLocal/ADD_FAIL';
const GET_SHORT_LINK = 'wanglupoc/poe/GET_SHORT_LINK';
const GET_SHORT_LINK_SUCCESS = 'wanglupoc/poe/GET_SHORT_LINK_SUCCESS';
const GET_SHORT_LINK_FAIL = 'wanglupoc/poe/GET_SHORT_LINK_FAIL';

const initialState = {
  fileInfo: {},
  desc: '',
  txHash: '',
  shortLink: ''
};

export default function poeLocal(state = initialState, action = {}) {
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

export function getShortLink(hash) {
  return {
    types: [GET_SHORT_LINK, GET_SHORT_LINK_SUCCESS, GET_SHORT_LINK_FAIL],
    promise: (client) => client.post('/poe/getShortLink', {
      data: hash
    })
  };
}
