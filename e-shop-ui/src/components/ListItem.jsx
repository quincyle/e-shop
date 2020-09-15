import React from 'react'
import Rating from '@material-ui/lab/Rating'

import {ProductPrice} from 'components/ProductPrice'
import {ProductAvailability} from 'components/ProductAvailability'
import 'css/ListItem.css'

export class ListItem extends React.Component {
  render () {
    return (
      <div className="list-item">
        <img
          className="product-image"
          src={this.props.data.image} 
          alt={this.props.data.shortDescription}
        >
        </img>

        <div className="product-item-name">{this.props.data.name}</div>

        <Rating className="product-rating" value={this.props.data.rating} readOnly />

        <ProductPrice
          regularPrice={this.props.data.regularPrice}
          salePrice={this.props.data.salePrice}
        />

        <ProductAvailability 
          availability={this.props.data.onlineAvailability}
          trueMessage='Available online'
          falseMessage='Sold out online'
        />
        <ProductAvailability 
          availability={this.props.data.inStoreAvailability}
          trueMessage='Available at nearby stores'
          falseMessage='Sold out in nearby stores'
        />
      </div>
    )
  }
}