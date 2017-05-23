/**
 * Created by Benson on 2017/3/30.
 */
import React from 'react';
import HomeA from './Home_A';
import HomeB from './Home_B';
import HomeC from './Home_C';
import AppHead from '../Head/HeadMain';

class appHead extends React.Component {
  render() {
    return (
      <div>
        <AppHead type="ALL"/>
        <HomeA />
        <HomeB />
        <HomeC />
      </div>
    );
  }
}
export default appHead;
