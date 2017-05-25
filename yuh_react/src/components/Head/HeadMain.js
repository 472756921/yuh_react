/**
 * Created by Benson on 2017/3/30.
 */
import React from 'react';
import HeadA from './Head_A';
import HeadB from './Head_B';
import HeadC from './Head_C';

class appHead extends React.Component {
  render() {
    if(this.props.type=="ALL"){
      return (
        <div>
          <HeadA />
          <HeadB />
          <HeadC img={this.props.img}/>
        </div>
      );
    }else if(this.props.type=='TOP'){
      return (
        <div>
          <HeadA />
          <HeadB />
        </div>
      )
    }
  }
}
export default appHead;
