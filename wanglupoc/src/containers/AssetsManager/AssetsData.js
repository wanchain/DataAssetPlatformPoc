/**
 * Created by jishiwu on 12/7/16.
 * this file focus on data operation only
 */

// class AssetsDataItem {
//   constructor(item) {
//     this.info = {};
//     this.info.corporation = item.corporation;
//     this.info.property = item.property;
//     this.info.stocktotalnumber = item.stocktotalnumber;
//     this.info.totalvalue = item.totalvalue;
//     this.info.exchangestate = item.exchangestate;
//     this.info.createtime = item.createtime;
//     this.info._id = item._id;
//   }
// }

export default class AssetsData {
  constructor() {
    this.allDataItem = [];
    this.showDataItem = [];
    this.sortType = 0; // 0 no sort-  1 asset name - 2 asset type - 3 asset total - 4 status - 5 public time
    this.filtType = 0; // 0-no filt 1-asset type is public
    this.word = ''; // search key word
    this._sortAsset(this.sortType);
    this._filtAsset(this.filtType);
    return this;
  }

  // add
  addAssetItem(item) {
    // const newItem = new AssetsDataItem(item);
    this.allDataItem.push(item);
    this._sortAsset(this.sortType);
    this._filtAsset(this.filtType);
    this._searchAsset(this.word);
    return this;
  }
  // del
  removeAssetItem(itemDel) {
    const newAsset = this.allDataItem(item => {
      return item.info._id !== itemDel.info._id;
    });
    this.allDataItem = newAsset;
    this._filtAsset(this.filtType);
    this._searchAsset(this.word);
    return this;
  }
  // mod
  editAssetItem(itemMod) {
    this.allDataItem.forEach(item => {
      if (item.info._id === itemMod.info._id) {
        item.info.corporation = itemMod.corporation;
        item.info.property = itemMod.property;
        item.info.stocktotalnumber = itemMod.stocktotalnumber;
        item.info.totalvalue = itemMod.totalvalue;
        item.info.exchangestate = itemMod.exchangestate;
        item.info.createtime = itemMod.createtime;
      }
    });
    this._sortAsset(this.sortType);
    this._filtAsset(this.filtType);
    this._searchAsset(this.word);
    return this;
  }
  // all
  setAll(all) {
    this.allDataItem = all;
    this._sortAsset(this.sortType);
    this._filtAsset(this.filtType);
    this._searchAsset(this.word);
    return this;
  }

  sortAsset(sortType) {
    this._sortAsset(sortType);
    this._filtAsset(this.filtType);
    this._searchAsset(this.word);
    return this;
  }
  filtAsset(filtType) {
    this._filtAsset(filtType);
    this._searchAsset(this.word);
    return this;
  }
  searchAsset(word) {
    this._filtAsset(this.filtType);
    this._searchAsset(word);
    return this;
  }

  _sortAsset(sortType) {
    this.sortType = sortType;
    switch (parseInt(sortType, 10)) {
      case 0:
        break;
      case 1: // asset name
        this.allDataItem.sort((item1, item2) => {
          if (item1.corporation < item2.corporation) {
            return -1;
          } else if (item1.corporation > item2.corporation) {
            return 1;
          }
          return 0;
        });
        break;
      default:
        break;
    }
  }
  _filtAsset(filtType) {
    this.filtType = filtType;
    switch (parseInt(filtType, 10)) {
      case 0:
        this.showDataItem = this.allDataItem;
        break;
      case 1:
        this.showDataItem = this.allDataItem.filter(item => { return item.property === 1; });
        break;
      default:
        break;
    }
  }
  _searchAsset(word) {
    this.word = word;
    this.showDataItem = this.showDataItem.filter(item => {
      return (item.corporation.indexOf(word) !== -1) ||
        (item.property.indexOf(word) !== -1) ||
        (item.stocktotalnumber.indexOf(word) !== -1) ||
        (item.totalvalue.indexOf(word) !== -1) ||
        (item.exchangestate.indexOf(word) !== -1) ||
        (item.createtime.indexOf(word) !== -1);
    });
  }

}
