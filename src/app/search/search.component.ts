import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  formModel: FormGroup;
  categories: string[];

  constructor(fb: FormBuilder, productService: ProductService) {
    this.formModel = fb.group({
      title: ['', Validators.minLength(3)],
      price: [null, this.positiveNumberValidator],
      category: ['-1']
    });

    this.categories = productService.getAllCategories();
  }

  ngOnInit() { }

  // 价格正数验证
  positiveNumberValidator(control: FormControl): any {
    if (!control.value) {
      return null;
    }
    const price = parseInt(control.value, 10);
    if (price > 0) {
      return null;
    } else {
      return {positiveNumber: {errorDesc: '请输入正数'}};
    }
  }

  // 提交方法
  onSearch() {
    if (this.formModel.valid) {
      console.log(this.formModel.value);
    }
  }

}
