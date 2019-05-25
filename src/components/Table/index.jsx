import React, { PureComponent } from 'react';
import { Table as AntTable, Popover } from 'antd';
import cn from 'classnames';
import styles from './Table.styl';

const dataSource = [
  {
    source: 'YandexDirekt',
    total: 2600,
    diff: 100,
    key: 'YandexDirekt'
  },
  {
    key: 'Google AdWords',
    source: 'Google AdWords',
    total: 2550,
    diff: 80,
  },
];

const columns = [
  {
    title: 'Все источники в среднем',
    dataIndex: 'source',
    key: 'source',
  },
  {
    title: '',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: '',
    dataIndex: 'diff',
    key: 'diff',
    render: (text, record) =>
      <Popover content={text} key>
        {text}
      </Popover>
  },
];


export default class Table extends PureComponent {
  render() {
    return (
      <div className={cn(styles.table, this.props.className)}>
        <AntTable dataSource={dataSource} columns={columns} pagination={false}/>
      </div>
    );
  }
}