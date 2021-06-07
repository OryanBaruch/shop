import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServiceService } from '../auth-services/auth-service.service';
import { CartServiceService } from '../cart/cart-service.service';
import * as fileSaver from 'file-saver'

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    public http: HttpClient,
    public AuthService: AuthServiceService,
    public CartService: CartServiceService
  ) { }
  public BASE_URL = `http://localhost:4500/order`
  public orders: any[] = []
  public datesOfOrder: any[] = []
  public datesMSG: String = ''
  public selectedDate: String = ''
  public ordersFromShop: Number
  public orderFinished: Boolean = false


  public handleOrder = (body: any) => {
    let cartID = localStorage.getItem('my_cartID')
    return new Promise((resolve, reject) => {

      this.http.post(`${this.BASE_URL}/submitOrder/${cartID}`, body, {
        headers: { 'xx-auth': localStorage.getItem('access_token') }
      }).subscribe(
        (res: any) => {
          this.orders = res.order
          localStorage.setItem('orders', JSON.stringify(this.orders))
          localStorage.removeItem('shoppingCartProducts')
          this.orderFinished = true
          resolve({err:false})
        },
        (error: any) => {
          this.orderFinished = false
          this.datesMSG = error.error.msg
          this.AuthService.showSnackBar(this.datesMSG)
          resolve({err:true})
        }
      )
    })
    }

  public fetchNumberOfOrders = () => {
    return this.http.get(`${this.BASE_URL}/number-of-orders`).subscribe(
      (res: any) => {
        this.ordersFromShop = res.numberOfOrders
      },
      (err: any) => {
        console.log({ err })
      }
    )
  }

  public createRecipt(res): Blob {
    return new Blob([res], { type: 'text/plain' })
  }

  public getOrderReceptionFile(x) {
    const param = new HttpParams().set('filename', x)
    const options = {
      params: param
    }
    this.http.get(`${this.BASE_URL}/recipt`, {
      ...options, responseType: 'blob',
      headers: { 'xx-auth': localStorage.getItem('access_token') }
    }).subscribe(
      res => {
        fileSaver.saveAs(this.createRecipt(res), 'order.text')

      },
      err => {
        console.log(err)
      }
    )

  }

}
