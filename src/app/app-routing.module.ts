import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { SlamComponent } from './slam/slam.component';

const routes: Routes = [
  {path:'navigation',component: NavigationComponent},
  {path:'slam',component: SlamComponent},
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/navigation'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
