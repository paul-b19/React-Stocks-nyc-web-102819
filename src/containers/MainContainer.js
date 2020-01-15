import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    allStocks: [],
    selectedStocks: [],
    filterKey: 'no filter',  // 'no filter', 'Tech', 'Sportswear', 'Finance'
    selectedSort: ''  // 'Alphabetically', 'Price'
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
      .then(resp => resp.json())
      .then(data => {
        this.setState({ allStocks: data })
      })
  }

  buyStock = (stockId) => {
    let stock = this.state.allStocks.find(st => st.id === stockId)
    let tempStArr = [...this.state.selectedStocks, stock]
    this.setState({
      selectedStocks: tempStArr                
    })
  }

  sellStock = (stockId) => {
    let tempStArr = [...this.state.selectedStocks].filter(st => st.id !== stockId)
    this.setState({
      selectedStocks: tempStArr                
    })
  }

  handleFilter = e => {
    this.setState({
      filterKey: e.target.value
    })
  }

  handleSort = e => {
    this.setState({
      selectedSort: e.target.value
    })
    let sortedStocks
    if (e.target.value === 'Alphabetically') {
      sortedStocks = [...this.state.allStocks].sort((a, b) => a.name.localeCompare(b.name))

    } else {
      sortedStocks = [...this.state.allStocks].sort((a, b) => b.price - a.price)
    }
    this.setState({
      allStocks: sortedStocks
    })

  }

  render() {

    let filteredStocks
    if (this.state.filterKey === 'no filter') {
      filteredStocks = this.state.allStocks
    } else {
      filteredStocks = [...this.state.allStocks].filter(stock => stock.type === this.state.filterKey)
    }
    
    return (
      <div>
        <SearchBar handleFilter={this.handleFilter} handleSort={this.handleSort}
                   selected={this.state.selectedSort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer allStocks={filteredStocks} buyStock={this.buyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer selectedStocks={this.state.selectedStocks} sellStock={this.sellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
