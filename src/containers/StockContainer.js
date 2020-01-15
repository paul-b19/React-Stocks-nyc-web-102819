import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {


  buyStock = (stockId) => {
    this.props.buyStock(stockId)
  }

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.props.allStocks.map((stock, index) => {
            return <Stock key={index} stock={stock} handleClick={this.buyStock}/>
          })
        }
      </div>
    );
  }

}

export default StockContainer;
