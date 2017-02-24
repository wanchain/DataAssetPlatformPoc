const GET_TX_INFO = 'wanglupoc/poe/proof/GET_TX_INFO';
const GET_TX_INFO_SUCCESS = 'wanglupoc/poe/proof/GET_TX_INFO_SUCCESS';
const GET_TX_INFO_FAIL = 'wanglupoc/poe/proof/GET_TX_INFO_FAIL';

// const GET_TX_INFO = 'wanglupoc/poe/proof/GET_TX_INFO';
// const GET_TX_INFO_SUCCESS = 'wanglupoc/poe/proof/GET_TX_INFO_SUCCESS';
// const GET_TX_INFO_FAIL = 'wanglupoc/poe/proof/GET_TX_INFO_FAIL';

const VERIFY = 'wanglupoc/poe/proof/VERIFY';
const VERIFY_SUCCESS = 'wanglupoc/poe/proof/VERIFY_SUCCESS';
const VERIFY_FAIL = 'wanglupoc/poe/proof/VERIFY_FAIL';

const initialState = {
  senderAddress: '',
  timeStamp: '',
  txHash: '',
  fileInfo: {}
};

export default function proof(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
    case VERIFY:
      return {
        ...state,
        isLoading: true
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        fileInfo: action.result.fileInfo,
        timeStamp: action.result.timestamp,
        senderAddress: action.result.sender
      };
    case VERIFY_FAIL:
      return state;
    case GET_TX_INFO:
      return state;
    case GET_TX_INFO_SUCCESS:
      return state;
    case GET_TX_INFO_FAIL:
      return state;
  }
}

export function getTxInfo(shortLink) {
  return {
    types: [GET_TX_INFO, GET_TX_INFO_SUCCESS, GET_TX_INFO_FAIL],
    promise: (client) => client.post('/poe/getTx', {
      data: shortLink
    })
  };
}

export function verify(code) {
  return {
    types: [VERIFY, VERIFY_SUCCESS, VERIFY_FAIL],
    promise: (client) => client.post('/poe/verify', {
      data: {shortLink: code}
    })
  };
}
