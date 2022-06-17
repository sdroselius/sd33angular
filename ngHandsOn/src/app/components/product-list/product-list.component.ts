import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  display: boolean = false;

  products: Product[] = [];

  title = '';

  newProduct: Product | null = new Product();


  constructor(private prodService: ProductService) { }

  ngOnInit(): void {
    this.products = this.prodService.index();
  }

  getNumberOfProducts(): number {
    return this.products.length;
  }

  log(msg: string): void {
    console.log(msg);
  }

  onSubmit(prod: Product): void {
    // this.products.push(prod);
    this.prodService.create(prod);
    this.products = this.prodService.index();
    this.newProduct = new Product();
  }

}
