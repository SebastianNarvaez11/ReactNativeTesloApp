import {BASE_URL} from '../../config/api/tesloApi';
import {Product} from '../../domain/models/product';
import {TesloProduct} from '../interfaces/teslo-products.interface';

export class ProductMapper {
  static tesloProductToEntity(tesloProduct: TesloProduct): Product {
    return {
      id: tesloProduct.id,
      title: tesloProduct.title,
      price: tesloProduct.price,
      description: tesloProduct.description,
      slug: tesloProduct.slug,
      stock: tesloProduct.stock,
      sizes: tesloProduct.sizes,
      gender: tesloProduct.gender,
      tags: tesloProduct.tags,
      images: tesloProduct.images.map(
        image => `${BASE_URL}/files/product/${image}`,
      ),
    };
  }
}
