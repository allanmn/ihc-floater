import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DashboardPage } from './modules/dashboard/dashboard.page';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    rootPage: any = null;

    public appPages = [
        { title: 'Dashboard', url: '/dashboard', icon: 'pie-chart' },
        { title: 'Aeronaves', url: '/airplanes', icon: 'airplane' },
        { title: 'Destinos', url: '/destinations', icon: 'map' },
        { title: 'Passageiros', url: '/passengers', icon: 'people' },
        { title: 'Passageiros Voô', url: '/passengersFlights', icon: 'people' },
        { title: 'Vôos', url: '/flights', icon: 'cloud' }
    ];
    constructor(
        platform: Platform,
    ) {
        platform.ready().then(() => {

        });
    }

    private openPage() {
        this.rootPage = DashboardPage;
    }
}
