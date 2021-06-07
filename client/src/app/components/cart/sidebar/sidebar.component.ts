import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { ProdcutService } from 'src/app/services/products/prodcut.service';
import { DialogErrorComponent } from '../../dialog-error/dialog-error.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    public CartService: CartServiceService,
    public AuthService: AuthServiceService,
    public ProductService: ProdcutService,
    public FormBuilder:FormBuilder,
    public Router: Router,
    public dialog:MatDialog
  ) { }
  public myForm:FormGroup;

  public cartID: any = localStorage.getItem('my_cartID')
  public local = localStorage.getItem('shoppingCartProducts')


  ngOnInit(): void {
    this.CartService.fetchProductsByUser()
    this.CartService.shoppingCartProducts=JSON.parse(localStorage.getItem('shoppingCartProducts'))
  }


  public handleDelete = (id) => {
    this.CartService.removeProductFormCart(id)
    const items=JSON.parse(localStorage.getItem('shoppingCartProducts'))
    const filteredLocal=items.filter(i=>i._id!=id)
    localStorage.setItem('shoppingCartProducts', JSON.stringify(filteredLocal))
  }

  public handleClearCart = (cartID) => {
    this.CartService.clearCart(cartID)
    localStorage.removeItem('shoppingCartProducts')
    localStorage.removeItem('totalSum')
    this.CartService.totalSum=0
  }

  public handleOrder = () => {
    if (!this.CartService.shoppingCartProducts?.length) return this.dialog.open(DialogErrorComponent)
    this.Router.navigateByUrl('/order')
  }

}
