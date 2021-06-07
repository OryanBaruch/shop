import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ProdcutService } from 'src/app/services/products/prodcut.service';
import { OrderDialogComponent } from '../../order-dialog/order-dialog.component';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  constructor(
    public CartService: CartServiceService,
    public AuthService: AuthServiceService,
    public ProductService: ProdcutService,
    public OrderService: OrderService,
    public FormBuilder: FormBuilder,
    public dialog: MatDialog,
    public Router: Router
  ) { }

  public myForm: FormGroup
  public validation = Validators.required
  public cities = this.AuthService.cities
  private steetByLocalStorage = JSON.parse(localStorage.getItem('userInfo')).street
  private cityByLocalStorage = JSON.parse(localStorage.getItem('userInfo')).city
  public numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
  public minDate = new Date()
  public cartID = localStorage.getItem('my_cartID')

  public dblFetchStreet = () => {
    this.myForm.get('street').setValue(`${this.steetByLocalStorage}`)
  }

  public dblFetchCity = () => {
    this.myForm.get('city').setValue(`${this.cityByLocalStorage}`)
  }

  public handleCheckout = async (cartID) => {
    const response: any = await this.OrderService.handleOrder(this.myForm.value)
    if (!response.err) {
      this.AuthService.showSnackBar('Order submmited.')
      this.clearCartAfterCheckout(cartID)
    }
  }


  clearCartAfterCheckout(cartID) {
    this.CartService.clearCart(cartID)
    localStorage.removeItem('shoppingCartProducts')
    localStorage.removeItem('totalSum')
    this.CartService.totalSum = 0
    this.dialog.open(OrderDialogComponent)
    this.OrderService.orderFinished = false
  }

  openDialog() {
    this.dialog.open(OrderDialogComponent)
  }


  ngOnInit(): void {
    this.myForm = this.FormBuilder.group({
      city: ['', [this.validation]],
      street: ['', [this.validation]],
      date_of_delivery: [(new Date()).toISOString().substring(0, 10), [this.validation]],
      credit_card: ['',
        [this.validation, Validators.minLength(12),
        Validators.maxLength(16),
        Validators.pattern(this.numericNumberReg)]]
    })
  }


}
