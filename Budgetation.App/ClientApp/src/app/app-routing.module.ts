import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MsalGuard} from "@azure/msal-angular";

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule), canActivate: [MsalGuard] },
  { path: 'expenses', loadChildren: () => import('./modules/expenses/expenses.module').then(m => m.ExpensesModule), canActivate: [MsalGuard] },
  { path: 'income', loadChildren: () => import('./modules/income/income.module').then(m => m.IncomeModule), canActivate: [MsalGuard] },
  { path: 'unauthenticated', loadChildren: () => import('./modules/unauthenticated/unauthenticated.module').then(m => m.UnauthenticatedModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
