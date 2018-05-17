import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

@Injectable()
export class ProductService {

  searchEvent: EventEmitter<ProductSearchParams> = new EventEmitter();

  constructor(private http: Http) { }
  // 所有的商品信息
  getProducts(): Observable<Product[]> {
    return this.http.get('api/products').map(res => res.json());
  }
  // 某个商品
  getProduct(id: number): Observable<Product> {
    return this.http.get(`api/product/${id}`).map(res => res.json());
  }
  // 获取某个商品的评论
  getComments4ProductId(id: number): Observable<Comment[]> {
    return this.http.get(`api/product/${id}/comments`).map(res => res.json());
  }
  // 返回商品类别
  getAllCategories(): string[] {
    return ['电子产品', '硬件设备', '图书'];
  }

  // 商品搜索 method
  search(params: ProductSearchParams): Observable<Product[]> {
    console.log('params: ', params);
    return this.http.get('api/products', {search: this.encodeParams(params)}).map(res => res.json());
  }
  private encodeParams(params: ProductSearchParams) {
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((sum: URLSearchParams, key: string) => {
          const temp = {};
          temp[key] = params[key];
          Object.assign(sum, temp);
          return sum;
        }, new URLSearchParams());
  }

}
// 商品类
export class Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {}
}
// 评论类
export class Comment {
  constructor(
    public id: number,
    public productId: number,
    public timestamp: string,
    public user: string,
    public rating: number,
    public content: string
  ) {}
}

export class ProductSearchParams {
  constructor(
    public title: string,
    public price: number,
    public category: string
  ) { }
}
