import React from 'react'
import { List } from 'components/List'
import data from 'local-data'
import {DataProcessor} from 'data/processor'
// import logo from './logo.svg';
import './App.css'

const dataProcessor = new DataProcessor()
const localData = dataProcessor.AddRating(data)

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      isOnlineAvailable: false,
      isStoreAvailable: false,
      sortValue: 1,
      data: localData,
      filterData: localData,
    }
  }

  changeOnlineAvailability = (event) => {
    const shouldFilterOnline = event.target.checked
    const shouldFilterStore = this.state.isStoreAvailable

    let filteredProducts = [...this.state.data.products]

    if (shouldFilterOnline) {
      filteredProducts = filteredProducts.filter(product => {
        return product.onlineAvailability
      })
    }

    if (shouldFilterStore) {
      filteredProducts = filteredProducts.filter(product => {
        return product.inStoreAvailability
      })
    }

    const sortValue = this.state.sortValue

    if (sortValue === 1) {
      // no op
    } else if (sortValue === 2) {
      filteredProducts = filteredProducts.sort((a, b) => {
        return b.salePrice - a.salePrice
      })
    } else if (sortValue === 3) {
      filteredProducts = filteredProducts.sort((a, b) => {
        return a.salePrice - b.salePrice
      })
    }

    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked,
      filterData: {
        ...this.state.data,
        products: filteredProducts
      }
    })
  }

  changeStoreAvailability = (event) => {
    const shouldFilterOnline = this.state.isOnlineAvailable
    const shouldFilterStore = event.target.checked

    let filteredProducts = [...this.state.data.products]

    if (shouldFilterOnline) {
      filteredProducts = filteredProducts.filter(product => {
        return product.onlineAvailability
      })
    }

    if (shouldFilterStore) {
      filteredProducts = filteredProducts.filter(product => {
        return product.inStoreAvailability
      })
    }

    const sortValue = this.state.sortValue

    if (sortValue === 1) {
      // no op
    } else if (sortValue === 2) {
      filteredProducts = filteredProducts.sort((a, b) => {
        return b.salePrice - a.salePrice
      })
    } else if (sortValue === 3) {
      filteredProducts = filteredProducts.sort((a, b) => {
        return a.salePrice - b.salePrice
      })
    }

    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked,
      filterData: {
        ...this.state.data,
        products: filteredProducts
      }
    })
  }

  changeSort = (event) => {
    const shouldFilterOnline = this.state.isOnlineAvailable
    const shouldFilterStore = this.state.isStoreAvailable
  
    let filteredProducts = [...this.state.data.products]

    if (shouldFilterOnline) {
      filteredProducts = filteredProducts.filter(product => {
        return product.onlineAvailability
      })
    }

    if (shouldFilterStore) {
      filteredProducts = filteredProducts.filter(product => {
        return product.inStoreAvailability
      })
    }

    const sortValue = event.target.value

    if (sortValue === 1) {
      // no op
    } else if (sortValue === 2) {
      filteredProducts = filteredProducts.sort((a, b) => {
        return b.salePrice - a.salePrice
      })
    } else if (sortValue === 3) {
      filteredProducts = filteredProducts.sort((a, b) => {
        return a.salePrice - b.salePrice
      })
    }

    this.setState({
      ...this.state,
      [event.target.name]: sortValue,
      filterData: {
        ...this.state.data,
        products: filteredProducts
      }
    })
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
          data={this.state.filterData}
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
