/**
 * Created by Benson on 2017/5/9.
 */
import React from 'react';
import SelectInputStyle from '../../styles/SelectInputStyle.css'

class SelectInput extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      data:this.props.data,
      dataFind:this.props.data,
      yaowuName: '',
    }
  }
  clear() {
    this.setState({
      ...this.state,
      dataFind:this.state.data,
    })
    this.refs.serch.value = '';
  }
  serch(){
    this.refs.list.style.display='block';
  }
  blur(){
    if(this.state.dataFind.length==1){
      if(this.state.dataFind[0].name=='没有结果'){
        this.refs.serch.value='';
        this.setState({
          ...this.state,
          dataFind:this.state.data,
        })
      }
    }
    setTimeout(()=>{this.refs.list.style.display='none'},200)
  }
  change(){
    let val=this.refs.serch.value;
    let list = [];
    this.state.data.map((o,i)=>{
      let name = o.name;
      if(name.indexOf(val)!=-1){
        list.push(o);
      }
    })
    if(list.length==0){
      list.push({id:0,name:'没有结果'})
    }
    this.setState({
      ...this.state,
      dataFind:list,
    })
  }

  checks(id,value,type){
    if(value=='没有结果'){
      return
    }
    this.refs.serch.value=value;
    this.props.check(this.props.type,value,id)
  }

  overName(value){
    this.setState({
      ...this.state,
      dataFind:value,
    })
  }

  render(){
    return (
      <div className={SelectInputStyle.content}>
        <ul className={SelectInputStyle.uls}>
          <li>
            <input type="text" className={SelectInputStyle.inputs} ref="serch" onBlur={()=>this.blur()} onChange={()=>this.change()} onFocus={()=>this.serch()}/>
            <ul className={SelectInputStyle.uls2} ref="list">
              {this.state.dataFind.map((o,i)=>{
                return (
                  <li onClick={()=>this.checks(o.id,o.name,'mid')} key={i}>{o.name}</li>
                )
              })}
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default SelectInput;
