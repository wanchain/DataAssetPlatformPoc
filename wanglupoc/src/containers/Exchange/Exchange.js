/**
 * Created by jishiwu on 2/13/17.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as depositActions from 'redux/modules/deposit';

class ExchangeItem extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    buy: React.PropTypes.number,
    sell: React.PropTypes.number,
    low: React.PropTypes.number,
    high: React.PropTypes.number,
    last: React.PropTypes.number,
    vol: React.PropTypes.number,
  };

  render() {
    const {name, buy, sell, low, high, last, vol} = this.props;
    return (
      <tr>
        <td>{name}</td>
        <td>{buy}</td>
        <td>{sell}</td>
        <td>{low}</td>
        <td>{high}</td>
        <td>{last}</td>
        <td>{vol}</td>
      </tr>
    );
  }
}

@connect(
  (state) =>({
    exchangeData: state.deposit.exchangeData
  }),
  depositActions
)
export default class Exchange extends Component {
  static propTypes = {
    exchangeData: React.PropTypes.object,
    getExchangeData: React.PropTypes.func
  };

  componentDidMount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    const self = this;
    this.timer = setInterval(function NoName() {
      self.props.getExchangeData();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  timer = null;

  render() {
    const exchangeItems = [];
    const { exchangeData} = this.props;
    // const exchangeData = {'btccny': {'at': 1486964094, 'ticker': {'buy': '4044.03', 'sell': '4045.03', 'low': '4030.03', 'high': '4045.03', 'last': '4042.03', 'vol': '4746.931'}},
    //                       'ethcny': {'at': 1486964094, 'ticker': {'buy': '0.0', 'sell': '0.0', 'low': '0.0', 'high': '0.0', 'last': '0.0', 'vol': '0.0'}}};
    // ExchangeItem.push(<ExchangeItem key={item._id} item={item} assetsName={activeAssets.assetsName}/>);
    for (const key in exchangeData) {
      if (exchangeData.hasOwnProperty(key)) {
        const ticker = exchangeData[key].ticker;
        exchangeItems.push(<ExchangeItem key={key} name={key} buy={ticker.buy} sell={ticker.sell} low={ticker.low}
                                        high={ticker.high} last={ticker.last} vol={ticker.vol}/>);
      }
    }

    return (
      <table>
        <thead>
        <tr>
          <th>名称</th>
          <th>买入价格</th>
          <th>卖出价格</th>
          <th>最低价格</th>
          <th>最高价格</th>
          <th>当前价格</th>
          <th>成交量</th>
        </tr>
        </thead>
        <tbody>
        {exchangeItems}
        </tbody>
      </table>
    );
  }
}
