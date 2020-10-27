export enum FACETS_KEYS {
  MANUFACTORY = 'manufacturer',
  CONDITION = 'condition',
  PRODUCT_ASPECT_RATIO = 'productAspectRatio'
}

type FACETS_KEYS_MAPPED = {[key in FACETS_KEYS]?: string}

export interface RawData {
  products: RawProduct[]
  [key: string]: any
}

export interface RawProduct {
  sku: number
  name: string
  image?: string | null
  shortDescription?: string
  regularPrice: number
  salePrice: number
  onlineAvailability?: boolean
  inStoreAvailability?: boolean
  rating?: number
}

export interface Data extends RawData {
  products: Product[]
 }
 
export interface Product extends FACETS_KEYS_MAPPED, RawProduct {
  image?: string
}

export type TFacets = {
  [key in FACETS_KEYS]: {
    [key: string]: {
      enabled: boolean
      count: number
    }
  }
}
