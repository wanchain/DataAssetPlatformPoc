const SET_DESC = 'wanglupoc/poe/SET_DESC';
const SET_SHORT_CODE_LINK = 'wanglupoc/poe/SET_SHORT_CODE_LINK';
const ADD = 'wanglupoc/poe/ADD';
const ADD_SUCCESS = 'wanglupoc/poe/ADD_SUCCESS';
const ADD_FAIL = 'wanglupoc/poe/ADD_FAIL';
const VERIFY = 'wanglupoc/poe/VERIFY';
const VERIFY_SUCCESS = 'wanglupoc/poe/VERIFY_SUCCESS';
const VERIFY_FAIL = 'wanglupoc/poe/VERIFY_FAIL';
const GET_SHORT_LINK = 'wanglupoc/poe/GET_SHORT_LINK';
const GET_SHORT_LINK_SUCCESS = 'wanglupoc/poe/GET_SHORT_LINK_SUCCESS';
const GET_SHORT_LINK_FAIL = 'wanglupoc/poe/GET_SHORT_LINK_FAIL';

const initialState = {
  description: '',
  txHash: '',
  shortLink: '',
};

export default function poe(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DESC:
      return {
        ...state,
        description: action.payload
      };
    case SET_SHORT_CODE_LINK:
      return {
        ...state,
        shortCodeLink: action.payload
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
    case VERIFY:
      return {
        ...state,
        isLoading: true
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case VERIFY_FAIL:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

export function setDesc(desc) {
  return {
    type: SET_DESC,
    payload: desc
  };
}

export function setShortCodeLink(data) {
  return {
    type: SET_SHORT_CODE_LINK,
    payload: data
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

export function verify(shortLink) {
  return {
    types: [VERIFY, VERIFY_SUCCESS, VERIFY_FAIL],
    promise: (client) => client.post('/poe/verify', {
      data: shortLink
    })
  };
}
