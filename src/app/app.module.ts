import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmComponent } from './components/ConfirmComponent/confirm.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};

registerLocaleData(localePt)
import { CreatePassengerComponentModule } from './modules/passengers/create/create.module';

@NgModule({
    declarations: [AppComponent, ConfirmComponent],
    entryComponents: [ConfirmComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CreatePassengerComponentModule, CurrencyMaskModule],
    providers: [
        // Grande sacada para formatar numeros e datas no formato brasileiro
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        IonicRouteStrategy,
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ],
    bootstrap: [AppComponent],
    exports: [
        CurrencyMaskModule
    ]
})
export class AppModule { }