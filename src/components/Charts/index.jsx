import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import cn from 'classnames';
import styles from './Charts.styl';

const data = [
  {
    name: '12 aug 2019', pv: 0, amt: 1000,
  },
  {
    name: '12 aug 2019', pv: 3000, amt: 1000,
  },
  {
    name: '12 aug 2019', pv: 2000, amt: 1000,
  },
  {
    name: '12 aug 2019', pv: 2780, amt: 1000,
  },
  {
    name: '12 aug 2019', pv: 1890, amt: 1000,
  },
  {
    name: '12 aug 2019', pv: 2390, amt: 1000,
  },
  {
    name: '12 aug 2019', pv: 3490, amt: 1000,
  },
];

export default class Charts extends PureComponent {
  render() {
    return (
      <div className={cn(styles.charts, this.props.className)}>
      <ResponsiveContainer width="100%" height={600}>
          <LineChart data={data}>
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