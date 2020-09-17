import React from 'react'
import { List } from 'components/List'
import data from 'local-data'
import {DataProcessor} from 'data/processor'
// import logo from './logo.svg';
import './App.css'

const dataProcessor = new DataProcessor()
const localData = dataProcessor.AddRating(data)

class App extends React.Component {
  state = {
    isOnlineAvailable: false,
    isStoreAvailable: false,
    sortValue: 1,
    data: localData
  }

  changeOnlineAvailability = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    })
  }

  changeStoreAvailability = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    })
  }

  changeSort = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  processData = (data) => {
    const clonedData = {
      ...data,
      products: [...data.products] || []
    }

    clonedData.products = this.filterByAvailability(clonedData.products)
    clonedData.products = this.sortByPrice(clonedData.products)

    return clonedData
  }

  filterByAvailability (items) {
    const shouldFilterOnline = this.state.isOnlineAvailable
    const shouldFilterStore = this.state.isStoreAvailable

    let filteredItems = items

    if (shouldFilterOnline) {
      filteredItems = items.filter(product => {
        return product.onlineAvailability
      })
    }

    if (shouldFilterStore) {
      filteredItems = filteredItems.filter(product => {
        return product.inStoreAvailability
      })
    }

    return filteredItems
  }

  sortByPrice = (items) => {
    const sortValue = this.state.sortValue
  
    if (sortValue === 1) {
      return items
    } else if (sortValue === 2) {
      return items.sort((a, b) => {
        return b.salePrice - a.salePrice
      })
    } else if (sortValue === 3) {
      return items.sort((a, b) => {
        return a.salePrice - b.salePrice
      })
    }
  }

  render () {
    return (
      <div 
        style={{
          display: 'flex',
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* <div className='facet-container'>facet</div> */}
        <List 
          data={this.processData(this.state.data)}
          isOnlineAvailable={this.props.isOnlineAvailable}
          isStoreAvailable={this.props.isStoreAvailable}
          sortValue={this.state.sortValue}

          changeOnlineAvailability={this.changeOnlineAvailability}
          changeStoreAvailability={this.changeStoreAvailability}
          changeSort={this.changeSort}
        />
      </div>
    )
  }
}

export default App;
