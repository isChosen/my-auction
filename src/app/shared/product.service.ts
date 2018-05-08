import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  private products: Product[] = [
    new Product(1, '第一个商品', 1.99, 3.5, '这是第一个商品描述信息', ['电子产品', '硬件设备']),
    new Product(2, '第二个商品', 2.99, 2.5, '这是第一个商品描述信息', ['电子产品']),
    new Product(3, '第三个商品', 3.99, 4.5, '这是第一个商品描述信息', ['图书']),
    new Product(4, '第四个商品', 4.99, 1.5, '这是第一个商品描述信息', ['硬件设备']),
    new Product(5, '第五个商品', 5.99, 3.5, '这是第一个商品描述信息', ['电子产品', '硬件设备']),
    new Product(6, '第六个商品', 6.99, 2.5, '这是第一个商品描述信息', ['硬件设备'])
  ];

  private comments: Comment[] = [
    new Comment(1, 1, '2018-5-5 17:45:00', '张珊', 3, '东西不错'),
    new Comment(2, 1, '2018-5-6 18:45:22', '李四', 4, '东西是不错'),
    new Comment(3, 1, '2018-5-7 19:45:25', '王五', 2, '东西挺不错'),
    new Comment(4, 2, '2018-5-8 20:45:16', '赵六', 4, '东西还不错')
  ];

  constructor() { }
  // 所有的商品信息
  getProducts(): Product[] {
    return this.products;
  }
  // 某个商品
  getProduct(id: number): Product {
    return this.products.find((product: Product) => product.id === id);
  }
  // 获取某个商品的评论
  getComments4ProductId(id: number): Comment[] {
    return this.comments.filter(comment => comment.productId === id); // 参数不带类型也可以
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
    public comment: string
  ) {}
}
