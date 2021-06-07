import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import jwt_decode from "jwt-decode";
import { ProdcutService } from 'src/app/services/products/prodcut.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor
    (public AuthServiceService: AuthServiceService,
      public CartServise:CartServiceService,
      public ProductService:ProdcutService,
      public OrderSerivce:OrderService,
      public FormBuilder: FormBuilder,
      public Router: Router,
  ) { }

  public orderDate:any
  public userInfoFromLocal=JSON.parse(localStorage.getItem('userInfo'))


  public myForm: FormGroup
  ngOnInit(): void {
    this.myForm = this.FormBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
    this.ProductService.fetchAllProducts()
    this.OrderSerivce.fetchNumberOfOrders()
  }


  handleSubmit = async () => {
    (await this.AuthServiceService.handleLogin(this.myForm.value)).subscribe(
      (res: any) => {
        let decoded = jwt_decode(res.access_token)
        this.AuthServiceService.userInfo=decoded
        
        localStorage.access_token = res.access_token
        this.AuthServiceService.userInfo.token = localStorage.getItem("access_token")
        this.orderDate=JSON.parse(localStorage.getItem('orders'))
        
        this.CartServise.createCart({userID:this.AuthServiceService.userInfo})
        localStorage.setItem('userInfo', JSON.stringify(decoded))
        this.AuthServiceService.localStorageData=JSON.parse(localStorage.getItem('userInfo'))

        this.AuthServiceService.showSnackBar(this.AuthServiceService.userInfo.Role == true ?
          `Welcome ${this.AuthServiceService.userInfo.first_name}` : `Welcome ${this.AuthServiceService.userInfo.first_name}`)

      },
      (err: any) => {
        this.AuthServiceService.showSnackBar(err.error.error)
      }
    )
  }

}
