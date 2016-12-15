/**
 * Created by jishiwu on 12/6/16.
 */
// import AssetsData from '../../containers/AssetsManager/AssetsData';

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
const ASSETSET = 'assets/ASSETSET';
const ASSETSEARCH = 'assets/ASSETSEARCH';
const ASSETSLISTACTIVE = 'assets/ASSETSLISTACTIVE';
const ASSETSCREATESTEP = 'assets/ASSETSCREATESTEP';
const ASSETSRESETCREATE = 'assets/ASSETSRESETCREATE';

const initialState = {
  items: [],
  items2show: [],
  item: {
    assetsName: '',
    assetsTitle: '',
    assetsType: 0,
    publishType: 0,
    stockNumber: 0,
    unitType: 0,
    unitPrice: 0,
    members: '',
    publishTime: '',
    totalValue: 0,
    exchangeState: false
  },
  word: '',
  isListActive: true,
  createStep: 1
};

function _search(items, word) {
  const rt = items.filter((item)=>{
    return (item.assetsName.indexOf(word) !== -1) ||
      (item.assetsType.toString().indexOf(word) !== -1) ||
      (item.stockNumber.toString().indexOf(word) !== -1) ||
      (item.totalValue.toString().indexOf(word) !== -1) ||
      (item.exchangeState.toString().indexOf(word) !== -1) ||
      (item.publishTime.toString().indexOf(word) !== -1);
  });
  return rt;
}

export default function(state = initialState, action = {}) {
  // console.log(state);
  // console.log(action.type);
  switch (action.type) {
    case ASSETSADD:
      console.log('assetsadd: begin');
      return {
        ...state,
      };
    case ASSETSADD_SUCCESS:
      {
        console.log('assetsadd: receive success');
        const newitems = state.items.filter(()=>{return true;});
        newitems.push(action.result.data);
        const items2show = _search(newitems, state.word);
        return {
          ...state,
          items: newitems,
          items2show: items2show
        };
      }
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
      {
        const newitems = state.items.filter(()=>{return true;});
        for (let tmp = 0; tmp < newitems.length; tmp++) {
          if (newitems[tmp]._id === action.result.data._id) {
            newitems[tmp] = action.result.data;
            break;
          }
        }
        const items2show = _search(newitems, state.word);
        return {
          ...state,
          items: newitems,
          items2show: items2show
        };
      }
      break;
    case ASSETSMOD_FAIL:
      console.log('ASSETSMOD_FAIL');
      return {
        ...state,
        error: action.error
      };
    case ASSETSDEL:
      console.log('ASSETSDEL');
      return {
        ...state
      };
    case ASSETSDEL_SUCCESS:
      console.log('ASSETSDEL_SUCCESS');
      {
        const del = action.result.data;
        const newitems = state.items.filter(item => {
          return item._id !== del._id;
        });
        const items2show = _search(newitems, state.word);
        return {
          ...state,
          items: newitems,
          items2show: items2show
        };
      }
      break;
    case ASSETSDEL_FAIL:
      console.log('ASSETSDEL_FAIL');
      return {
        ...state,
        error: action.error
      };
    case ASSETSALL:
      console.log('ASSETSALL: begin');
      return {
        ...state
      };
    case ASSETSALL_SUCCESS:
      {
        console.log('ASSETSALL_SUCCESS: receive success');
        const items2show = _search(action.result.data, state.word);
        return {
          ...state,
          items: action.result.data,
          items2show: items2show
        };
      }
      break;
    case ASSETSALL_FAIL:
      console.log('ASSETSALL_FAIL: receive failed');
      return {
        ...state,
        error: action.error
      };

      // it seams like
    case ASSETSET:
      console.log('ASSETSET');
      return {
        ...state,
        item: action.payload.item
      };

    case ASSETSEARCH:
      {
        console.log('ASSETSEARCH');
        const word = action.payload.word;
        const items2show = _search(state.items, word);

        return {
          ...state,
          items2show: items2show,
          word: action.payload.word
        };
      }
      break;
    case ASSETSLISTACTIVE:
      {
        console.log('ASSETSLISTACTIVE');
        return {
          ...state,
          isListActive: action.payload.isListActive
        };
      }
      break;
    case ASSETSCREATESTEP:
      {
        console.log('ASSETSCREATESTEP');
        return {
          ...state,
          createStep: action.payload.createStep
        };
      }
      break;
    case ASSETSRESETCREATE:
      {
        console.log('ASSETSRESETCREATE');
        return {
          ...state,
          item: action.payload.item,
          createStep: action.payload.createStep
        };
      }
      break;
    default:
      return state;
  }
}

export function addOneAssets(obj) {
  return {
    types: [ASSETSADD, ASSETSADD_SUCCESS, ASSETSADD_FAIL],
    promise: (client) => client.post('/assets/add', {
      data: obj
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
        id: item.assetsName
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

export function setItem(item) {
  return {
    type: ASSETSET,
    payload: {item: item}
  };
}

export function search(word) {
  return {
    type: ASSETSEARCH,
    payload: {word: word}
  };
}
export function setListActive(bActive) {
  return {
    type: ASSETSLISTACTIVE,
    payload: {isListActive: bActive}
  };
}
export function setCreateStep(step) {
  return {
    type: ASSETSCREATESTEP,
    payload: {createStep: step}
  };
}
export function resetCreate() {
  return {
    type: ASSETSRESETCREATE,
    payload: {
      item: {
        assetsName: '',
        assetsTitle: '',
        assetsType: 0,
        publishType: 0,
        stockNumber: 0,
        unitType: 0,
        unitPrice: 0,
        members: '',
        publishTime: '',
        totalValue: 0,
        exchangeState: false
      },
      createStep: 1
    }
  };
}

