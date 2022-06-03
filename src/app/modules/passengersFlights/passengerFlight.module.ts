import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./create/create.module').then(mod => mod.CreatePageModule),
    },
    {
        path: ':id',
        loadChildren: () => import('./create/create.module').then(mod => mod.CreatePageModule),
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PassengerFlightModule { }
