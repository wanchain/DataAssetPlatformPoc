const DEPOSITSETFOCUS = 'deposit/DEPOSITSETFOCUS';
const DEPOSITSENDTRANSACTION = 'deposit/DEPOSITSENDTRANSACTION';
const DEPOSITSENDTRANSACTION_SUCCESS = 'deposit/DEPOSITSENDTRANSACTION_SUCCESS';
const DEPOSITSENDTRANSACTION_FAIL = 'deposit/DEPOSITSENDTRANSACTION_FAIL';

const DEPOSIT_GET_TRANSACTIONS = 'deposit/DEPOSIT_GET_TRANSACTIONS';
const DEPOSIT_GET_TRANSACTIONS_SUCCESS = 'deposit/DEPOSIT_GET_TRANSACTIONS_SUCCESS';
const DEPOSIT_GET_TRANSACTIONS_FAIL = 'deposit/DEPOSIT_GET_TRANSACTIONS_FAIL';

const DEPOSITGETBALANCE = 'deposit/DEPOSITGETBALANCE';
const DEPOSITGETBALANCE_SUCCESS = 'deposit/DEPOSITGETBALANCE_SUCCESS';
const DEPOSITGETBALANCE_FAIL = 'deposit/DEPOSITGETBALANCE_FAIL';

const DEPOSIT = 'deposit/DEPOSIT';
const DEPOSIT_SUCCESS = 'deposit/DEPOSIT_SUCCESS';
const DEPOSIT_FAIL = 'deposit/DEPOSIT_FAIL';

const DEPOSITSETRECEIPT = 'deposit/DEPOSITSETRECEIPT';

const DEPOSITSETACTIVEASSETS = 'deposit/DEPOSITSETACTIVEASSETS';


const initialState = {
  focusindex: 0
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
        return {
          ...state
        };
      }
      break;
    case DEPOSITSENDTRANSACTION_FAIL:
      console.log('DEPOSITSENDTRANSACTION_FAIL');
      return {
        ...state,
        error: action.error
      };
    // get transactions
    case DEPOSIT_GET_TRANSACTIONS:
      console.log('DEPOSITGETTRANSACTIONS');
      return {
        ...state
      };
    case DEPOSIT_GET_TRANSACTIONS_SUCCESS:
      console.log('DEPOSITGETTRANSACTIONS_SUCCESS');
      return {
        ...state,
        transactions: action.result.data
      };
    case DEPOSIT_GET_TRANSACTIONS_FAIL:
      console.log('DEPOSITGETTRANSACTIONS_FAIL');
      return {
        ...state
      };
    // get balance
    case DEPOSITGETBALANCE:
      console.log('DEPOSITGETBALANCE');
      return {
        ...state
      };
    case DEPOSITGETBALANCE_SUCCESS:
      console.log('DEPOSITGETBALANCE_SUCCESS');
      return {
        ...state,
        userbalance: action.result.userbalance
      };
    case DEPOSITGETBALANCE_FAIL:
      console.log('DEPOSITGETBALANCE_FAIL');
      return {
        ...state
      };
    // deposit
    case DEPOSIT:
      console.log('DEPOSIT');
      return {
        ...state
      };
    case DEPOSIT_SUCCESS:
      console.log('DEPOSIT_SUCCESS');
      return {
        ...state,
        userbalance: action.result.userbalance
      };
    case DEPOSIT_FAIL:
      console.log('DEPOSIT_FAIL');
      return {
        ...state
      };
    case DEPOSITSETACTIVEASSETS:
      console.log('DEPOSITSETACTIVEASSETS');
      return {
        ...state,
        activeAssets: action.payload
      };
    case DEPOSITSETRECEIPT:
      return {
        ...state,
        receipt: action.payload
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

export function setActiveAssets(asset) {
  return {
    type: DEPOSITSETACTIVEASSETS,
    payload: asset
  };
}

export function setReceipt(receipt) {
  return {
    type: DEPOSITSETRECEIPT,
    payload: receipt
  };
}

export function sendTransaction(transaction) {
  return {
    types: [DEPOSITSENDTRANSACTION, DEPOSITSENDTRANSACTION_SUCCESS, DEPOSITSENDTRANSACTION_FAIL],
    promise: (client) => client.post('/assets/customTokenTransfer', {
      data: transaction
    })
  };
}

export function getBalance() {
  return {
    types: [DEPOSITGETBALANCE, DEPOSITGETBALANCE_SUCCESS, DEPOSITGETBALANCE_FAIL],
    promise: (client) => client.get('/deposit/getBalance')
  };
}

export function doDeposit(data) {
  return {
    types: [DEPOSIT, DEPOSIT_SUCCESS, DEPOSIT_FAIL],
    promise: (client) => client.post('/deposit/deposit', {data: data})
  };
}

export function getTransactions() {
  return {
    types: [DEPOSIT_GET_TRANSACTIONS, DEPOSIT_GET_TRANSACTIONS_SUCCESS, DEPOSIT_GET_TRANSACTIONS_FAIL],
    promise: (client) => client.get('/deposit/getTransactions')
  };
}
