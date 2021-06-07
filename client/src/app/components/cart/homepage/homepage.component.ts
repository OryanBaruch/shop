import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { ProdcutService } from 'src/app/services/products/prodcut.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(
    public AuthServiceService:AuthServiceService,
    public CartService:CartServiceService,
    public ProductService:ProdcutService
  ) { }

  ngOnInit(): void {
    this.CartService.fetchProductsByUser()
  }

}
