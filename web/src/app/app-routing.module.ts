import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AppRoutes} from "@app-logic/enums/app-routes.enum";
import {HistoryComponent} from "./pages/history/history.component";
import {ProjectsComponent} from "./pages/projects/projects.component";

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
  {
    path: AppRoutes.Projects,
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
