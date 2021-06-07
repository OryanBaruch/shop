import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterFinishComponent } from './components/auth/register-finish/register-finish.component';
import { RegisterStartComponent } from './components/auth/register-start/register-start.component';
import { CartwrapperComponent } from './components/cart/cartwrapper/cartwrapper.component';
import { UnAuthComponent } from './components/un-auth/un-auth.component';
import { OrderlistComponent } from './components/cart/orderlist/orderlist.component';
import { RegisterContainerComponent } from './components/register-container/register-container.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterContainerComponent },
  { path: 'register-start', component: RegisterStartComponent },
  { path: 'register-finish', component: RegisterFinishComponent },
  { path: 'homepage', canActivate: [AuthGuard], component: CartwrapperComponent },
  { path: 'order', canActivate: [AuthGuard], component: OrderlistComponent },
  { path: 'un-auth', component: UnAuthComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
