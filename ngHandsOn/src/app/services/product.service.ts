import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [
    new Product(
      "Oh, The Places You'll Go!",
      11.39,
      'https://images-na.ssl-images-amazon.com/images/I/518eq5NjZkL._SY160_.jpg',
      5
    ),
    new Product(
      'The Giving Tree',
      8.31,
      'https://images-na.ssl-images-amazon.com/images/I/51XKHozHPEL._SY160_.jpg',
      4
    ),
    new Product(
      'Pete the Cat: Big Easter Adventure',
      7.29,
      'https://images-na.ssl-images-amazon.com/images/I/61VqwEXgCdL._AC_US218_.jpg',
      4
    ),
    new Product(
      'Harry Potter and the Chamber of Secrets',
      8.99,
      'https://images-na.ssl-images-amazon.com/images/I/51PFoq3WlaL._AC_US218_.jpg',
      5
    ),
  ];

  constructor() { }

  index(): Product[] {
    return [...this.products];
  }

  create(newProd: Product): Product {
    this.products.push(newProd);
    return newProd;
  }

}
