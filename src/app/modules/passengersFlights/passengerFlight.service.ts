import { Injectable } from "@angular/core";
import { Passenger } from "../passengers/passenger";
import { PassengerService } from "../passengers/passenger.service";
import { PassengerFlight } from "./passengerFlight";

@Injectable({
    providedIn: 'root'
})
export class PassengerFlightService {

    constructor(
        private passenger_service: PassengerService
    ) {
    }

    get(relations: any, wheres: any) {
        let data = JSON.parse(localStorage.getItem('floater@passengers_flights'));
        if (wheres && data) {
            if (wheres.flight_id) {
                data.filter(a => a.flight_id == wheres.flight_id);
            }
        }
        if (relations && data) {
            for (let relation of relations) {
                if (relation == 'passenger') {
                    data = data.map(d => {
                        d.passenger = new Passenger(this.passenger_service.find(d.passenger_id));
                        return d;
                    });
                }
            }
        }

        if (data) {
            return data;
        } else {
            return [];
        }
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

            if (data ) {
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