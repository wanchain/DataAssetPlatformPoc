const SET_DESC = 'set description';
const SET_HASH = 'set hash value';

const initialState = {
  desc: '',
  txhash: '',
  short_code_link: '',
};


export default function textInfo(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DESC:
      return {
        ...state,
        desc: action.payload
      };
    case SET_HASH:
      return {
        ...state,
        txhash: action.payload
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

export function setHash(hash) {
  return {
    type: SET_HASH,
    payload: hash
  };
}
