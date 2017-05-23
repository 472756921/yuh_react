/**
 * Created by Benson on 2017/3/31.
 */
import React from 'react';
import AppHead from '../Head/HeadMain';
import ArticleStyle from '../../styles/Aritcle.css';
import Lists from '../ArticleList/Lists';

class ArticleContent extends React.Component{
  constructor(props) {
    super(props);
    let t='最新文章';
    if(this.props.params.type=='doctorSuggest'){
      t= '主治医生观点';
    }
    this.state={
      title:t,
      types:this.props.params.type,
      menus:[{title:'最新文章',img:require('images/ICON/news_grey.png'),imgA:require('images/ICON/news_red.png'),types:'newArticle'},
        {title:'主治医生观点',img:require('images/ICON/doctor_grey.png'),imgA:require('images/ICON/doctor_red.png'),types:'doctorSuggest'}]
    };
  };
  componentDidMount(){
    document.getElementById('top').scrollIntoView()
  }

  changeTitle(title,type) {
    this.setState({
      title:title,
      types:type,
    })
  }

  render(){
    return (
      <div>
        <AppHead type="TOP"/>
        <div  className={ArticleStyle.box}>
          <div className={ArticleStyle.content}>
            <div className={ArticleStyle.menu}>
              <h3>健康资讯</h3>
              <ul>
                {
                  this.state.menus.map((menu,i)=>{
                    if(menu.title== this.state.title){
                      return (
                        <li className={ArticleStyle.active} key={i}><img src={menu.imgA} /> {menu.title}</li>
                      )
                    }else{
                      return(<li onClick={()=>this.changeTitle(menu.title,menu.types)} key={i}><img src={menu.img} /> {menu.title}</li>)
                    }
                  })
                }
              </ul>
            </div>
            <div className={ArticleStyle.dati}>
              <h3>{this.state.title}</h3>
              {
                this.state.menus.map((menu,i)=>{
                  if(menu.title== this.state.title){
                    return (
                      <Lists position='dati' key={i} type={menu.types}/>
                    )
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleContent;
