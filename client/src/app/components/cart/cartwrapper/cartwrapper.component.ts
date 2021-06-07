import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';

@Component({
  selector: 'app-cartwrapper',
  templateUrl: './cartwrapper.component.html',
  styleUrls: ['./cartwrapper.component.css']
})
export class CartwrapperComponent implements OnInit {

  constructor(public AuthServiceService:AuthServiceService) { }

  ngOnInit(): void {
  }

}
