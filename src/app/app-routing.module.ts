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
        path: 'destinations',
        loadChildren: () => import('./modules/destiny/destiny.module').then(m => m.DestinyModule)
    },
    {
        path: 'passengers',
        loadChildren: () => import('./modules/passengers/passenger.module').then(m => m.PassengerModule)
    },
    {
        path: 'passengersFlights',
        loadChildren: () => import('./modules/passengersFlights/passengerFlight.module').then(m => m.PassengerFlightModule)
    },
    {
        path: 'flights',
        loadChildren: () => import('./modules/flights/flights.module').then(m => m.FlightModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
