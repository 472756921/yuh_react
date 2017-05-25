/**
 * Created by Benson on 2017/3/30.
 */
import React from 'react';
import HomeStyle from '../../styles/home.css';
import List from './List';
import {ARTICLE} from '../../InterFace/InterfaceAPI';
import Page from '../Page/Page';

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      lists:[],
      pageNow:1,
    };
  };
  getTypeAPI(position,type,pageNow){
    if(position=='index'){
      if(type=='newArticle'){
        return ARTICLE(1,pageNow,10);
      }
      if(type=='doctorSuggest'){
        return ARTICLE(0,pageNow,10);
      }
    }
    if(position=='dati'){
      if(type=='newArticle'){
        return ARTICLE(1,pageNow,10);
      }
      if(type=='doctorSuggest'){
        return ARTICLE(0,pageNow,10);
      }
    }
  }
  componentWillMount(){
    let position = this.props.position;
    let type = this.props.type;
    let api;
    if(position=='index'){
      if(type=='newArticle'){
        api = ARTICLE(1,1,10);
      }
      if(type=='doctorSuggest'){
        api = ARTICLE(0,1,10);
      }
    }
    if(position=='dati'){
      if(type=='newArticle'){
        api = ARTICLE(1,1,10);
      }
      if(type=='doctorSuggest'){
        api = ARTICLE(0,1,10);
      }
    }
    $.get(api, function(result) {
      this.setState({
        lists:result.results,
        pages:result.pages,
        total:result.total
      })
    }.bind(this))
  };



  pageChange(pageNow){
    $.get(this.getTypeAPI(this.props.position,this.props.type,pageNow), function(result) {
      this.setState({
        pageNow:pageNow,
        lists:result.results,
        pages:result.pages,
        total:result.total
      })
    }.bind(this))
  }

  render() {
    let page = {pageNum:this.state.pages,total:this.state.total,pageNow:this.state.pageNow};
    return(
      <ul>
        {
          this.state.lists.map((list)=>(
            <List key={list.id} {...list} />
          ))
        }
        {this.state.pages!=undefined&&this.props.position!='index'?<Page data={page}  pageChange={(pageNow)=>this.pageChange(pageNow)}/>:''}
      </ul>
    )
  }
}

export default Lists;
