/**
 * Created by Benson on 2017/4/6.
 */
import React from 'react';
import ArticleDetailStyle from '../../../styles/ArticleDetail.css';
import {ARTICLEDETAILS} from '../../../InterFace/InterfaceAPI';

class Article extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      title:'',
      content:'',
      id: ''
    }
  }
  componentWillMount(){
    $.get(ARTICLEDETAILS(this.props.cid), function(result) {
      this.setState({
        title:result.title,
        content: result.content,
        id: result.id
      })
    }.bind(this))
  }
  createMarkup() { return {__html: this.state.content}; };
  render(){
    return(
      <div>
        <h3 className={ArticleDetailStyle.title}>{this.state.title}</h3>
        <div className={ArticleDetailStyle.detail} dangerouslySetInnerHTML={this.createMarkup()}></div>
      </div>
    )
  }
}
export default Article;
