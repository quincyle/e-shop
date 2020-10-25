import React, { useState } from 'react'

import { List } from 'components/List'
import { Facets } from 'components/Facets'
import data from 'local-data'
import {DataProcessor} from 'data/processor'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'

import './App.css'

const FILTER_ENUM_KEYS = ['manufacturer', 'condition', 'productAspectRatio']
const dataProcessor = new DataProcessor()
const localData = dataProcessor.AddRating(data)

export default () => {
  const [isOnlineAvailable, setOnlineAvailable] = useState(false);
  const [isStoreAvailable, setIsStoreAvailable] = useState(false);
  const [sortValue, setSortValue] = useState(1);
  const [productFilters, setProductFilters] = useState(
    localData.products.reduce((accumulator, current) => {
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
  )

  const data = localData

  function changeOnlineAvailability (event) {
    setOnlineAvailable(event.target.checked)
  }

  function changeStoreAvailability(event) {
    setIsStoreAvailable(event.target.checked)
  }

  function changeSort (event) {
    setSortValue(event.target.value)
  }

  function changeFacets (filterKey, event) {
    setProductFilters({
      ...productFilters,
      [filterKey]: {
        ...productFilters[filterKey],
        [event.target.name]: {
          ...productFilters[filterKey][event.target.name],
          enabled: event.target.checked
        }
      }
    })
  }

  function processData (data) {
    const clonedData = {
      ...data,
      products: [...data.products] || []
    }

    clonedData.products = filterByFacets(clonedData.products)
    clonedData.products = filterByAvailability(clonedData.products)
    clonedData.products = sortByPrice(clonedData.products)

    return clonedData
  }

  function filterByFacets (items) {
    const hasFacets = Object.entries(productFilters).some(([filterKey, filterValueHash]) => {
      return Object.entries(filterValueHash).some(([filterValue, filterValueEntry]) => {
        return filterValueEntry.enabled
      })
    })

    if (!hasFacets) {
      return items
    }

    return items.filter(item => {
      return Object.entries(productFilters).every(([filterKey, filterValueHash]) => {
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

  function filterByAvailability (items) {
    const shouldFilterOnline = isOnlineAvailable
    const shouldFilterStore = isStoreAvailable

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

  function sortByPrice (items) {
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

  function clickGithubIcon () {
    // window.location.href = "https://github.com/quincyle/e-shop/tree/master/e-shop-ui"
  }

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
              onClick={clickGithubIcon}
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
          filters={productFilters}
          data={processData(data)}

          onFacetsChange={changeFacets}
        />
        <List 
          data={processData(data)}
          isOnlineAvailable={isOnlineAvailable}
          isStoreAvailable={isStoreAvailable}
          sortValue={sortValue}

          changeOnlineAvailability={changeOnlineAvailability}
          changeStoreAvailability={changeStoreAvailability}
          changeSort={changeSort}
        />
      </div>
    </div>
  )
};
