import React from 'react'

export class ProductAvailability extends React.Component {
  render () {
    return (
      <div className="product-availability" style={{display: 'flex', alignItems: 'center'}}>
        {this.props.availability
          ? <svg className="check-mark" viewBox="0 0 32 32">
              <path d="M12.22,24.64a.94.94,0,0,1-1.34,0L4.07,17.69a1,1,0,0,1,0-1.37.93.93,0,0,1,1.34,0l6.17,6.25,15-15.21a.93.93,0,0,1,1.34,0,1,1,0,0,1,0,1.36Z"></path>
            </svg> 
          : <svg className="no-icon" viewBox="0 0 32 32">
              <path d="M25.93 6.14A14 14 0 0 0 6.08 25.87 14 14 0 0 0 25.93 6.14zM16 3.8a12.14 12.14 0 0 1 8 3L6.77 24A12.19 12.19 0 0 1 16 3.8zm0 24.4a12.14 12.14 0 0 1-8-3L25.23 8A12.19 12.19 0 0 1 16 28.2z"></path>
            </svg>
        }
        <span>
          {this.props.availability ?  this.props.trueMessage : this.props.falseMessage}
        </span>
      </div>
    )
  }
}