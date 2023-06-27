/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async addProduct(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id).exec();
  }
}
