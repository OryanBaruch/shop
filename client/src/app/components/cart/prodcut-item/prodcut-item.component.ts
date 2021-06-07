import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServicesService } from 'src/app/services/admin/admin-services.service';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';
import { CartServiceService } from 'src/app/services/cart/cart-service.service';
import { ProdcutService } from 'src/app/services/products/prodcut.service';
import { EditFormComponent } from '../../edit-form/edit-form.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-prodcut-item',
  templateUrl: './prodcut-item.component.html',
  styleUrls: ['./prodcut-item.component.css']
})
export class ProdcutItemComponent implements OnInit {
  DialogComponent(DialogComponent: any) {
    throw new Error('Method not implemented.');
  }

  constructor(
    public AuthServiceService: AuthServiceService,
    public CartService: CartServiceService,
    public ProductService:ProdcutService,
    public AdminService:AdminServicesService,
    public dialog: MatDialog) { }
    private amount: Number = 1

  ngOnInit(): void {

  }

  getValue(e: any) {
    this.amount = e.target.value
  }

  public handleAdd = (product: any, amount: any) => {
    const id_of_cart = localStorage.getItem('my_cartID')
    if(!this.amount || this.amount < 1) return this.dialog.open(DialogComponent)
    this.CartService.addProductToCart({ product: product, cartID: id_of_cart, amount: this.amount })
    this.AuthServiceService.showSnackBar('Added')
  }

  public handleEdit=(body: any)=>{
    this.AdminService.editedProduct=body
    this.dialog.open(EditFormComponent)
  }

}
