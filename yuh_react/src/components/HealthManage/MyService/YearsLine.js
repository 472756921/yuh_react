/**
 * Created by Benson on 2017/4/1.
 */
import React from 'react';
import YearLineStyle from '../../../styles/YearLine.css';

class YearsLine extends React.Component{
  constructor(props) {
    super(props);
    let years = this.props.years;
    this.changeYear = this.changeYear.bind(this);
    this.state={
      active:years[0]
    }
  }

  changeYear(year){
    this.setState({
      active:year
    })
    document.getElementById(year).scrollIntoView()
  }

  render(){
    let ye = this.props.years.map((year,i)=>{
      if(year==this.state.active){
        return (
          <li key={i}>{year}年 <span className={[YearLineStyle.years_flag, YearLineStyle.years_flag_active].join(" ")}></span></li>
        )
      }else{
        return (<li key={i} onClick={()=>this.changeYear(year)}>{year}年<span className={[YearLineStyle.circle ,YearLineStyle.years_flag].join(" ")}></span></li>)
      }
    })
    if(ye==''){
      ye= <li>暂无<span className={[YearLineStyle.years_flag, YearLineStyle.years_flag_active].join(" ")}></span></li>
    }
    return (
      <ul className={YearLineStyle.years}>
        {ye}
      </ul>
    )
  }
}

export default YearsLine;
