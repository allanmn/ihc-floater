import { Injectable } from "@angular/core";
import { Airplane } from "../airplanes/airplane";
import { AirPlaneService } from "../airplanes/airplane.service";
import { Destiny } from "../destiny/destiny";
import { DestinyService } from "../destiny/destiny.service";
import { Flight } from "./flight";

@Injectable({
    providedIn: 'root'
})
export class FlightService {

    constructor(
        private airplane_service: AirPlaneService,
        private destiny_service: DestinyService
    ) {
    }

    get(relations: any) {
        if (!relations) return JSON.parse(localStorage.getItem('floater@flights'));

        let data = JSON.parse(localStorage.getItem('floater@flights'));

        let flights: Flight[] = [];

        if (data) {
            for (let flight of data) {
                for (let relation of relations) {
                    if (relation == 'destiny') {
                        let destinations = [];
                        this.destiny_service.get().map(d => destinations.push(new Destiny(d)));
                        let destiny = destinations.find(d => d.id === flight.destiny_id);
                        flight.destiny = new Destiny(destiny);
                    }
                    if (relation == 'airplane') {
                        let airplanes = [];
                        this.airplane_service.get().map(a => airplanes.push(new Airplane(a)));
                        let airplane = airplanes.find(a => a.id === flight.airplane_id);
                        flight.airplane = new Airplane(airplane);
                    }
                }
                flights.push(flight);
            }
        }

        return flights;
    }

    find(id: number) {
        let flights = JSON.parse(localStorage.getItem('floater@flights'));
        let flight = flights.find(a => a.id == id);

        let destinations = [];
        this.destiny_service.get().map(d => destinations.push(new Destiny(d)));
        let destiny = destinations.find(d => d.id === flight.destiny_id);
        flight.destiny = new Destiny(destiny);

        let airplanes = [];
        this.airplane_service.get().map(a => airplanes.push(new Airplane(a)));
        let airplane = airplanes.find(a => a.id === flight.airplane_id);
        flight.airplane = new Airplane(airplane);

        return flight;
    }


    create(flight: Flight) {
        try {
            let data = JSON.parse(localStorage.getItem('floater@flights'))
            if (data) {
                let flights = data;
                let idOk = false;

                while (!idOk) {
                    let id = Math.floor(Math.random() * 100);

                    if (!flights.find(a => a.id == id)) {
                        flight.id = id;
                        idOk = true;
                    }
                }

                flights.push(flight);
                localStorage.setItem('floater@flights', JSON.stringify(flights));
            } else {
                let flights = [];
                let idOk = false;
                while (!idOk) {
                    let id = Math.floor(Math.random() * 100);

                    if (!flights.find(a => a.id == id)) {
                        flight.id = id;
                        idOk = true;
                    }
                }
                flights.push(flight);
                localStorage.setItem('floater@flights', JSON.stringify(flights));
            }
            return flight;
        } catch (error) {
            throw error;
        }
    }

    update(flight: Flight) {
        try {
            let flights = JSON.parse(localStorage.getItem('floater@flights'));

            let index = flights.indexOf(flights.find(a => a.id == flight.id));

            flight = new Flight(flight);

            flights[index] = flight;

            localStorage.setItem('floater@flights', JSON.stringify(flights));

            return true;
        } catch (error) {
            throw error;
        }
    }

    delete(id: number) {
        try {
            let data = JSON.parse(localStorage.getItem('floater@flights'));

            if (data) {
                let flights = data;
                flights = flights.filter(a => a.id !== id);

                localStorage.setItem('floater@flights', JSON.stringify(flights));

                return true;
            }
        } catch (error) {
            throw error;
        }
    }
}