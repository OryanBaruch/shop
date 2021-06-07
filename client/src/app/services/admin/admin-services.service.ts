import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdcutService } from '../products/prodcut.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor(
    public http: HttpClient,
    public ProductService:ProdcutService) { }

  public BASE_URL = `http://localhost:4500`
  public editedProduct:any

  
  public updateProduct=(body:any, )=>{
    return this.http.put(`${this.BASE_URL}/products/edit/${this.editedProduct._id}`,body,{
      headers:{'xx-auth': localStorage.getItem('access_token')}
    }).subscribe(
      (res:any)=>{
        this.ProductService.fetchAllProducts()
      },
      (err:any)=>{
        console.log({err})
      }
    )
  }

    public addNewProduct=(body:any)=>{
    return this.http.post(`${this.BASE_URL}/products/new-product`, body,{
      headers:{'xx-auth': localStorage.getItem('access_token')}
    }).subscribe(
      (res:any)=>{
        this.ProductService.all_products=res.newProduct
      },
      (error:any)=>{
        console.error(error)
      }
    )
  }
}
