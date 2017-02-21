import React, {Component} from 'react';
import AssetsListItem from './AssetsListItem';
import {connect} from 'react-redux';
import * as assetsActions from '../../redux/modules/assets';

@connect(
  (state) => ({
    items: state.assets.items2show,
    error: state.assets.error,
    word: state.assets.word
  }),
  assetsActions
)
export default class AssetsList extends Component {
  static propTypes = {
    items: React.PropTypes.array,
    error: React.PropTypes.object,
    word: React.PropTypes.string,

    addOneAssets: React.PropTypes.func,
    getAll: React.PropTypes.func,
    delOne: React.PropTypes.func,
    modify: React.PropTypes.func,
    search: React.PropTypes.func,
    setListActive: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSearchValueChanged = this.onSearchValueChanged.bind(this);
    this.state = {
    };
  }

  componentWillMount() {
    this.props.setListActive(true);
  }

  componentDidMount() {
    this.props.getAll();
  }

  onSearchValueChanged(event) {
    event.preventDefault();
    console.log(event.target.value);
    this.props.search(event.target.value);
  }


  onCreateOne() {
    const assetsName = 'wl' + Math.random();
    this.props.addOneAssets({
      assetsName: assetsName,
      assetsType: 0,
      stockNumber: 1000,
      totalValue: 10000,
      exchangeState: true,
      publishTime: new Date(),
    });
  }

  onCreateOne2() {
    this.props.getAll();
  }

  onCreateOne3() {
    const item = this.props.items[0];
    item.assetsName = 'wanglutech' + Math.random();
    this.props.modify(item);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.search(this.props.word);
  }

  render() {
    const searchBtnN = require('./icon/searchBtnN.png');
    const assetStyle = require('./assetmanager.scss');
    const items = [];

    if (this.props.items) {
      if (this.props.items.length !== 0) {
        this.props.items.map(
          item => items.push(<AssetsListItem key={item._id} item={item} />)
        );
      }
    }

    return (
      <div className="col-md-12">
        <header className={assetStyle.header}> 资产列表 </header>

        <br/>

        <form onSubmit={this.handleSubmit}>
          <div className="col-md-2">
            <div className={assetStyle.searchlable}>搜索</div>
          </div>
          <div className="col-md-9" >
            <input
              value={ this.props.word}
              onChange={ this.onSearchValueChanged.bind(this)}
              className={assetStyle.searchtext} placeholder="sou" />
          </div>

          <div className="col-md-1" >
            <input onClick={this.handleSubmit} className={assetStyle.searchbtn} type="image" src={searchBtnN}/>
          </div>
        </form>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
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
              <tbody>{items}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
