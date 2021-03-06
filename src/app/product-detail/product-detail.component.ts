import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService, Comment } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private isHidden = true;
  private product: Product;
  private comments: Comment[];

  @Input()
  newRating = 5;
  newComment = '';

  constructor(
    private routeInfo: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    const productId = +this.routeInfo.snapshot.params['productId'];
    this.productService.getProduct(productId)
        .subscribe(
          product => {
            console.log('product: ', product);
            this.product = product;
          }
        );
    this.productService.getComments4ProductId(productId)
        .subscribe(
          comment => {
            console.log('comment: ', comment);
            this.comments = comment;
          }
        );
  }

  addComment() {
    const comment = new Comment(0, this.product.id, new Date().toISOString(), 'someone', this.newRating, this.newComment);
    this.comments.unshift(comment);
    this.newComment = '';
    this.newRating = 5;
    this.isHidden = true;
  }

}
