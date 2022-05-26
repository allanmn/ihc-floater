import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./index/index.module').then(mod => mod.IndexPageModule),
    },
    {
        path: 'create',
        loadChildren: () => import('./create/create.module').then(mod => mod.CreateAirplanePageModule),
    },
    {
        path: ':id',
        loadChildren: () => import('./create/create.module').then(mod => mod.CreateAirplanePageModule),
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AirplaneModule { }
