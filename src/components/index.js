import React, { Component } from "react";
import s from "./index.styl";
import Table from "./Table";
import Charts from "./Charts";
import container from "./container";
import { bind } from 'decko';
import 'antd/dist/antd.css';

class App extends Component {
  componentDidMount() {
    this.getInitialRemote();
  }

  @bind
  getInitialRemote() {
    this.props.getData();
  }

  render() {
    const { data: { table, charts }, currentConfig } = this.props;
    return (
        <div className={s.app}>
          <div className={s.container}>
            <Table className={s.item} data={table} config={currentConfig}/>
            <Charts className={s.item}/>
          </div>
        </div>
      );
  }
}

export default container(App);
