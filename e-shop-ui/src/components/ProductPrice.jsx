import React from 'react'

export class ProductPrice extends React.Component {
  render () {
    if (this.props.regularPrice  === this.props.salePrice) {
      return <div className="product-pricing" style={{fontSize: '16px', fontWeight: '600'}}>${this.props.regularPrice}</div>
    }
    return (
      <div className="product-pricing" style={{display: 'flex', alignItems: 'flex-end', color: 'red', fontWeight: '600'}}>
        <div style={{fontSize: '16px', marginRight: '10px'}}>${this.props.regularPrice}</div>
        <div style={{fontSize: '12px'}}>SAVE {this.props.salePrice}</div>
      </div>
    )
  }
}