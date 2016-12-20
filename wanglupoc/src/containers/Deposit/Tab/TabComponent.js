/**
 * Created by jishiwu on 12/20/16.
 */
import React from 'react';
import TabsControl from './TabsControl';

export default class TabComponent extends React.Component {
  render() {
    return (
      <div>
        <TabsControl>
          <div name="first">
            I'm the first tab
          </div>
          <div name="second">
            I'm the second tab
          </div>
          <div name="third">
            I'm the third tab
          </div>
        </TabsControl>
      </div>
    );
  }
}
