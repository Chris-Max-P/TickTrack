import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AppRoutes} from "@app-logic/enums/app-routes.enum";
import {HistoryComponent} from "./pages/history/history.component";

const routes: Routes = [
  {
    path: AppRoutes.Home,
    component: HomeComponent,
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: AppRoutes.History,
    component: HistoryComponent,
    loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
