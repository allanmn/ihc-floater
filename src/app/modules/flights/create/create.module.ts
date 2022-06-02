import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
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
        CurrencyMaskModule
    ],
    declarations: [CreatePage]
})
export class CreateFlightPageModule { }
