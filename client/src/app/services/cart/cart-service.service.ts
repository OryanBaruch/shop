import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import my_cartInterface from 'src/app/interfaces/my_cart.interface';
import shoppingCart_Products_Interface from 'src/app/interfaces/shoppingCartProduct.interface';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  public shoppingCartProducts: shoppingCart_Products_Interface[] = []
  public my_cart: my_cartInterface[] = []
  public cartStatus: any[] = []
  public totalSum: Number
  public sum: Number
  // public totalSum= JSON.stringify(localStorage.setItem('totalSum',this.totalCartPrice ))

  public selectedID: String = ''
  public BASE_URL = `http://localhost:4500`

  public headers = {
    'content-type': 'application/json',
    'xx-auth': localStorage.getItem('access_token')
  }
  static shoppingCartProducts: any;

  constructor(public http: HttpClient) { }

  public fetchProductsByUser = () => {
    return this.http.get(`${this.BASE_URL}/cart/byUser`,{
      headers:{'xx-auth': localStorage.getItem('access_token')}
    }).subscribe(
      (res: any) => {
        this.cartStatus = res.cart_detials.cart
        this.shoppingCartProducts = res.cart_detials.cartProducts
        this.totalSum = res.cart_detials.sum
        localStorage.setItem('shoppingCartProducts', JSON.stringify(this.shoppingCartProducts))
        localStorage.setItem('cartStatus', JSON.stringify(this.cartStatus))
      },
      (error: any) => {
        console.log(error)
      }
    )
  }


  public createCart = (body: any) => {
    return this.http.post(`${this.BASE_URL}/cart/make-cart`, body, {
      headers:{'xx-auth': localStorage.getItem('access_token')}
    }).subscribe(
      (res: any) => {
        localStorage.setItem('my_cartID', res._id)
        this.my_cart = res
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  public addProductToCart = (body: any) => {
    return this.http.post(`${this.BASE_URL}/cart/add`, body,{
      headers:{'xx-auth': localStorage.getItem('access_token')}
    }).subscribe(
      (res: any) => {
        this.shoppingCartProducts = res.all_products_in_cart
        this.totalSum = res.sum
        localStorage.setItem('shoppingCartProducts', JSON.stringify(this.shoppingCartProducts))
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  public removeProductFormCart = (id: String) => {
    return this.http.delete(`${this.BASE_URL}/cart/remove/${id}`,{
      headers:{'xx-auth': localStorage.getItem('access_token')}
    }).subscribe(
      (res: any) => {
        this.totalSum = res.sum
        const filtered_cart = this.shoppingCartProducts.filter(item => item.product._id !== id)
        this.shoppingCartProducts = filtered_cart
      },
      (err: any) => {
        console.log('err', err)
      }
    )
  }

  public clearCart = (cartID: String) => {
    return this.http.delete(`${this.BASE_URL}/cart/remove-all/${cartID}`,{
      headers:{'xx-auth': localStorage.getItem('access_token')}
    }).subscribe(
      (res: any) => {
        this.shoppingCartProducts = []
        localStorage.removeItem('shoppingCartProducts')
        this.totalSum = 0
      },
      (err: any) => {
        console.log(err)
      }
    )
  }


}

