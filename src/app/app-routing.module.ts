import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { SlamComponent } from './slam/slam.component';
import { DatabaseComponent } from './database/database.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'navigation',component: NavigationComponent},
  {path:'mapping',component: SlamComponent},
  {path:'database',component: DatabaseComponent},
  {path:'home',component: HomeComponent},
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
