 import { Product, ProductDto } from '../models/product.model';


export class ProductMapper {

  // DTO to PRODUCT
  static dtoToProduct(response: ProductDto): Product {

    return {
      id: response.id,
      title: response.title,
      description: response.description,
      category: response.category,
      price: response.price,
      stock: response.stock,
      tags: response.tags,
      sku: response.sku,
      shippingInformation:response.shippingInformation,
      images: response.images,
      brand: response.brand,
      rating: response.rating,
    };
  }

  // DTO[] to PRODUCT[]
  static dtoArToProductdAr(response: ProductDto[]): Product[] {
     return response.map( this.dtoToProduct  )
  };

  
}