/**
 * Created by jishiwu on 11/30/16.
 */
import React, {Component, PropTypes} from 'react';

export default class AssetsTable extends Component {
  // news: PropTypes.arrayOf(PropTypes.shape({
  //   title: PropTypes.string.isRequired,
  //   link: PropTypes.string.isRequired,
  //   contentSnippet: PropTypes.string,
  // })).isRequired,
  static propTypes = {
    assetslist: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.renderitem = this.renderitem.bind(this);
    this.stopExchange = this.stopExchange.bind(this);
  }

  props = {
    assetslist: []
  };

  stopExchange(event) {
    const id = event.target.value;
    console.log(id);
    alert(id);
  }

  renderitem(data) {
    return (
      <tr key={data.id}>
        <th scope="row">{data.assetsName}</th>
        <th>{data.assetsName}</th>
        <th>{data.stockNumber}</th>
        <th>{data.totalValue}</th>
        <th>{data.exchangeState}</th>
        <th>{data.publishTime}</th>
        <th>
          <table>
            <tbody>
            <tr>
              <th><a value={data.id} onClick={this.stopExchange} type="button">暂停交易&nbsp;</a></th>
              <th><a value={data.id} type="button">&nbsp;修改</a></th>
            </tr>
            <tr>
              <th><a value={data.id} type="button">名称修改&nbsp;</a></th>
              <th><a value={data.id} type="button">&nbsp;删除</a></th>
            </tr>
            </tbody>
          </table>
        </th>
      </tr>
    );
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <table className="table table-hover">
            <thead>
            <tr>
              <th>资产名称</th>
              <th>资产类型</th>
              <th>资产总量</th>
              <th>资产总额</th>
              <th>状态</th>
              <th>发行时间</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody>
            {this.props.assetslist && this.props.assetslist.map( this.renderitem )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
