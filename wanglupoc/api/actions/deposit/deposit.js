/**
 * Created by jishiwu on 12/20/16.
 */
// get stock balance
export function getStockBalance(req) {
  console.log("-----getStockBalance");
  return new Promise((resolve, reject) => {
    console.log("get success!!");

    // need a name table...
    const balance = [
      {id: 1, assetsName: "网录币", assetsTitle: 'WLC', stockNumber: 1700, unitPrice: 18.3},
      {id: 2, assetsName: "时代网", assetsTitle: 'SD', stockNumber: 2700, unitPrice: 17.3},
      {id: 3, assetsName: "新海股份(XH)", assetsTitle: 'XH', stockNumber: 1500, unitPrice: 12.3}
    ];
    resolve({data: balance});
  });
}

// get cash balance
export function getbalance(req) {
  console.log("-----getbalance");
  return new Promise((resolve, reject) => {
    console.log("get success!!");
    // id === 1, CNY：人民币
    const balance = [
      {id: 1, name: 'CNY', amount: 8990000},
      {id: 2, name: 'USD', amount: 5990000}
      ];
    resolve({data: balance});
  });
}

// get transactions
export function getTransactions(req) {
  console.log("-----getTransactions");
  return new Promise((resolve, reject) => {
    console.log("get success!!");

    // trade type: 0 买入, 1 卖出, state: 200 代表完成
    const transactions = [
      {from: '0xbbbbbbbbbbbbbb', to: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: '0', totalPrice: 200, volume: 10, unitPrice: 20, fee: 0, state: 200, data: '2016-10-12'},
      {from: '0xbbbbbbbbbbbbbb', to: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: '0', totalPrice: 200, volume: 10, unitPrice: 20, fee: 0, state: 200, data: '2016-10-12'},
      {from: '0xbbbbbbbbbbbbbb', to: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: '0', totalPrice: 200, volume: 10, unitPrice: 20, fee: 0, state: 200, data: '2016-10-12'},
      {from: '0xbbbbbbbbbbbbbb', to: '0xaaaaaaaaaaaaa', assetsName: '网录币', tradetype: '0', totalPrice: 200, volume: 10, unitPrice: 20, fee: 0, state: 200, data: '2016-10-12'}
    ];
    resolve({data: transactions});
  });
}

// send transactions
export function sendTransactions(req) {
  console.log("-----sendTransactions");
  return new Promise((resolve, reject) => {
    console.log("send success!!");
    // id === 1, CNY：人民币
    const balance = [
      {id: 1, name: 'CNY', amount: 8990000}
    ];
    resolve({data: balance});
  });
}

export function deposit(req) {
  console.log("-----deposit");
  return new Promise((resolve, reject) => {
    console.log("deposit success!!");
    // 充值成功，现在的金额，加上充值的金额。。
    // req.body = {userid: xx, id: xx, name: xx, amount: xx}
    const balance = [
      {id: 1, name: 'CNY', amount: 8990000},
      {id: 2, name: 'USD', amount: 5990000}
    ];
    const cashbalance = balance.find((item) => {
      return (item.name === req.body.name) !== -1;
    });

    if (cashbalance.length > 0) {
      cashbalance[0].amount = cashbalance[0].amount + req.body.amount;
      resolve({data: cashbalance[0]});
    }
  });
}

export function withdraw(req) {
  console.log("-----withdraw");
  return new Promise((resolve, reject) => {
    console.log("withdraw success!!");
    // 提取成功，现在的金额，减去提取的金额。。
    // req.body = {id: xx, name: xx, amount: xx}
    const balance = [
      {id: 1, name: 'CNY', amount: 8990000},
      {id: 2, name: 'USD', amount: 5990000}
    ];
    const index = balance.findIndex((item) => {
      return (item.name === req.body.name) !== -1;
    });

    if (index >= 0) {
      balance[index].amount = balance[index].amount - req.body.amount;
      resolve({data: balance});
    } else {
      reject({error: 'can not find the cash type!!'})
    }
  });
}
