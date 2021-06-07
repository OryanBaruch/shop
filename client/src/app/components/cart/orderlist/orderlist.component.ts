import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ProdcutService } from 'src/app/services/products/prodcut.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  constructor(
    public CartService: CartServiceService,
    public AuthService: AuthServiceService,
    public ProductService: ProdcutService,
    public OrderService:OrderService,
    public Router:Router) { }
    public order:any

  ngOnInit(): void {
    this.order=localStorage.getItem('shoppingCartProducts')
    this.CartService.shoppingCartProducts=JSON.parse(this.order)
  }

  public redirectHome=()=>{
    this.Router.navigateByUrl('/homepage')
  }



}
