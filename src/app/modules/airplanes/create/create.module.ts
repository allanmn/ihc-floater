import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BaseModule } from 'src/app/helpers/base.module';

import { CreatePage } from './create.page';

const routes: Routes = [
    {
        path: '',
        component: CreatePage
    }
];

@NgModule({
    imports: [
        BaseModule,
        RouterModule.forChild(routes),
    ],
    declarations: [CreatePage]
})
export class CreateAirplanePageModule { }
