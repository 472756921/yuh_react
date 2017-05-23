/**
 * Created by Benson on 2017/4/5.
 */
import React from 'react';
import TimeLineStyle from '../../../styles/tiemLineStyles.css';


class ServiceContent extends React.Component{
  createMarkup(con) { return {__html: con}; };
  render(){
    if(this.props.position=='next'){
      return (
        <li>
          <div className={TimeLineStyle.tl_circNew}></div>
          <div className={TimeLineStyle.timeline_panel_new}>
            <div className={TimeLineStyle.tl_heading}>
              <h5 dangerouslySetInnerHTML={this.createMarkup(this.props.content)}></h5>
              <p>
                <small className={TimeLineStyle.text_muted}>
                  <i className='TimeLineStyle.glyphicon TimeLineStyle.glyphicon-time'></i>
                  {this.props.date}
                </small>
              </p>
            </div>
          </div>
        </li>
      )
    }else{
      return(
        <li className={(this.props.position=='left')?TimeLineStyle.timeline_inverted:''}>
          <div className={TimeLineStyle.tl_circ}></div>
          <div className={TimeLineStyle.timeline_panel}>
            <div className={TimeLineStyle.tl_heading}>
              <h5 dangerouslySetInnerHTML={this.createMarkup(this.props.content)}></h5>
              <p>
                <small className={TimeLineStyle.text_muted}>
                  <i className='TimeLineStyle.glyphicon TimeLineStyle.glyphicon-time'></i>
                  {this.props.date}
                </small>
              </p>
            </div>
          </div>
        </li>
      )
    }
  }
}
export default ServiceContent;
