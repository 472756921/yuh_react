/**
 * Created by Benson on 2017/4/13.
 */
import React from 'react';
import {ASKDOCDatile,ASKDOCcommentPost,buchongtijiao} from '../../../InterFace/InterfaceAPI';
import ASKDOCDatileStyle from '../../../styles/ASKDOCDatile.css';
import StarabilityStyle from '../../../styles/starabilityGrowRotate.min.css';
import ImgUpLoad from '../../Consulting/ImgUpLoad';

class ASKDOC extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      data:''
    }
  };
  componentWillMount(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.get(ASKDOCDatile(this.props.id,user.authToken),(rs)=>{
      this.setState({
        data: rs
      })
    })
  };

  postComments(){
    let text = this.refs.Comment.value;
    let star = $('input:radio:checked').val();
    let id = this.state.data.id

    let json = {comment:text,star:star};

    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    $.post(ASKDOCcommentPost(id,user.authToken),JSON.stringify(json),()=>{
      $('#myModal').modal('hide')
    })
  }

  buchong(){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    let id = this.state.data.id;
    let img = this.refs.img.getData();
    console.log(img);
    let json = {
      addReports:img.img,
      addTxt:img.medicalTxt,
    };
    $.post(buchongtijiao(id,user.authToken),JSON.stringify(json),()=>{
      alert('提交成功');
      this.setState({
        ...this.state,
        data:{
          status:1
        }
      })
    });
  }

  render(){
    let checkImg=<p>暂无数据</p>;
    let medicalPicsImg=<p>暂无数据</p>;
    let mannerment=<p>暂无意见</p>;
    let expertAdvice=<p>暂无意见</p>;
    let medicalTxt = '';
    let addReports = '暂无';

    if (this.state.data != '') {
      if (this.state.data.assistantAdvice.advice != undefined) {
        mannerment = <div className={ASKDOCDatileStyle.charGroup}>
          <img src={this.state.data.assistantAdvice.icon} height="85" width="85"/>
          <div className={ASKDOCDatileStyle.chatPo}>
            <div className={ASKDOCDatileStyle.name}><span>{this.state.data.assistantAdvice.realName}</span>
              <small>{this.state.data.assistantAdvice.advice.split('<br/>')[0]}</small>
            </div>
            <div className={ASKDOCDatileStyle.po}>{this.state.data.assistantAdvice.advice.split('<br/>')[1]}</div>
          </div>
        </div>
      }

      if(this.state.data.addReports != undefined) {
        addReports = this.state.data.addReports.map((o, i)=> {
          let img = o.addReports.map((j,h)=>{
            return (<img key={h} src={j.url} width="200"  data-toggle="modal" data-target="#myModal2" onClick="" data-img={j.url}/>)
          })
          return (
            <div key={i}>
              <div>补充时间：{o.addTime}</div>
              <div>病情描述：{o.addTxt}</div>
              <div>{img}</div>
              <br/>
            </div>
          )
        })
      }

      if(this.state.data.medicalTxt!=undefined){
        medicalTxt = <div>{this.state.data.medicalTxt}</div>;
      }
      if (this.state.data.expertAdvice != undefined) {
        if(this.state.data.expertAdvice.advice != undefined || this.state.data.expertAdvice.addReportAdvice != undefined){
          expertAdvice = <div className={ASKDOCDatileStyle.charGroup}>
            <img src={this.state.data.expertAdvice.icon} height="85" width="85"/>
            <div className={ASKDOCDatileStyle.chatPo}>
              <div className={ASKDOCDatileStyle.name}><span>{this.state.data.expertAdvice.realName}</span>
                <small>{this.state.data.expertAdvice.addReportAdvice != undefined?this.state.data.expertAdvice.addReportAdvice.split('<br/>')[0]:this.state.data.expertAdvice.advice.split('<br/>')[0]}</small>
              </div>
              <div className={ASKDOCDatileStyle.po}>{this.state.data.expertAdvice.addReportAdvice != undefined?this.state.data.expertAdvice.addReportAdvice.split('<br/>')[1]:this.state.data.expertAdvice.advice.split('<br/>')[1]}</div>
            </div>
          </div>
        }else{
          expertAdvice = <p>医生正在处理</p>
        }
      }

      try {
        checkImg = this.state.data.checkItems.map((o, i)=>(
          <img key={i} src={o.url} style={{border:'1px solid #e3e3e3',marginRight:'10px'}} width="100" height="100" data-toggle="modal" data-target="#myModal2" onClick="" data-img={o.url}/>
        ))
        medicalPicsImg = this.state.data.medicalPics.map((o, i)=>(
          <img key={i} src={o.url} style={{border:'1px solid #e3e3e3',marginRight:'10px'}} width="100" height="100" data-toggle="modal" data-target="#myModal2" onClick="" data-img={o.url}/>
        ))
      }catch(err) {}
    }
    $('#myModal2').on('show.bs.modal', function (e) {
      let btn = $(e.relatedTarget)
      $("#modalImg").attr('src',btn[0].src);
    })

    return (
      <div className={ASKDOCDatileStyle.content}>
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">详情</h4>
              </div>
              <div className="modal-body" style={{textAlign:'center'}}>
                <div className={StarabilityStyle.starability_growRotate}>
                  <div style={{textAlign:'left'}}>评价星级：</div>
                  <input type="radio" id="rate5-4" name="rating" value="5" />
                  <label htmlFor="rate5-4" title="Amazing">5 stars</label>
                  <input type="radio" id="rate4-4" name="rating" value="4" />
                  <label htmlFor="rate4-4" title="Very good">4 stars</label>
                  <input type="radio" id="rate3-4" name="rating" value="3" />
                  <label htmlFor="rate3-4" title="Average">3 stars</label>
                  <input type="radio" id="rate2-4" name="rating" value="2" />
                  <label htmlFor="rate2-4" title="Not good">2 stars</label>
                  <input type="radio" id="rate1-4" name="rating" value="1" />
                  <label htmlFor="rate1-4" title="Terrible">1 star</label>
                </div>
                <textarea style={{resize:'none',width:'100%'}} rows="5" maxLength="250" ref="Comment"></textarea>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" style={{background:'#000066'}} onClick={()=>this.postComments()}>评价</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="myModal2" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">详情</h4>
              </div>
              <div className="modal-body" style={{textAlign:'center'}}>
                <img src="" id="modalImg"/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
              </div>
            </div>
          </div>
        </div>

        <div className={ASKDOCDatileStyle.head}>
          <img src={this.state.data!=''?this.state.data.group.logo:''} style={{border:'1px solid #e3e3e3'}} width="140" height="140"/>
          <div className={ASKDOCDatileStyle.group}>
            <h3>{this.state.data!=''?this.state.data.group.name:''} </h3>
            <div>{this.state.data!=''?this.state.data.group.info:''}</div>
          </div>
        </div>

        <div className={ASKDOCDatileStyle.clear}></div>

        <h4 className={ASKDOCDatileStyle.title}><span></span>我的资料</h4>
        <div className={ASKDOCDatileStyle.context}>
          <h5 className={ASKDOCDatileStyle.title2}>病情简述：</h5>
          <p>{this.state.data!=''?this.state.data.desc:''}</p>
          <h5 className={ASKDOCDatileStyle.title2}>已做的检查项目：</h5>
          {checkImg}
          <h5 className={ASKDOCDatileStyle.title2}>药物文本或图片：</h5>
          {medicalPicsImg}
          {medicalTxt}
          <h5 className={ASKDOCDatileStyle.title2}>希望医生提供的帮助：</h5>
          <p>{this.state.data!=''?this.state.data.help:''}</p>
        </div>

        <h4>补充资料</h4>
        <div className={ASKDOCDatileStyle.context}>
          {addReports}
        </div>

        <h4 className={ASKDOCDatileStyle.title}><span></span>健康管理师意见</h4>
        {mannerment}
        <h4 className={ASKDOCDatileStyle.title}><span></span>主管医生意见</h4>
        <h5>
          {this.state.data.processType != undefined?this.state.data.processType == 3?'医生处理意见：线上随访，时间：'+this.state.data.expertAdvice.checkDate:'':''}
          {this.state.data.processType != undefined?this.state.data.processType == 2?'医生处理意见：线下随访，时间：'+this.state.data.expertAdvice.checkDate:'':''}
          {this.state.data.processType != undefined?this.state.data.processType == 1?'处理结果：直接处理':'':''}
        </h5>
        {expertAdvice}


        <div>
          {this.state.data.status==2? <ImgUpLoad  title="补充病情描述" ref="img" />:''}
        </div>

        <div className={ASKDOCDatileStyle.btnGroup}>
          {this.state.data.status==4&&!this.state.data.isCommented?<button className={ASKDOCDatileStyle.btn} data-toggle="modal" data-target="#myModal">评价</button>:''}
          {this.state.data.status==2?<button className={ASKDOCDatileStyle.btn} onClick={()=>this.buchong()}>补充提交</button>:''}
          <button className={ASKDOCDatileStyle.btn_back} onClick={()=>{window.history.back()}}>返回</button>
        </div>
      </div>
    )
  }
}

export default ASKDOC;
