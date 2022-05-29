import { NgModule } from '@angular/core';
import { BaseModule } from 'src/app/helpers/base.module';

import { CreatePassengerComponent } from './create.component';

@NgModule({
    imports: [BaseModule],
    exports: [CreatePassengerComponent],
    declarations: [CreatePassengerComponent]
})
export class CreatePassengerComponentModule{}
