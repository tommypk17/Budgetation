import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MsalGuard} from "@azure/msal-angular";
import {LoginGuard} from "./guards/login.guard";

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule), canActivate: [LoginGuard] },
  { path: 'expenses', loadChildren: () => import('./modules/expenses/expenses.module').then(m => m.ExpensesModule), canActivate: [LoginGuard] },
  { path: 'income', loadChildren: () => import('./modules/income/income.module').then(m => m.IncomeModule), canActivate: [LoginGuard] },
  { path: 'budgets', loadChildren: () => import('./modules/budgets/budgets.module').then(m => m.BudgetsModule), canActivate: [LoginGuard] },
  { path: 'unauthenticated', loadChildren: () => import('./modules/unauthenticated/unauthenticated.module').then(m => m.UnauthenticatedModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
