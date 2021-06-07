import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { ProdcutService } from 'src/app/services/products/prodcut.service';

@Component({
  selector: 'app-category-navbar',
  templateUrl: './category-navbar.component.html',
  styleUrls: ['./category-navbar.component.css']
})
export class CategoryNavbarComponent implements OnInit {

  constructor(
    public ProductService:ProdcutService,
    public CartService:CartServiceService,
    public AuthService:AuthServiceService

  ) { }

  ngOnInit(): void {
    this.ProductService.fetchAllCategories()
    this.ProductService.fetchAllProducts()
  }

  
  public fetchProductsByCategory=(id:any)=>{
    this.ProductService.selectedID=id
    this.ProductService.activeNavLink=id
    this.ProductService.fetchProductsFromCategory()
  }

}
