import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import registeredUserInterface from 'src/app/interfaces/registeredUser.interface';
import userInterface from 'src/app/interfaces/userInfo.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public BASE_URL = `http://localhost:4500/users`
  public cities: any = [
    { id: 1, name: "Modiin" },
    { id: 2, name: "Tel-Aviv" },
    { id: 3, name: "Jerusalem" },
  ]

  constructor(
    public http: HttpClient,
    public Snackbar: MatSnackBar,
    public Router: Router) { }
  public userInfoFromLocal = JSON.parse(localStorage.getItem('userInfo'))


  public userInfo: userInterface = localStorage.getItem('access_token') ?
    jwtDecode(localStorage.getItem('access_token')) : {};

  public users: any = []
  public registeredUsers: registeredUserInterface = []
  public bothForm: [] = []
  public localStorageData: any

  public showSnackBar = (msg) => {
    this.Snackbar.open(msg, "", {
      duration: 1500,
      verticalPosition: 'top',
    })
  }

  public handleLogin = async (body: any) => {
    debugger;
    return this.http.post(`${this.BASE_URL}/login`, body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  public handleRegister = (body: any) => {
    return this.http.post(`${this.BASE_URL}/register`, body, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(
      (res: any) => {
        this.registeredUsers = res.created_user
        this.Router.navigateByUrl('/login')
      },
      (err: any) => {
        this.showSnackBar(err.error.error)
        console.log(err)
      }
    )
  }

  public fetch_user_by_email = (email: any) => {
    return this.http.get(`${this.BASE_URL}/${email}`)
  }


  public fetchAllUsers = () => {
    return this.http.get(`${this.BASE_URL}`)
  }


  public loggedIn = () => {
    return !!localStorage.getItem('access_token')
  }

  public handleLogout = () => {
    localStorage.clear()
    this.Router.navigateByUrl('/login')
  }

}
