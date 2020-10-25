import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { List } from 'components/List'
import { Facets } from 'components/Facets'
import data from 'local-data'
import {DataProcessor} from 'data/processor'
// import logo from './logo.svg';
import './App.css'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'

const FILTER_ENUM_KEYS = ['manufacturer', 'condition', 'productAspectRatio']
const dataProcessor = new DataProcessor()
const localData = dataProcessor.AddRating(data)

class App extends React.Component {
  state = {
    isOnlineAvailable: false,
    isStoreAvailable: false,
    sortValue: 1,
    data: localData,
    productFilters: localData.products.reduce((accumulator, current) => {
      FILTER_ENUM_KEYS.forEach(filterKey => {
        const filterValue = current[filterKey]

        if (filterValue) {
          if (!accumulator[filterKey]) accumulator[filterKey] = {}
          if (!accumulator[filterKey][filterValue]) accumulator[filterKey][filterValue] = {
            enabled: false,
            count: 0
          }

          accumulator[filterKey][filterValue].count += 1
        }
      })
      return accumulator
    }, {})
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

  changeFacets = (filterKey, event) => {
    this.setState({
      productFilters: {
        ...this.state.productFilters,
        [filterKey]: {
          ...this.state.productFilters[filterKey],
          [event.target.name]: {
            ...this.state.productFilters[filterKey][event.target.name],
            enabled: event.target.checked
          }
        }
      }
    })
  }

  processData = (data) => {
    console.log('process data called.')
    const clonedData = {
      ...data,
      products: [...data.products] || []
    }

    clonedData.products = this.filterByFacets(clonedData.products)
    clonedData.products = this.filterByAvailability(clonedData.products)
    clonedData.products = this.sortByPrice(clonedData.products)

    return clonedData
  }

  filterByFacets (items) {
    const hasFacets = Object.entries(this.state.productFilters).some(([filterKey, filterValueHash]) => {
      return Object.entries(filterValueHash).some(([filterValue, filterValueEntry]) => {
        return filterValueEntry.enabled
      })
    })

    if (!hasFacets) {
      return items
    }

    return items.filter(item => {
      return Object.entries(this.state.productFilters).every(([filterKey, filterValueHash]) => {
        const filterValueSelected = Object.entries(filterValueHash).some(([filterValue, filterValueEntry]) => {
          return filterValueEntry.enabled
        })

        if (!filterValueSelected) {
          return true
        }

        return Object.entries(filterValueHash).some(([filterValue, filterValueEntry]) => {
          return filterValueEntry.enabled && item[filterKey] === filterValue
        })
      })
    })
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

  clickGithubIcon = () => {
    // window.location.href = "https://github.com/quincyle/e-shop/tree/master/e-shop-ui"
  }

  render () {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
      }}>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" >
                Cocoatale
              </Typography>
              {/* <Button color="inherit">Login</Button> */}
              <IconButton edge="end" color="inherit" aria-label="menu"
                onClick={this.clickGithubIcon}
              >
                <GitHubIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
        <div style={{margin: '20px 0', padding: '20px 0', fontSize: '22px', fontWeight: '400'}}>Gaming Monitors</div>
        <div style={{
          display: 'flex',
        }}>
          <Facets 
            filters={this.state.productFilters}
            data={this.processData(this.state.data)}

            onFacetsChange={this.changeFacets}
          />
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
      </div>
    )
  }
}

export default App;
