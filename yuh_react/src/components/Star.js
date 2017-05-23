/**
 * Created by Benson on 2017/4/17.
 */
import React from 'react';
import StarStyle from '../styles/Star.css';

class Star extends React.Component{

  render(){
    let star = [];
    let starinf =  Math.floor(this.props.star);

    for(let i= 1;i<=5;i++){
      if(i<=starinf){
        star.push(<div key={i} className={StarStyle.starActive}></div>)
      }else{
        star.push(<div key={i} className={StarStyle.star}></div>)
      }
    }

    return(
      <div className={StarStyle.content}>
        {star}
      </div>
      )
  }
}
export default Star;
