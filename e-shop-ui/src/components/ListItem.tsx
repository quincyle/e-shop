import React from 'react';
import Rating from '@material-ui/lab/Rating';

import {ProductPrice} from 'components/ProductPrice';
import {ProductAvailability} from 'components/ProductAvailability';

import 'css/ListItem.css';
import { Product } from 'types';

type ListProps = {
  data: Product
} & React.HTMLAttributes<HTMLDivElement>

export const ListItem = (props: ListProps) => {
  return (
    <div className="list-item">
      <img
        className="product-image"
        src={props.data.image} 
        alt={props.data.shortDescription}
      >
      </img>

      <div className="product-item-name">{props.data.name}</div>

{/*
// @ts-ignore */}
      <Rating className="product-rating" value={props.data.rating} readOnly />

      <ProductPrice
        regularPrice={props.data.regularPrice}
        salePrice={props.data.salePrice}
      />

      <ProductAvailability 
        availability={props.data.onlineAvailability}
        trueMessage='Available online'
        falseMessage='Sold out online'
      />
      <ProductAvailability 
        availability={props.data.inStoreAvailability}
        trueMessage='Available at nearby stores'
        falseMessage='Sold out in nearby stores'
      />
    </div>
  )
};