import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';

@Component({
  selector: 'app-register-start',
  templateUrl: './register-start.component.html',
  styleUrls: ['./register-start.component.css']
})
export class RegisterStartComponent implements OnInit {

  constructor(
    public AuthServiceService: AuthServiceService,
    public FormBuilder: FormBuilder,
    public Router: Router) { }

  public myForm: FormGroup
  public validation = Validators.required
  public numericNumberReg = '^-?[0-9]\\d*(\\.\\d{1,2})?$';

  ngOnInit(): void {
    this.myForm = this.FormBuilder.group({
      id: ["", [this.validation, Validators.minLength(9), Validators.pattern(this.numericNumberReg)]],
      email: ['', [this.validation, Validators.email]],
      password: ["", [this.validation, Validators.minLength(3)]],
      confirm_password: ["", [this.validation, Validators.minLength(3)]]
    })
    this.fetch()
  }


  public fetch = () => {
    this.AuthServiceService.fetchAllUsers().subscribe(
      (res: any) => {
        this.AuthServiceService.registeredUsers = res
      },
      (err: any) => {
        console.error(err)
      }
    )
  }

 

  public handleRegisterPartOne = () => {
    const form = this.myForm.value
    const snackBar = this.AuthServiceService.showSnackBar

    const validation_Email = this.AuthServiceService.registeredUsers.find(user => user.email == `${form.email}`)
    const validation_ID = this.AuthServiceService.registeredUsers.find(user => user.id == `${form.id}`)
    const validation_Password = form.password !== form.confirm_password

    validation_Email ? snackBar('Email is already taken') : ""
    validation_ID ? snackBar('ID is already taken') : ""
    validation_Password ? snackBar('Passwords much be matched.') : ""

    this.AuthServiceService.users = this.myForm.value
    if (!validation_ID && !validation_Email && !validation_Password) {
      this.Router.navigateByUrl('/register-finish')
    }

   
  }

}