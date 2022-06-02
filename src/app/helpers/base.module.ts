import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CurrencyMaskModule } from 'ng2-currency-mask';

// import { NgxMaskModule } from 'ngx-mask'
// import { CurrencyMaskModule } from "ng2-currency-mask";
// import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from "ng2-currency-mask/src/currency-mask.config";
// export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
//     align: "right",
//     allowNegative: true,
//     decimal: ",",
//     precision: 2,
//     prefix: "R$ ",
//     suffix: "",
//     thousands: "."
// };

@NgModule({
    entryComponents: [],
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    providers: [
    ]
})
export class BaseModule { }
