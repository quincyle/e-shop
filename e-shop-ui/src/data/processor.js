export class DataProcessor {
  constructor () {

  }
  AddRating (data) {
    return {
      ...data,
      products: data.products.map(product => {
        return {
          ...product,
          rating: Number((Math.random() * 3 + 2).toFixed(1))
        }
      })
    }
  }
}