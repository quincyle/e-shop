import React, { useState, ChangeEvent } from 'react'

import { List } from 'components/List'
import { Facets } from 'components/Facets'
import sourceData from 'local-data'
import {DataProcessor} from 'data/processor'
import { AppBar, createMuiTheme, IconButton, Toolbar, Typography, Paper, CssBaseline, Theme } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'
import { ThemeProvider } from '@material-ui/core/styles'
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import './App.css'
import { Data, FACETS_KEYS, Product, TFacets } from 'types'

const dataProcessor = new DataProcessor(sourceData)
const dataWithRating = dataProcessor.addRating().data

const DARK_THEME = createMuiTheme({
  palette: {
    type: 'dark',
  }
});

const LIGHT_THEME = createMuiTheme({
  palette: {
    type: 'light'
  }
})

export default () => {
  const data = dataWithRating

  const [theme, setTheme] = useState(
    createMuiTheme({
      palette: {
        type: 'light'
      }})
  );
  const [isOnlineAvailable, setOnlineAvailable] = useState(false);
  const [isStoreAvailable, setIsStoreAvailable] = useState(false);
  const [sortValue, setSortValue] = useState(1);
  const [productFilters, setProductFilters] = useState(generateInitialFacetsFromData(data))

  function handleThemeChange (theme: Theme) {
    console.log('theme', theme)
    if (theme.palette.type === 'dark') {
      setTheme(
        createMuiTheme(LIGHT_THEME)
      )
    } else {
      setTheme(
        createMuiTheme(DARK_THEME)
      )
    }
  }

  function handleIsisOnlineAvailableChange (event: ChangeEvent<HTMLInputElement>) {
    setOnlineAvailable(event.target.checked)
  }

  function handleIsStoreAvailableChange(event: ChangeEvent<HTMLInputElement>) {
    setIsStoreAvailable(event.target.checked)
  }

  function handleSortChange (event: ChangeEvent<{value: unknown}>) {
    setSortValue(event.target.value as number)
  }

  function handleFacetsChange (filterKey: FACETS_KEYS, event: ChangeEvent<HTMLInputElement>) {
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

  function generateInitialFacetsFromData (data: Data): TFacets {
    return data.products.reduce((accumulator, current) => {
      Object.values(FACETS_KEYS).forEach(filterKey => {
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
    }, {} as TFacets)
  }

  function processData (data: Data) {
    const clonedData = {
      ...data,
      products: [...data.products] || []
    }

    clonedData.products = filterByFacets(clonedData.products)
    clonedData.products = filterByAvailability(clonedData.products)
    clonedData.products = sortByPrice(clonedData.products)

    return clonedData
  }

  function filterByFacets (items: Product[]) {
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
        const castedFilterKey = filterKey as FACETS_KEYS

        const filterValueSelected = Object.entries(filterValueHash).some(([filterValue, filterValueEntry]) => {
          return filterValueEntry.enabled
        })

        if (!filterValueSelected) {
          return true
        }

        return Object.entries(filterValueHash).some(([filterValue, filterValueEntry]) => {
          return filterValueEntry.enabled && item[castedFilterKey] === filterValue
        })
      })
    })
  }

  function filterByAvailability (items: Product[]) {
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

  function sortByPrice (items: Product[]): Product[] {
    switch (sortValue) {
      case 1:
        return items
      case 2:
        return items.sort((a, b) => {
          return b.salePrice - a.salePrice
        })
      case 3:
        return items.sort((a, b) => {
          return a.salePrice - b.salePrice
        })
      default:
        return items
    }
  }

  function clickGithubIcon () {
    // window.location.href = "https://github.com/quincyle/e-shop/tree/master/e-shop-ui"
  }

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Paper>
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
                  <IconButton edge="end" color="inherit" aria-label="menu"
                    onClick={() => handleThemeChange(theme)}
                  >
                    {theme.palette.type === 'light'? <Brightness4Icon /> : <Brightness7Icon />}
                  </IconButton>
                </Toolbar>
              </AppBar>
            </div>
            <div style={{margin: '20px 0', padding: '20px 0', fontSize: '22px', fontWeight: 400}}>Gaming Monitors</div>

            <div style={{
              display: 'flex',
            }}>
              <Facets
                filters={productFilters}
                data={processData(data)}

                onFacetsChange={handleFacetsChange}
              />
              <List
                data={processData(data)}
                isOnlineAvailable={isOnlineAvailable}
                isStoreAvailable={isStoreAvailable}
                sortValue={sortValue}

                changeOnlineAvailability={handleIsisOnlineAvailableChange}
                changeStoreAvailability={handleIsStoreAvailableChange}
                changeSort={handleSortChange}
              />
            </div>
          </div>
        </Paper>
      </ThemeProvider>
    </>
  )
};
