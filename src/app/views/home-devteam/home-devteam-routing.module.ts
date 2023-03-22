import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDevteamComponent } from './home-devteam.component';

const routes: Routes = [{ path: '', component: HomeDevteamComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeDevteamRoutingModule { }
