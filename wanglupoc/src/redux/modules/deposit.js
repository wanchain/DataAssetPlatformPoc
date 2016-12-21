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
    contractAddress: '0xbbbbbbbbbbbbbb',
    number: 50,
    receiverAddress: '0xaaaaaaaaaaaaa',
  },
  userbalance: {
    cash: 101,
    assets: [
      {
        creatorAddress: '0x4d3e67e30a250b647b7ea5b1f684b03d6f8d5255',
        assetsName: 'sss',
        assetsTitle: 's',
        assetsType: 0,
        publishType: 0,
        stockNumber: 9999999,
        unitType: 0,
        unitPrice: 1,
        members: '',
        publishTime: '2016-12-29T00:00:00.000Z',
        totalValue: 0,
        exchangeState: false,
        contractAddress: '0xc0b2c2f422bc90a8167f4c6a43a2629c7293ee01',
        hold: 9999980
      }
    ]
  },
  transactions: [
    {fromAddress: '0xbbbbbbbbbbbbbb', toAddress: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: 0, totalPrice: 200, transferQuantity: 10, valuePerShare: 20, fee: 0, status: '完成', timestamp: '2016-10-12'},
    {fromAddress: '0xbbbbbbbbbbbbbb', toAddress: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: 0, totalPrice: 200, transferQuantity: 10, valuePerShare: 20, fee: 0, status: '完成', timestamp: '2016-10-12'},
    {fromAddress: '0xbbbbbbbbbbbbbb', toAddress: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: 0, totalPrice: 200, transferQuantity: 10, valuePerShare: 20, fee: 0, status: '完成', timestamp: '2016-10-12'},
    {fromAddress: '0xbbbbbbbbbbbbbb', toAddress: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: 0, totalPrice: 200, transferQuantity: 10, valuePerShare: 20, fee: 0, status: '完成', timestamp: '2016-10-12'}
  ]
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
        balances: action.result.data
      };
    case DEPOSIT_FAIL:
      console.log('DEPOSIT_FAIL');
      return {
        ...state
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
    promise: (client) => client.post('/assets/customTokenTransfer', {
      data: transaction
    })
  };
}

export function getbalance() {
  return {
    types: [DEPOSITGETBALANCE, DEPOSITGETBALANCE_SUCCESS, DEPOSITGETBALANCE_FAIL],
    promise: (client) => client.post('/deposit/getbalance', {})
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
    types: [DEPOSITGETTRANSACTIONS, DEPOSITGETTRANSACTIONS_SUCCESS, DEPOSITGETTRANSACTIONS_FAIL],
    promise: (client) => client.post('/deposit/getTransactions', {})
  };
}
