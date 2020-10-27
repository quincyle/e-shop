import { Data, RawData, Product } from "types"

export class DataProcessor {
  public data: Data

  constructor (data: RawData) {
    this.data = this._normalize(data)
  }

  addRating (): DataProcessor {
    const { data } = this
    const newData = {
      ...data,
      products: data.products.map((product) => {
        return {
          ...product,
          rating: Number((Math.random() * 3 + 2).toFixed(1))
        }
      })
    }

    this.data = newData

    return this
  }

  _normalize (data: RawData): Data {
    return {
      ...data,
      products: data.products.map((product): Product => {
        if (product.image === null) product.image = undefined
        return product as Product
      })
    }
  }
}