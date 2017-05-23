/**
 * Created by Benson on 2017/4/12.
 */
import React from 'react';
import AppHead from '../Head/HeadMain';
import { hashHistory } from 'react-router';

class ConsultingMain extends React.Component {
  componentDidMount(){
    document.getElementById('top').scrollIntoView()
  }

  render() {
    return(
      <div>
        <AppHead type="ALL" img={hashHistory.getCurrentLocation().pathname.split('/')[2]} />
        {this.props.children}
      </div>
    )
  }
}

export default ConsultingMain;
