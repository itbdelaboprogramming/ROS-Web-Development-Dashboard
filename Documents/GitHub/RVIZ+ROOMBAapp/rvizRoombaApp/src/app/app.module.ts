import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SlamComponent } from './slam/slam.component';
import { JoystickComponent } from './joystick/joystick.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SlamComponent,
    JoystickComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
