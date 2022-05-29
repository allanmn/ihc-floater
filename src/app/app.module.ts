import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmComponent } from './components/ConfirmComponent/confirm.component';
import { CreatePassengerComponentModule } from './modules/passengers/create/create.module';

@NgModule({
    declarations: [AppComponent, ConfirmComponent],
    entryComponents: [ConfirmComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CreatePassengerComponentModule],
    providers: [
        // Grande sacada para formatar numeros e datas no formato brasileiro
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        IonicRouteStrategy,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }