import { Injectable } from "@angular/core";
import { PassengerFlight } from "./passengerFlight";

@Injectable({
    providedIn: 'root'
})
export class PassengerFlightService {

    constructor(
    ) {
    }

    get() {
        return JSON.parse(localStorage.getItem('floater@passengers_flights'));
    }

    find(id: number) {
        let passengers_flights = JSON.parse(localStorage.getItem('floater@passengers_flights'));

        return passengers_flights.find(a => a.id == id);
    }

    create(passenger_flight: PassengerFlight) {
        try {
            let data = JSON.parse(localStorage.getItem('floater@passengers_flights'))
            if (data) {
                let passengers_flights = data;
                let idOk = false;

                while(!idOk) {
                    let id = Math.floor(Math.random() *100);
                    
                    if (!passengers_flights.find(a => a.id == id)) {
                        passenger_flight.id = id;
                        idOk = true;
                    }
                }

                passengers_flights.push(passenger_flight);
                localStorage.setItem('floater@passengers_flights', JSON.stringify(passengers_flights));
            } else {
                let passengers_flights = [];
                let idOk = false;
                while(!idOk) {
                    let id = Math.floor(Math.random() * 100);

                    if (!passengers_flights.find(a => a.id == id)) {
                        passenger_flight.id = id;
                        idOk = true;
                    }
                }
                passengers_flights.push(passenger_flight);
                localStorage.setItem('floater@passengers_flights', JSON.stringify(passengers_flights));
            }
            return passenger_flight;
        } catch (error) {
            throw error;
        }
    }

    update(passenger_flight: PassengerFlight) {
        try {
            let passengers_flights = JSON.parse(localStorage.getItem('floater@passengers_flights'));

            let index = passengers_flights.indexOf(passengers_flights.find(a => a.id == passenger_flight.id));

            passenger_flight = new PassengerFlight(passenger_flight);

            passengers_flights[index] = passenger_flight;

            localStorage.setItem('floater@passengers_flights', JSON.stringify(passengers_flights));

            return true;
        } catch (error) {
            throw error;
        }
    }

    delete (id: number) {
        try {
            let data = JSON.parse(localStorage.getItem('floater@passengers_flights'));

            if (data) {
                let passengers_flights = data;
                passengers_flights = passengers_flights.filter(a => a.id !== id);

                localStorage.setItem('floater@passengers_flights', JSON.stringify(passengers_flights));

                return true;
            }
        } catch (error) {
            throw error;
        }
    }
}