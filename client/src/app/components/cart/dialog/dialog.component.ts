import { Component, OnInit } from '@angular/core';
import { ProdcutService } from 'src/app/services/products/prodcut.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public ProdcutService:ProdcutService,
  ) { }

  ngOnInit(): void {
  }

}
