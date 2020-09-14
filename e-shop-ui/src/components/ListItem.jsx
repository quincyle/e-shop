import React from 'react'
import 'App.css'

export class ListItem extends React.Component {
  render () {
    return (
      <div 
        className="ListItem"
      >
        <img
          className="product-image"
          src={this.props.data.image} 
          alt={this.props.data.shortDescription}
        >
        </img>
        <div className="product-item-name">{this.props.data.name}</div>
      </div>
    )
  }
}