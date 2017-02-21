import Assets from '../../models/assetsmodel';

export function assignAssetsModelObject(des, src) {

  des.assetsName = src.assetsName;
  des.assetsTitle = src.assetsTitle;
  des.assetsType = src.assetsType;
  des.publishType = src.publishType;
  des.stockNumber = src.stockNumber;
  des.unitType = src.unitType;
  des.unitPrice = src.unitPrice;
  des.members = src.members;
  des.publishTime = src.publishTime;
  des.totalValue = src.totalValue;
  des.exchangeState = src.exchangeState;

  des.contractAddress = src.contractAddress;
  des.creatorAddress = src.creatorAddress;
  des.marketPrice = src.marketPrice;
  des.issueState = src.issueState;
  des.receipt = src.receipt;

}