import React, {Component} from 'react';

class Recorder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const styles = require('./record.scss');
    return (
      <div className={styles['recorder-content']}>
        <span className={styles['recorder-title']}>存证记录</span>
        <div className={styles['recorder-table']}>
          <table className={styles.table + styles['table-hover']}>
            <thead>
            <tr>
              <th>存证时间</th>
              <th>存证名称</th>
              <th>存证类型</th>
              <th>写入状态</th>
              <th>存证特征码</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>2016-10-12</td>
              <td>网录币</td>
              <td>+2000</td>
              <td>存入</td>
              <td>完成</td>
            </tr>
            <tr>
              <td>2016-10-12</td>
              <td>网录币</td>
              <td>+2000</td>
              <td>存入</td>
              <td>完成</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Recorder;
