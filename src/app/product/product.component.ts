import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../shared/product.service';
import { FormControl } from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products: Observable<Product[]>;
  private products2: Product[];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.productService.getProducts()
        .subscribe(
          products => {
            console.log('products: ', products);
            this.products2 = products;
          }
        );

    this.productService.searchEvent.subscribe(
      params => this.products = this.productService.search(params)
    );
  }

}
