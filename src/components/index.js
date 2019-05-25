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
    this.props.getAllTasks();
  }

  render() {
    return (
        <div className={s.app}>
          <div className={s.container}>
            <Table className={s.item}/>
            <Charts className={s.item}/>
          </div>
        </div>
      );
  }
}

export default container(App);
