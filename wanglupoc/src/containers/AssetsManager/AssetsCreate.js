/**
 * Created by jishiwu on 12/1/16.
 */
import React, {Component} from 'react';

export default class AssetsCreate extends Component {
  static propTypes = {
    children: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}
