import React from 'react'
import { List } from 'components/List'
import { Button } from '@material-ui/core'
import data from 'local-data'

// import logo from './logo.svg';
import './App.css'

function App() {
  return (
    <div 
      style={{
        display: 'flex',
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        backgroundColor: '#a2b9bc'
      }}
    >
      <div className='facet-container'>facet</div>
      <div className='product-listing-container'>
        <List 
          data={data}
        />
        {/* <Grid container spacing={3}>
          <Grid item md={4}>
            Item
          </Grid>
          <Grid item md={4}>
            Item
          </Grid>
          <Grid item md={4}>
            Item
          </Grid>
          <Grid item md={4}>
            Item
          </Grid>
          <Grid item md={4}>
            Item
          </Grid>
          <Grid item md={4}>
            Item
          </Grid>
        </Grid> */}
      </div>
    </div>
  );
}

export default App;
