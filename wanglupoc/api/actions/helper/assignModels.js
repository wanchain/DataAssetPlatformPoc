/**
 * Created by jishiwu on 1/4/17.
 */
import Assets from '../../models/assetsmodel';

export function assignAssetsModelObject(des, src) {
  // assetsName: req.body.assetsName ? req.body.assetsName : '',
  //   assetsTitle: req.body.assetsTitle ? req.body.assetsTitle : '',
  //   assetsType: req.body.assetsType ? req.body.assetsType : 0,
  //   publishType: req.body.publishType ? req.body.publishType : 0,
  //   stockNumber: req.body.stockNumber ? req.body.stockNumber : 0,
  //   unitType: req.body.unitType ? req.body.unitType : 0,
  //   unitPrice: req.body.unitPrice ? req.body.unitPrice : 0,
  //   members: req.body.members ? req.body.members : '',
  //   publishTime: req.body.publishTime ? req.body.publishTime : new Date(),
  //   totalValue: req.body.totalValue ? req.body.totalValue : 0,
  //   exchangeState: req.body.exchangeState ? req.body.exchangeState : false,
  //   receipt: req.body.receipt ? req.body.receipt : {}

  // des.assetsName = src.assetsName;
  // des.assetsTitle = src.assetsTitle;
  // des.assetsType = src.assetsType;
  // des.publishType = src.publishType;
  // des.stockNumber = src.stockNumber;
  // des.unitType = src.unitType;
  // des.unitPrice = src.unitPrice;
  // des.members = src.members;
  // des.publishTime = src.publishTime;
  // des.totalValue = src.totalValue;
  // des.exchangeState = src.exchangeState;
  //
  // des.contractAddress = src.contractAddress;
  // des.creatorAddress = src.creatorAddress;
  // des.marketPrice = src.marketPrice;
  // des.issueState = src.issueState;
  // des.receipt = src.receipt;

  //// !!!!infact we should ignore created_at, updated_at,

  for (const key in src) {
    if (src.hasOwnProperty(key)) {
      des[key] = src[key];
    }
  }
}