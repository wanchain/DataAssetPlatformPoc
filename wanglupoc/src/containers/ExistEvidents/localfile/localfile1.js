/**
 * Created by jishiwu on 12/26/16.
 */
import React, {Component} from 'react';
import {fileHash1, clipboard} from './mytest';
import ActvionModal from '../dialog/actionModal';
import {CryptoJS} from '../../../../local_modules/crypto';
// import Clipboard from 'clipboard';

const alert = require('../../img/ic_alert.png');
export default class LocalFile1 extends Component {
  componentWillMount() {
    clipboard();
  }
  render() {
    // const tmp = require('clipboard');
    // const clipboard = new tmp.Clipboard('.btn');
    // console.log(clipboard);
    // import Clipboard from 'clipboard';
    // const clipboard = new Clipboard('.btn');
    // console.log(clipboard);
    const reader = new FileReader();
    fileHash1(reader, null);
    const self = this;
    reader.onload = function NoName() {
      self.setOwnerMembers(this.result);
    };
    return (
      <div>
        <img src={alert}/>
      </div>
    );
  }
}
