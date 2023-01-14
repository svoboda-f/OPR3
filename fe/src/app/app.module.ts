import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { DiaryComponent } from './components/diary/diary.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/dialog/login/login.component';
import { RegisterComponent } from './components/dialog/register/register.component';
import { NewEntryComponent } from './components/dialog/new-entry/new-entry.component';
import { authInterceptorProviders } from './Auth.interceptor';
import { GraphComponent } from './components/graph/graph.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NavbarComponent,
    CalculatorComponent,
    DiaryComponent,
    DialogComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    NewEntryComponent,
    GraphComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
