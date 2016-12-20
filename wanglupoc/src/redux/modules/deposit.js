/**
 * Created by jishiwu on 12/20/16.
 */
const DEPOSITSETFOCUS = 'deposit/DEPOSITSETFOCUS';
const DEPOSITSENDTRANSACTION = 'deposit/DEPOSITSENDTRANSACTION';
const DEPOSITSENDTRANSACTION_SUCCESS = 'deposit/DEPOSITSENDTRANSACTION_SUCCESS';
const DEPOSITSENDTRANSACTION_FAIL = 'deposit/DEPOSITSENDTRANSACTION_FAIL';

const DEPOSITGETTRANSACTIONS = 'deposit/DEPOSITGETTRANSACTIONS';
const DEPOSITGETTRANSACTIONS_SUCCESS = 'deposit/DEPOSITGETTRANSACTIONS_SUCCESS';
const DEPOSITGETTRANSACTIONS_FAIL = 'deposit/DEPOSITGETTRANSACTIONS_FAIL';

const DEPOSITGETBALANCE = 'deposit/DEPOSITGETBALANCE';
const DEPOSITGETBALANCE_SUCCESS = 'deposit/DEPOSITGETBALANCE_SUCCESS';
const DEPOSITGETBALANCE_FAIL = 'deposit/DEPOSITGETBALANCE_FAIL';

const DEPOSIT = 'deposit/DEPOSIT';
const DEPOSIT_SUCCESS = 'deposit/DEPOSIT_SUCCESS';
const DEPOSIT_FAIL = 'deposit/DEPOSIT_FAIL';

const initialState = {
  focusindex: 0,
  transaction: {
    youraddress: '',
    number: '',
    theiraddress: '',
  },
  balances: [
    {id: 1, name: 'CNY', amount: 8990000},
    {id: 2, name: 'USD', amount: 5990000}
  ],
  transactions: [
    {from: '0xbbbbbbbbbbbbbb', to: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: '0', totalPrice: 200, volume: 10, unitPrice: 20, fee: 0, state: 200, data: '2016-10-12'},
    {from: '0xbbbbbbbbbbbbbb', to: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: '0', totalPrice: 200, volume: 10, unitPrice: 20, fee: 0, state: 200, data: '2016-10-12'},
    {from: '0xbbbbbbbbbbbbbb', to: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: '0', totalPrice: 200, volume: 10, unitPrice: 20, fee: 0, state: 200, data: '2016-10-12'},
    {from: '0xbbbbbbbbbbbbbb', to: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: '0', totalPrice: 200, volume: 10, unitPrice: 20, fee: 0, state: 200, data: '2016-10-12'}
  ],
  deposit: {
    userid: 'zhangying',
    id: 1,
    name: 'CNY',
    amount: 5000
  }
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case DEPOSITSETFOCUS:
      return {
        ...state,
        focusindex: action.payload.focusindex
      };
      // send transaction
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
      // get transactions
    case DEPOSITGETTRANSACTIONS:
      console.log('DEPOSITGETTRANSACTIONS');
      return {
        ...state
      };
    case DEPOSITGETTRANSACTIONS_SUCCESS:
      console.log('DEPOSITGETTRANSACTIONS_SUCCESS');
      return {
        ...state,
        transactions: action.result.data
      };
    case DEPOSITGETTRANSACTIONS_FAIL:
      console.log('DEPOSITGETTRANSACTIONS_FAIL');
      break;
    // get balance
    case DEPOSITGETBALANCE:
      console.log('DEPOSITGETBALANCE');
      break;
    case DEPOSITGETBALANCE_SUCCESS:
      console.log('DEPOSITGETBALANCE_SUCCESS');
      return {
        ...state,
        balances: action.result.data
      };
    case DEPOSITGETBALANCE_FAIL:
      console.log('DEPOSITGETBALANCE_FAIL');
      break;
    // deposit
    case DEPOSIT:
      console.log('DEPOSITGETBALANCE');
      break;
    case DEPOSIT_SUCCESS:
      console.log('DEPOSITGETBALANCE_SUCCESS');
      return {
        ...state,
        balances: action.result.data
      };
    case DEPOSIT_FAIL:
      console.log('DEPOSITGETBALANCE_FAIL');
      break;
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

export function getbalance(userid) {
  return {
    types: [DEPOSITGETBALANCE, DEPOSITGETBALANCE_SUCCESS, DEPOSITGETBALANCE_FAIL],
    promise: (client) => client.post('/assets/getbalance', {
      data: userid
    })
  };
}

export function doDeposit(userid) {
  return {
    types: [DEPOSIT, DEPOSIT_SUCCESS, DEPOSIT_FAIL],
    promise: (client) => client.post('/assets/deposit', {
      data: userid
    })
  };
}

export function getTransactions(userid) {
  return {
    types: [DEPOSITGETTRANSACTIONS, DEPOSITGETTRANSACTIONS_SUCCESS, DEPOSITGETTRANSACTIONS_FAIL],
    promise: (client) => client.post('/assets/getTransactions', {
      data: userid
    })
  };
}
