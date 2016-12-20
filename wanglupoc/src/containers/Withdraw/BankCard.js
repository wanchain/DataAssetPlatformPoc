/**
 * Created by jishiwu on 12/20/16.
 */
import React, { Component } from 'react';

export default class BankCard extends Component {
  static propTypes = {
    name: React.PropTypes.string,
    bank: React.PropTypes.string,
    number: React.PropTypes.string,
  };

  render() {
    const style = require('./BankCard.scss');

    return (
      <div className={style.card}>
        <div>
          {this.props.name}
        </div>
        <div>
          {this.props.bank}
        </div>
        <div>
          {this.props.number}
        </div>
      </div>
    );
  }
}
