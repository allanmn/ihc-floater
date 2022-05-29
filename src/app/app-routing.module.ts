import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardPageModule)
    },
    {
        path: 'airplanes',
        loadChildren: () => import('./modules/airplanes/airplanes.module').then(m => m.AirplaneModule)
    },
    {
        path: 'passengers',
        loadChildren: () => import('./modules/passengers/passenger.module').then(m => m.PassengerModule)
    },
    {
        path: 'flights',
        loadChildren: () => import('./modules/airplanes/index/index.module').then(m => m.IndexPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
