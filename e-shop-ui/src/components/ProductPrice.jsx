import React from 'react';

export const ProductPrice = (props) => {
  const {regularPrice, salePrice} = props

  return (
    regularPrice  === salePrice
      ? <div className="product-pricing" style={{fontSize: '16px', fontWeight: '600'}}>${regularPrice}</div>
      : <div className="product-pricing" style={{display: 'flex', alignItems: 'flex-end', color: 'red', fontWeight: '600'}}>
          <div style={{fontSize: '16px', marginRight: '10px'}}>${regularPrice}</div>
          <div style={{fontSize: '12px'}}>SAVE {salePrice}</div>
        </div>
  )
};