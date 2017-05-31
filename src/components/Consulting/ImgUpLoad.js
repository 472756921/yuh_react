/**
 * Created by Benson on 2017/4/13.
 */
import React from 'react';
import ImgUpLoadStyle from '../../styles/ImgUpLoad.css';

class ImgUpLoad extends React.Component{
  constructor(props){
    super(props);
    this.state={
      img:[],
      medicalTxt: null
    }
    this.getData = this.getData.bind(this);

  }

  upload(po){
    let file = this.refs.uploadImg.files[0];
    if (!/image\/\w+/.test(file.type)) {
      alert("只能选择图片");
      return false;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      this.setState({
        img: [...this.state.img,{binary:e.target.result.split(',')[1]}]
      })
    }.bind(this);
  };

  del(i){
    let img = this.state.img;
    img.splice(i,1);
    this.setState({
      img: img
    })
  }

  enterText(){
    let medicalTxt = this.refs.medicalTxt;
    this.setState({
      ...this.state,
      medicalTxt: medicalTxt.value
    })
  }

  tis(){
    let medicalTxt = this.refs.medicalTxt;
    medicalTxt.style.display = 'block';
  }

  getData(){
    return this.state
  }

  clear(){
    if(this.props.title=='上传药文本或图片'){
      this.refs.medicalTxt.value = '';
    }
    this.setState({
      img: '',
    })
  }

  render(){
    let img='';
    if(this.state.img.length>0){
      img = this.state.img.map((o,i)=>(
        <div key={i} className={ImgUpLoadStyle.imgGroup}>
          <span className="glyphicon glyphicon-remove" onClick={()=>this.del(i)}></span>
          <img src={'data:image/jpeg;base64,'+o.binary}/>
        </div>
      ))
    }
    $(function () {
      $('[data-toggle="popover"]').popover()
    })


    let plcon;
    if(this.props.title=='上传药文本或图片'){
      plcon = <div><div onClick={()=>this.tis()} className='text-right' style={{color:'red',cursor:'pointer'}}>没有图片?点击添加文字描述</div><textarea onChange={()=>this.enterText()} ref="medicalTxt" style={{resize:'none',width:'100%',border:'1px solid #e3e3e3',display:'none'}}></textarea></div>;
    }
    return (
      <div className={ImgUpLoadStyle.content}>
        <div className={ImgUpLoadStyle.titleContent}>
          <span>{this.props.title}：
            <img role="button" data-trigger="focus"  tabIndex="0" src={require('images/ICON/question.png')} data-container="body" data-toggle="popover" data-placement="top" data-content={this.props.title=='上传已做的检查项目'?'包括测血糖、抽血、拍片、心电图、B超或其他检查，也包括接诊医生在病历本上书写的文字':'可以是处方拍照，或拿到药物后拍照'}/>
          </span>
          <button className={ImgUpLoadStyle.btn}>上传图片</button>
          <input type="file" className={ImgUpLoadStyle.file} ref="uploadImg"  onChange={()=>this.upload()}/>
        </div>
        {plcon}
        <div className={ImgUpLoadStyle.imgContent}>
          {img}
        </div>
      </div>
    )
  }
}

export default ImgUpLoad;
