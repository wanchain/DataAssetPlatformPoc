/**
 * Created by jishiwu on 12/20/16.
 */
const DEPOSITSETFOCUS = 'deposit/DEPOSITSETFOCUS';
const DEPOSITSENDTRANSACTION = 'deposit/DEPOSITSENDTRANSACTION';
const DEPOSITSENDTRANSACTION_SUCCESS = 'deposit/DEPOSITSENDTRANSACTION_SUCCESS';
const DEPOSITSENDTRANSACTION_FAIL = 'deposit/DEPOSITSENDTRANSACTION_FAIL';

const initialState = {
  focusindex: 0,
  transaction: {
    youraddress: '',
    number: '',
    theiraddress: '',
  }
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case DEPOSITSETFOCUS:
      return {
        ...state,
        focusindex: action.payload.focusindex
      };
    case DEPOSITSENDTRANSACTION:
      console.log('DEPOSITSENDTRANSACTION: begin');
      return {
        ...state
      };
    case DEPOSITSENDTRANSACTION_SUCCESS:
      {
        console.log('DEPOSITSENDTRANSACTION_SUCCESS');
        // const items2show = _search(action.result.data, state.word);
        // return {
        //   ...state,
        //   items: action.result.data,
        //   items2show: items2show
        // };
      }
      break;
    case DEPOSITSENDTRANSACTION_FAIL:
      console.log('DEPOSITSENDTRANSACTION_FAIL');
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export function setFocus(index) {
  return {
    type: DEPOSITSETFOCUS,
    payload: {focusindex: index}
  };
}

export function sendTransaction(transaction) {
  return {
    types: [DEPOSITSENDTRANSACTION, DEPOSITSENDTRANSACTION_SUCCESS, DEPOSITSENDTRANSACTION_FAIL],
    promise: (client) => client.post('/assets/sendTransaction', {
      data: transaction
    })
  };
}
