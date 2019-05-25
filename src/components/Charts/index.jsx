import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import cn from 'classnames';
import styles from './Charts.styl';

export default class Charts extends PureComponent {
  render() {
    const { data } = this.props;
    const { indicator } = this.props.config;


    const chartData = data && data.analytics && data.analytics[indicator];

    const formatData = chartData && chartData.map(value => {
      const date = new Date(value[0]);

      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      };

      const formatDate = date.toLocaleString("ru", options);

      return {
        name: formatDate, pv: value[1],
      }
    }) || []

    //TODO remove code from component

    return (
      <div className={cn(styles.charts, this.props.className)}>
      <ResponsiveContainer width="100%" height={600}>
          <LineChart data={formatData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis ticks={[500, 1000,1500, 2000]}/>
            <Tooltip />
            <Line type="linear" dataKey="pv" stroke="#00981a" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    );
  }
}