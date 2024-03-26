import {tesloApi} from '../../config/api/tesloApi';
import {Product} from '../../domain/models/product';
import {TesloProduct} from '../../infrastructure/interfaces/teslo-products.interface';
import {ProductMapper} from '../../infrastructure/mappers/product.mapper';

export const getProductsByPage = async (
  page: number,
  limit: number = 20,
): Promise<Product[]> => {
  // console.log({page, limit});

  try {
    const {data} = await tesloApi.get<TesloProduct[]>(
      `/products?offset=${page * 10}&limit=${limit}`,
    );

    let products: Product[] = [];

    await new Promise(resolve => {
      setTimeout(() => {
        resolve(console.log('hola'));
      }, 5000);
    });

    products = data.map(ProductMapper.tesloProductToEntity);
    return products;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting products');
  }
};
