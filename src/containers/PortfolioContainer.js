import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  sellStock = stockId => {
    console.log('portfolio', stockId)
    this.props.sellStock(stockId)
  }

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.props.selectedStocks.map((stock, index) => {
              return <Stock key={index} stock={stock} handleClick={this.sellStock}/>
            })
          }
      </div>
    );
  }

}

export default PortfolioContainer;
