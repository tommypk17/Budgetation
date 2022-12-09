import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MsalGuard} from "@azure/msal-angular";
import {LoginGuard} from "./guards/login.guard";
import {PreviousPageGuard} from "./guards/previous-page.guard";

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule), canDeactivate: [PreviousPageGuard] },
  { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule), canActivate: [LoginGuard], canDeactivate: [PreviousPageGuard] },
  { path: 'expenses', loadChildren: () => import('./modules/expenses/expenses.module').then(m => m.ExpensesModule), canActivate: [LoginGuard], canDeactivate: [PreviousPageGuard] },
  { path: 'income', loadChildren: () => import('./modules/income/income.module').then(m => m.IncomeModule), canActivate: [LoginGuard], canDeactivate: [PreviousPageGuard] },
  { path: 'budgets', loadChildren: () => import('./modules/budgets/budgets.module').then(m => m.BudgetsModule), canActivate: [LoginGuard], canDeactivate: [PreviousPageGuard] },
  { path: 'unauthenticated', loadChildren: () => import('./modules/unauthenticated/unauthenticated.module').then(m => m.UnauthenticatedModule), canDeactivate: [PreviousPageGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
