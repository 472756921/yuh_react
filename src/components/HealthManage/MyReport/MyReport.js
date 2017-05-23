/**
 * Created by Benson on 2017/4/5.
 */
import React from 'react';
import ReportCircle from './ReportCircle';
import ReactTable from './ReportTable';
import ReportCircleStyle from '../../../styles/myReport.css';

class MyReport extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div>
        <ReportCircle />
        <div className={ReportCircleStyle.report_B}></div>
        <ReactTable />
      </div>
    )
  }
}

export default MyReport;
