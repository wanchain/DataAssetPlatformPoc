/**
 * Created by jishiwu on 12/6/16.
 */

const ASSETSADD = 'assets/ASSETSADD';
const ASSETSADD_SUCCESS = 'assets/ASSETSADD_SUCCESS';
const ASSETSADD_FAIL = 'assets/ASSETSADD_FAIL';
const ASSETSMOD = 'assets/MOD';
const ASSETSMOD_SUCCESS = 'assets/ASSETSMOD_SUCCESS';
const ASSETSMOD_FAIL = 'assets/ASSETSMOD_FAIL';
const ASSETSDEL = 'assets/ASSETSDEL';
const ASSETSDEL_SUCCESS = 'assets/ASSETSDEL_SUCCESS';
const ASSETSDEL_FAIL = 'assets/ASSETSDEL_FAIL';
const ASSETSALL = 'assets/ASSETSALL';
const ASSETSALL_SUCCESS = 'assets/ASSETSALL_SUCCESS';
const ASSETSALL_FAIL = 'assets/ASSETSALL_FAIL';

const initialState = {
  items: []
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case ASSETSADD:
      console.log('assetsadd: begin');
      return {
        ...state,
      };
    case ASSETSADD_SUCCESS:
      console.log('assetsadd: receive success');
      return {
        ...state,
        shouldfetchall: false
      };
    case ASSETSADD_FAIL:
      console.log('assetsadd: receive failed');
      return {
        ...state,
        error: action.error
      };
    case ASSETSMOD:
      console.log('ASSETSMOD');
      return {
        ...state
      };
    case ASSETSMOD_SUCCESS:
      console.log('ASSETSMOD_SUCCESS');
      return {
        ...state
      };
    case ASSETSMOD_FAIL:
      console.log('ASSETSMOD_FAIL');
      return {
        ...state
      };
    case ASSETSDEL:
      console.log('ASSETSDEL');
      return {
        ...state
      };
    case ASSETSDEL_SUCCESS:
      console.log('ASSETSDEL_SUCCESS');
      const itemf = action.result.data;
      const newitems = state.items.filter(item => {
        return item._id !== itemf._id;
      });
      // if success, we'd better fetch all again..
      // const items = state.items;
      // for (let tmp = 0; tmp < items.length; tmp++) {
      //   if (item._id === items[tmp]._id) {
      //     items.splice(tmp, 1);
      //     break;
      //   }
      // }
      return {
        ...state,
        items: newitems
      };
    case ASSETSDEL_FAIL:
      console.log('ASSETSDEL_FAIL');
      return {
        ...state
      };
    case ASSETSALL:
      console.log('ASSETSALL: begin');
      return {
        ...state
      };
    case ASSETSALL_SUCCESS:
      console.log('ASSETSALL_SUCCESS: receive success');
      return {
        ...state,
        items: action.result.data
      };
    case ASSETSALL_FAIL:
      console.log('ASSETSALL_FAIL: receive failed');
      return {
        ...state
      };

    default:
      return state;
  }
}

export function addOneAssets(obj) {
  return {
    types: [ASSETSADD, ASSETSADD_SUCCESS, ASSETSADD_FAIL],
    promise: (client) => client.post('/assets/add', {
      data: {
        corporation: obj.corporation,
        property: obj.property,
        stocktotalnumber: obj.stocktotalnumber,
        totalvalue: obj.totalvalue,
        exchangestate: obj.exchangestate,
        createtime: obj.createtime
      }
    })
  };
}

export function getAll() {
  return {
    types: [ASSETSALL, ASSETSALL_SUCCESS, ASSETSALL_FAIL],
    promise: (client) => client.post('/assets/getall')
  };
}

export function delOne(item) {
  return {
    types: [ASSETSDEL, ASSETSDEL_SUCCESS, ASSETSDEL_FAIL],
    promise: (client) => client.post('/assets/delone', {
      data: {
        id: item.corporation
      }
    })
  };
}

export function modify(item) {
  return {
    types: [ASSETSMOD, ASSETSMOD_SUCCESS, ASSETSMOD_FAIL],
    promise: (client) => client.post('/assets/modify', {
      data: {
        item: item
      }
    })
  };
}
