/**
 * Created by jishiwu on 12/20/16.
 */
import React from 'react';
import './TabComponent.scss';

export default class TabsControl extends React.Component {
  static propTypes = {
    children: React.PropTypes.array
  };

  constructor() {
    super();
    this.state = {
      currentIndex: 0
    };
  }

  checkTittleIndex(index) {
    return index === this.state.currentIndex ? 'Tab_tittle active' : 'Tab_tittle';
  }

  checkItemIndex(index) {
    return index === this.state.currentIndex ? 'Tab_item show' : 'Tab_item';
  }

  render() {
    return (
      <div>
        <div className="Tab_tittle_wrap">
          { React.Children.map( this.props.children, (element, index) => {
            return (
              <div onClick={ () => { this.setState({currentIndex: index}); } } className={ this.checkTittleIndex(index) }>{ element.props.name }</div>
            );
          }) }
        </div>
        <div className="Tab_item_wrap">
          {React.Children.map(this.props.children, (element, index) => {
            return (
              <div className={ this.checkItemIndex(index) }>{ element }</div>
            );
          })}
        </div>
      </div>
    );
  }
}
