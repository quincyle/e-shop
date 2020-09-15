import React from 'react'
import { List } from 'components/List'
import data from 'local-data'
import {DataProcessor} from 'data/processor'
// import logo from './logo.svg';
import './App.css'

const dataProcessor = new DataProcessor()
const dataWithRating = dataProcessor.AddRating(data)

function App() {
  return (
    <div 
      style={{
        display: 'flex',
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <div className='facet-container'>facet</div>
      <div className='product-listing-container'>
        <List 
          data={dataWithRating}
        />
      </div>
    </div>
  );
}

export default App;
