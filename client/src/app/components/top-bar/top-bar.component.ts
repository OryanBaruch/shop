import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(public AuthService:AuthServiceService) { }

  ngOnInit(): void {
  }

}
