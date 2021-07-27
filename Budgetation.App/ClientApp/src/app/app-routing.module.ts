import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MsalGuard} from "@azure/msal-angular";

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canActivate: [MsalGuard] },
  { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule), canActivate: [MsalGuard] },
  { path: 'expenses', loadChildren: () => import('./modules/expenses/expenses.module').then(m => m.ExpensesModule), canActivate: [MsalGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
