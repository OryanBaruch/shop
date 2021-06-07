import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthGuard implements CanActivate {

  constructor(
    public AuthService:AuthServiceService,
    public Router:Router){}

  canActivate():boolean{
    if (!this.AuthService.loggedIn()){
      return true
    } 
  }
  
}
