import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../shared/product.service';
import { FormControl } from '@angular/forms';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private keyWord: string;
  private searchIpt: FormControl = new FormControl();
  private products: Array<Product>;
  constructor(private productService: ProductService) {
    this.searchIpt.valueChanges
        .debounceTime(500)
        .subscribe(
          value => this.keyWord = value
        );
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }

}
