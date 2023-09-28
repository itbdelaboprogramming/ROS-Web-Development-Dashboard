import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { NavigationComponent } from './navigation/navigation.component';
// import { SlamComponent } from './slam/slam.component';
import { JoystickComponent } from '../temp/joystick/joystick.component';
import { FormsModule } from '@angular/forms';
// import { MapDisplayComponent } from './map-display/map-display.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
// import { DatabaseComponent } from './database/database.component';
import { HomeComponent } from './home/home.component';
// import { LandingPageComponent } from './landing-page/landing-page.component';
import { ControllModeComponent } from './control-mode/control-mode.component';
import { ControlNavbarComponent } from '../components/control-navbar/control-navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { DashboardFooterComponent } from '../components/dashboard-footer/dashboard-footer.component';
import { MappingComponent } from './mapping/mapping.component';
import { DatabaseComponent } from './database/database.component';
import { ClosingPageComponent } from './closing-page/closing-page.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    // NavigationComponent,
    // SlamComponent,
    JoystickComponent,
    // MapDisplayComponent,
    // DatabaseComponent,
    HomeComponent,
    // LandingPageComponent,
    ControllModeComponent,
    ControlNavbarComponent,
    FooterComponent,
    DashboardFooterComponent,
    MappingComponent,
    DatabaseComponent,
    ClosingPageComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
