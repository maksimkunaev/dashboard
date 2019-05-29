import React, { PureComponent } from 'react';
import { Table as AntTable, Popover } from 'antd';
import cn from 'classnames';
import styles from './Table.styl';

export default class Table extends PureComponent {
  columns = [
    {
      title: 'Все источники в среднем',
      dataIndex: 'utm_sourcemedium',
      key: 'source',
    },
    {
      title: () => {
        const { total } = this.props.data;
        const time_on_site = total && total.analytics && total.analytics.time_on_site;

        return <div>
          {time_on_site}
        </div>
      },
      dataIndex: '',
      key: '',
      render: text => {
        const { indicator } = this.props.config;
        const value = text.analytics[indicator];

        return <div>
          {value.toString()}
        </div>
      }
    },
    {
      title: () => {
        const { total } = this.props.data;
        const { indicator } = this.props.config;

        const average = total && total.analytics && total.analytics[indicator];

        return <div>
          {average}
        </div>
      },
      dataIndex: '',
      key: '',
      render: text => {
        const { total } = this.props.data;
        const { indicator } = this.props.config;
        const value = text.analytics[indicator];
        const average = total.analytics[indicator];

        const diff = Number(value) - Number(average);
        const diffPercentage = diff * 100/ average;
        const isUp = diff > 0;
        const isDown = diff < 0;

        const width = `${Math.abs(diffPercentage)}%`
        return  <Popover content={diff.toString()}>
          <div className={styles.progress}>
            <div className={styles.wrap}>
              <div className={cn(styles.red, isDown && styles.visible)} style={{width: width}} />
            </div>
            <div className={styles.wrap}>
              <div className={cn(styles.green, isUp && styles.visible)} style={{width: width}} />
            </div>
          </div>
        </Popover>
      }

    },
  ];

  render() {
    const { objects } = this.props.data;
    return (
      <div className={cn(styles.table, this.props.className)}>
        <AntTable size={'small'} dataSource={objects} columns={this.columns} pagination={false} rowKey={(record, index) => {
          return `record.utm_sourcemedium_${index}`
        }}/>
      </div>
    );
  }
}