import React from 'react';
import OrderBook from '../../Utils/OrderBook'
import {AreaChart} from 'recharts';
export interface OrderBookChartProps {
  book:OrderBook;
}


export default ({}:OrderBookChartProps)=>{


  return (
    <div>
      <AreaChart></AreaChart>
    </div>
  )
}