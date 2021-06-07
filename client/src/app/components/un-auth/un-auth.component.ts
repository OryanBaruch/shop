import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-un-auth',
  templateUrl: './un-auth.component.html',
  styleUrls: ['./un-auth.component.css']
})
export class UnAuthComponent implements OnInit {

  constructor(
    public Router:Router
  ) { }

  ngOnInit(): void {
  }

  public returnToLogin=()=>{
    this.Router.navigateByUrl('/login')
  }

}
