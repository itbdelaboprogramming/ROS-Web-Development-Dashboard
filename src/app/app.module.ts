import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SlamComponent } from './slam/slam.component';
import { JoystickComponent } from './joystick/joystick.component';
import { FormsModule } from '@angular/forms';
import { MapDisplayComponent } from './map-display/map-display.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DatabaseComponent } from './database/database.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { OperationComponent } from './operation/operation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SlamComponent,
    JoystickComponent,
    MapDisplayComponent,
    DatabaseComponent,
    HomeComponent,
    NavBarComponent,
    OperationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
