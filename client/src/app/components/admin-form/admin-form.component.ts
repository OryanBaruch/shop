import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { ProdcutService } from 'src/app/services/products/prodcut.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {

  constructor(
    public CartService: CartServiceService,
    public AuthService: AuthServiceService,
    public ProductService: ProdcutService,
    public AdminService:AdminServicesService,
    public FormBuilder: FormBuilder,
    public Router: Router) { }
    public myForm:FormGroup

  ngOnInit(): void {
    this.myForm = this.FormBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      photo_url: ['', [Validators.required]],
    })
  }

  public handleAddAdminControl=()=>{
    this.AdminService.addNewProduct(this.myForm.value)
    this.AuthService.showSnackBar('Added to shop !')
  }

}
