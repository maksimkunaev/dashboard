import React, { Component } from "react";
import s from "./index.styl";
import Table from "./Table";
import Charts from "./Charts";
import container from "./container";
import { bind } from 'decko';
import 'antd/dist/antd.css';
import moment from 'moment';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

class App extends Component {
  componentDidMount() {
    this.getInitialRemote();
  }

  @bind
  getInitialRemote() {
    this.props.getData();
    this.props.getChartsData();
  }

  @bind
  onChange(dates, dateStrings) {
      console.log(dateStrings)
  }

  render() {
    const { data: { table, charts }, currentConfig } = this.props;
    const dateFormat = 'YYYY-MM-DD';
    return (
        <div className={s.app}>

          <div className={s.container}>
            <Table className={s.item} data={table} config={currentConfig} />
            <Charts className={s.item} data={charts} config={currentConfig} />
          </div>

          <RangePicker
            defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
            format={dateFormat}
            onChange={this.onChange}
          />
        </div>
      );
  }
}

export default container(App);
