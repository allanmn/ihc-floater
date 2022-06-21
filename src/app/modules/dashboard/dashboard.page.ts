import { Component, OnInit } from '@angular/core';
import { AirPlaneService } from '../airplanes/airplane.service';
import { FlightService } from '../flights/flight.service';
import { PassengerFlightService } from '../passengersFlights/passengerFlight.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    dashboard: any = {
        total_flights: 0,
        total_planes: 0,
        total_tickets: 0
    }

    constructor(
        private flight_service: FlightService,
        private airplane_service: AirPlaneService,
        private passenger_flight_service: PassengerFlightService
    ) { }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.dashboard.total_flights = this.flight_service.get([]).length;
        this.dashboard.total_planes = this.airplane_service.get().length;
        this.dashboard.total_tickets = this.passenger_flight_service.get([],{}).length;
    }

}
