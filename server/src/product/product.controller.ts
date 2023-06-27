/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Post()
  async addProduct(@Body() product: Product): Promise<Product> {
    return this.productService.addProduct(product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
}
