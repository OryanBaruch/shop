import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';
import { ProdcutService } from 'src/app/services/products/prodcut.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    public ProductService: ProdcutService,
    public AuthService: AuthServiceService) { }

  public input_values: string = ''

  ngOnInit(): void {
  }


}
