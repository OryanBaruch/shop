import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterStartComponent } from './components/auth/register-start/register-start.component';
import { RegisterFinishComponent } from './components/auth/register-finish/register-finish.component';
import {MatSelectModule} from '@angular/material/select';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomepageComponent } from './components/cart/homepage/homepage.component';
import { SidebarComponent } from './components/cart/sidebar/sidebar.component';
import { CartwrapperComponent } from './components/cart/cartwrapper/cartwrapper.component';
import { ProdcutItemComponent } from './components/cart/prodcut-item/prodcut-item.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DialogComponent } from './components/cart/dialog/dialog.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { UnAuthComponent } from './components/un-auth/un-auth.component';
import { AuthGuard } from './Guards/auth.guard';
import { SearchComponent } from './components/search/search.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CategoryNavbarComponent } from './components/category-navbar/category-navbar.component';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { OrderlistComponent } from './components/cart/orderlist/orderlist.component';
import { OrderItemComponent } from './components/cart/order-item/order-item.component';
import { OrderFormComponent } from './components/cart/order-form/order-form.component';
import { NgPipesModule } from 'angular-pipes';
import { HighlightDirective } from './highlight.directive';
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { DialogErrorComponent } from './components/dialog-error/dialog-error.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { MatNativeDateModule } from '@angular/material/core';
import { RegisterContainerComponent } from './components/register-container/register-container.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterStartComponent,
    RegisterFinishComponent,
    TopBarComponent,
    HomepageComponent,
    SidebarComponent,
    CartwrapperComponent,
    ProdcutItemComponent,
    DialogComponent,
    OrderDialogComponent,
    UnAuthComponent,
    SearchComponent,
    CategoryNavbarComponent,
    OrderlistComponent,
    OrderItemComponent,
    OrderFormComponent,
    HighlightDirective,
    AdminFormComponent,
    DialogErrorComponent,
    EditFormComponent,
    RegisterContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatSidenavModule,
    FormsModule,
    MatTabsModule,
    MatDividerModule,
    MatAutocompleteModule,
    NgMatSearchBarModule,
    BrowserAnimationsModule,
    NgPipesModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
