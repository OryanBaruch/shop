import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ProdcutService } from 'src/app/services/products/prodcut.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  constructor(public CartService: CartServiceService,
    public AuthService: AuthServiceService,
    public ProductService: ProdcutService,
    public OrderService:OrderService,
    public Router: Router) { }

  public search_values: String = ''
  public mark: boolean

  ngOnInit(): void {
    this.CartService.fetchProductsByUser()
  }

  public Marker_Search_Results = (e) => {
    this.search_values=e.target.value
  }

}
