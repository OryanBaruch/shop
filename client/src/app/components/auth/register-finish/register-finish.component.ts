import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-services/auth-service.service';
import { RegisterStartComponent } from '../register-start/register-start.component';

@Component({
  selector: 'app-register-finish',
  templateUrl: './register-finish.component.html',
  styleUrls: ['./register-finish.component.css']
})
export class RegisterFinishComponent implements OnInit {

  constructor(
    public AuthServiceService: AuthServiceService,
    public FormBuilder: FormBuilder,
    public Router: Router,
  ) { }

  public myForm: FormGroup

  public cities=this.AuthServiceService.cities
  public validation = Validators.required

  ngOnInit(): void {
    this.myForm = this.FormBuilder.group({
      first_name: ['', [this.validation]],
      last_name: ['', [this.validation]],
      city: ['', [this.validation]],
      street: ['', [this.validation]]
    })
  }

  handleRegisterPartTwo=()=>{
    this.AuthServiceService.bothForm={...this.myForm.value,...this.AuthServiceService.users }
    this.AuthServiceService.handleRegister(this.AuthServiceService.bothForm)
  }

}
