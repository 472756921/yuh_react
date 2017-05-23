import React from 'react';

export default class InputFieldOverlay extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      value:'123'
    }
  }
  componentDidMount(){
    $("#flatpickr_tryme").flatpickr();
  }

  render() {
    return (
      <div style={{width: '350px',float:'left'}}>
        <span style={{color: "#666"}}>{this.props.title} : </span>
        <input id="flatpickr_tryme" ref="in" data-max-date="today"/>
        <span className='glyphicon glyphicon-calendar' style={{marginLeft:'-24px',fontSize:'16px'}}></span>
      </div>
    );
  }
}
