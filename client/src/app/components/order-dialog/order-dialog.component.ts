import { Component, OnInit } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  constructor(
    public OrderService:OrderService,
  ) { }


  ngOnInit(): void {
  }

}
