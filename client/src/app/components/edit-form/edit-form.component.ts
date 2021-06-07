import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { ProdcutService } from 'src/app/services/products/prodcut.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  constructor(
    public CartService: CartServiceService,
    public AuthService: AuthServiceService,
    public ProductService: ProdcutService,
    public AdminService:AdminServicesService,
    public FormBuilder:FormBuilder,
    public Router: Router
  ) { }
  public myForm:FormGroup


  ngOnInit(): void {
      this.myForm = this.FormBuilder.group({
        name:[this.AdminService.editedProduct?.name],
        category:[this.AdminService.editedProduct.category?._id],
        price:[this.AdminService.editedProduct?.price],
        photo_url:[this.AdminService.editedProduct?.photo_url],
      })
    }

    handleEdit=()=>{
    this.AdminService.updateProduct(this.myForm.value)
    }

}
