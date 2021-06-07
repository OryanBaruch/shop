import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import categoriesInterface from 'src/app/interfaces/categories.interface';
import productsInterface from 'src/app/interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProdcutService {

  constructor(public http: HttpClient) { }
  public categories: categoriesInterface[] = []
  public products: productsInterface[] = []
  public editedProduct:any
  public all_products: any[] = []
  public numberOfProducts:Number

  public activeNavLink: any;
  public search_values: any

  public selectedID: string = ''
  public BASE_URL = `http://localhost:4500`

  
  public fetchAllCategories = () => {
    return this.http.get(`${this.BASE_URL}/category`,{
      headers:{'xx-auth': localStorage.getItem('access_token')}
    }).subscribe(
      (res: any) => {
        this.categories = res.Fetch_All_Categories
      },
      (err: any) => {
        console.log(err)
      }
    )
  }
  public fetchAllProducts = () => {
    return this.http.get(`${this.BASE_URL}/products`).subscribe(
      (res: any) => {
        this.all_products = res.fetchProducts
        this.products = res.fetchProducts
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  public fetchProductsFromCategory = () => {
    return this.http.get(`${this.BASE_URL}/products/category/${this.selectedID}`,{
      headers:{'xx-auth': localStorage.getItem('access_token')}
    }).subscribe(
      (res: any) => {
        this.products = res.fetch_all_products_by_category
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  public handleSearch = (e) => {
    if (e.target.value == '') return this.products=this.all_products
    this.products = this.all_products.filter(
      (product) => product?.name?.toUpperCase().includes(e.target.value.toUpperCase())
    )
  }

}
