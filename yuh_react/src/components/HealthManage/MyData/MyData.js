/**
 * Created by Benson on 2017/4/7.
 */
import React from 'react';
import MyDataStyle from '../../../styles/MyData.css';
import {UserData,UserDataImg} from '../../../InterFace/InterfaceAPI';
import UploadData from './UploadData';
import Page from '../../Page/Page';

class MyData extends React.Component{
  constructor(props) {
    super(props);
    let nowDate = new Date();
    let setDate = nowDate - 1000*3600*24*30;
    setDate = new Date(setDate);
    setDate = setDate.getFullYear()+'-'+(setDate.getMonth()+1)+'-'+setDate.getDate()
    nowDate = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()
    this.state={
      setDate:setDate,
      nowDate:nowDate,
      pageNow:1,
      pageNum:1,
      total:1,
      index:'血压',
      tables:[
        {name:'血压',
        arg:['收缩（高）压','舒张（低）压','脉搏']
        },
        {name:'指尖血糖',
        arg:['空腹血糖','餐后2小时血糖','随机血糖']
        },
        {name:'血脂',
        arg:['总胆固醇','甘油三酯','低密度脂蛋白胆固醇','高密度脂蛋白胆固醇']
        },
        {name:'血氧',
        arg:['饱和度','静息心率（脉率）']
        },
        {name:'血尿酸',
        arg:['血尿酸']
        },
        {name:'心电图',
        arg:['心电图图片']
        },
        {name:'检测报告',
        arg:['检测报告图片','检测项目']
        },
        {name:'上传数据',
        arg:['收缩（高）压','舒张（低）压','脉搏']
        }
      ],
      data:[],
      img:"http://iph.href.lu/660x380?text=暂无数据"
    }
  };

  navChange(name){
    this.setState({
      ...this.state,
      index: name,
      data:[],
      img:"http://iph.href.lu/660x380?text=暂无数据",
      pageNum:1,
      total:1,
      pageNow:1,
    })
  };
  componentDidUpdate(){
    $('input[type=radio]:eq(0)').attr('checked','checked');
  }
  componentDidMount(){
    $("#flatpickr_tryme").flatpickr();
    $("#flatpickr_tryme2").flatpickr();

    $('#myModal').on('show.bs.modal', function (e) {
      $("#modalImg").empty();
      let btn = $(e.relatedTarget);
      let src = btn[0].attributes[4].nodeValue;
      src = JSON.parse(src)
      src.map((o,i)=>{
          $("#modalImg").append('<img width="500" src="'+o.url+'" />');
      })
    })

  }

  check(style,page){
    let user = sessionStorage.getItem('userData');
    user = JSON.parse(user);
    let st = this.refs.st.value;
    let et = this.refs.et.value;

    let name;
    let radio = $('input[type=radio]:checked')
    if(radio.length>0){
      name = radio[0].defaultValue;
    }

    if(st==''||et==''){
      alert('请选择查询时间')
      return
    }
    if(st>et){
      alert('开始时间不能大于结束时间')
      return
    }
    if(name==undefined){
      alert('请选择需要查询的项目类型')
      return
    }

    let type = 1;
    switch (name){
      case '收缩（高）压':
        type = 1;
        break;
      case '舒张（低）压':
        type = 2;
        break;
      case '脉搏':
        type = 14;
        break;
      case '空腹血糖':
        type = 5;
        break;
      case '餐后2小时血糖':
        type = 6;
        break;
      case '随机血糖':
        type = 7;
        break;
      case '总胆固醇':
        type = 8;
        break;
      case '甘油三酯':
        type = 9;
        break;
      case '低密度脂蛋白胆固醇':
        type = 10;
        break;
      case '高密度脂蛋白胆固醇':
        type = 11;
        break;
      case '饱和度':
        type = 15;
        break;
      case '静息心率（脉率）':
        type = 13;
        break;
      case '血尿酸':
        type = 12;
        break;
      default:
        type=1;
        break;
    }

    let _style='血压';
    switch (style){
      case '血压':
        _style=1;
        break;
      case '指尖血糖':
        _style=2;
        break;
      case '血脂':
        _style=3;
        break;
      case '血尿酸':
        _style=5;
        break;
      case '血氧':
        _style=4;
        break;
      case '心电图':
        _style=6;
        break;
      case '检测报告':
        _style=7;
        break;
      default:
        _style=1;
        break;
    }

    $.get(UserData(_style,et,st,page,20,user.authToken), function(result) {
      this.setState({
        ...this.state,
        data: result.results,
        total:result.total,
        pageNum:result.pages,
        pageNow:page,
        setDate:st,
        nowDate:et,
      })
    }.bind(this))

    var oReq = new XMLHttpRequest();
    oReq.open("GET", "http://121.42.142.228:8080/app/api/account/health/report?endDate="+et+"&startDate="+st+"&type="+type, true);
    oReq.responseType = "blob";
    oReq.setRequestHeader('authToken',user.authToken)
    oReq.onload = function(oEvent) {
      var reader = new FileReader();
      reader.readAsDataURL(new Blob([oReq.response]));
      reader.onload = function (evt) {
        this.setState({
          ...this.state,
          img:  evt.target.result
        })
      }.bind(this);
    }.bind(this);
    oReq.send();
  };


  render(){
    let tableData =[];
    if(this.state.data.length>0){
      tableData = this.state.data.map((obj,i)=>{
        return (
          <tr key={i}>
            {this.state.index=='心电图'||this.state.index=='检测报告'? '':<td>{obj.morningSystolicPressure}{obj.fastBloodSugar}{obj.bloodFatChol}{obj.spo}{obj.urineAcid}</td>}
            {this.state.index=='血尿酸'||this.state.index=='心电图'||this.state.index=='检测报告'?'': <td>{obj.morningDiastolicPressure}{obj.postPrandilaSugar}{obj.bloodFatTg}{obj.heartRate}</td>}
            {this.state.index=='血氧'||this.state.index=='血尿酸'||this.state.index=='心电图'||this.state.index=='检测报告'?'': <td>{obj.pulseRate}{obj.randomBloodSugar}{obj.bloodFatLdl}</td>}
            {this.state.index=='血脂'?<td>{obj.bloodFatHdl}</td>:''}
            {this.state.index=='心电图'?<td>{obj.ecg!=undefined?<span><img height="70" src={require('images/ICON/heart.jpg')} data-toggle="modal" data-target="#myModal" data={JSON.stringify(obj.ecg)} title="点击查看详情"/> </span>:'暂无图片'}</td>:''}
            {this.state.index=='检测报告'?<td>{obj.images!=undefined?<span><img height="70" src={require('images/ICON/port.png')} data-toggle="modal" data-target="#myModal" data={JSON.stringify(obj.images)} title="点击查看详情"/></span>:'暂无图片'}</td>:''}
            {this.state.index=='检测报告'?<td width="600"><div className={MyDataStyle.hi}>{obj.checkItem}</div></td>:''}
            <td>{obj.checkTime}</td>
            <td>{obj.uploadTime}</td>
          </tr>
        )
      })
    }else{
      tableData=<tr><td colSpan="6" style={{color:'red',fontSize:'20px'}}>暂无数据</td></tr>;
    }

    return(
      <div className={MyDataStyle.content}>
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">图片详情</h4>
              </div>
              <div className="modal-body" style={{textAlign:'center'}} id="modalImg">

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
              </div>
            </div>
          </div>
        </div>

        <ul  className={['nav','nav-tabs',MyDataStyle.report_C_user_line].join(" ")} role="tablist">
          {
            this.state.tables.map((name,i)=>{
              return (
                <li role="presentation" key={i} className={[MyDataStyle.togglable_title,this.state.index==name.name?MyDataStyle.report_togglable_title_active:''].join(' ')}>
                  <a onClick={()=>this.navChange(name.name)} style={{cursor:'pointer'}}>{name.name}</a>
                </li>
              )
            })
          }
        </ul>

        <div className={this.state.index!='上传数据'?'':MyDataStyle.hiddens}>
          <div className="tab-content">
            <div role="tabpanel" className={["tab-pane fade in active",MyDataStyle.userBB].join(' ')}>
              <h3 className={MyDataStyle.title_A}>时间选择</h3>
              <div className={MyDataStyle.txt}>
                <div style={{width: '350px',float:'left'}}>
                  <span style={{color: "#666"}}>开始时间 : </span>
                  <input id="flatpickr_tryme" ref="st" data-max-date="today" value={this.state.setDate} style={{height:'40px',border:'1px solid #e3e3e3'}}/>
                  <span className='glyphicon glyphicon-calendar' style={{marginLeft:'-24px',fontSize:'16px'}}></span>
                </div>
                <div style={{width: '350px',float:'left'}}>
                  <span style={{color: "#666"}}>结束时间 : </span>
                  <input id="flatpickr_tryme2" ref="et" data-max-date="today" value={this.state.nowDate} style={{height:'40px',border:'1px solid #e3e3e3'}}/>
                  <span className='glyphicon glyphicon-calendar' style={{marginLeft:'-24px',fontSize:'16px'}}></span>
                </div>
                <button className={MyDataStyle._btn} onClick={()=>this.check(this.state.index,this.state.pageNow)}>查询</button>
              </div>
            </div>
            <div className={this.state.index=='检测报告'||this.state.index=='心电图'?MyDataStyle.hiddens:''}>
              <h3 className={MyDataStyle.title_A}>健康报告</h3>
              <div className={MyDataStyle.txt}>
                <div style={{width:'160px',float:'left'}}>
                {
                  this.state.tables.map((obj,i)=>{
                    if(obj.name==this.state.index&&obj.arg.length>0){
                      return(
                        obj.arg.map((list,j)=>{
                          return (
                            <div key={j} style={{lineHeight:'30px'}}><input ref='radio' type="radio" name='list' value={list} title={list=='静息心率（脉率）'?'晨起安静状态下心率':''}/> {list}</div>
                          )
                        })
                      )
                    }else{
                      return
                    }
                  })
                }
                </div>
                <img src={this.state.img} />
              </div>
            </div>
            <div style={{clear:'both'}}></div>
            <h3 className={MyDataStyle.title_A}>{this.state.index}数据</h3>
            <table className="table table-striped">
              <tbody>
                <tr>
                  {
                    this.state.tables.map((obj,i)=>{
                      if(obj.name==this.state.index&&obj.arg.length>0){
                        return(
                          obj.arg.map((list,j)=>{
                            return (
                              <td key={j}>{list}{list=='静息心率（脉率）'?'-晨起安静状态':''}</td>
                            )
                          })
                        )
                      }else{
                        return
                      }
                    })
                  }
                  <td>体检时间</td>
                  <td>上传时间</td>
                </tr>
                {tableData}
              </tbody>
            </table>
            <Page data={{pageNum:this.state.pageNum,total:this.state.total,pageNow:this.state.pageNow}} ref="pages" pageChange={(pageNow)=>this.check(this.state.index,pageNow)}/>
          </div>
          <div style={{clear:'both'}}></div>
        </div>
        {this.state.index=='上传数据'?<UploadData />:''}
      </div>
    )
  }
}
export default MyData;
