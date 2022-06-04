import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { HelperService } from "src/app/helpers/helper.service";
import { Passenger } from "./passenger";

@Injectable({
    providedIn: 'root'
})
export class PassengerService {

    constructor(
    ) {
    }

    get() {
        return JSON.parse(localStorage.getItem('floater@passengers'));
    }

    find(id: number) {
        let passengers = JSON.parse(localStorage.getItem('floater@passengers'));

        return passengers.find(a => a.id == id);
    }

    create(passenger: Passenger) {
        try {
            let data = JSON.parse(localStorage.getItem('floater@passengers'))
            if (data) {
                let passengers = data;
                let idOk = false;

                while(!idOk) {
                    let id = Math.floor(Math.random() *100);

                    if (!passengers.find(a => a.id == id)) {
                        passenger.id = id;
                        idOk = true;
                    }
                }

                passengers.push(passenger);
                localStorage.setItem('floater@passengers', JSON.stringify(passengers));
            } else {
                let passengers = [];
                let idOk = false;
                while(!idOk) {
                    let id = Math.floor(Math.random() * 100);

                    if (!passengers.find(a => a.id == id)) {
                        passenger.id = id;
                        idOk = true;
                    }
                }
                passengers.push(passenger);
                localStorage.setItem('floater@passengers', JSON.stringify(passengers));
            }
            return passenger;
        } catch (error) {
            throw error;
        }
    }

    update(passenger: Passenger) {
        try {
            let passengers = JSON.parse(localStorage.getItem('floater@passengers'));

            let index = passengers.indexOf(passengers.find(a => a.id == passenger.id));

            passenger = new Passenger(passenger);

            passengers[index] = passenger;

            localStorage.setItem('floater@passengers', JSON.stringify(passengers));

            return true;
        } catch (error) {
            throw error;
        }
    }

    delete (id: number) {
        try {
            let data = JSON.parse(localStorage.getItem('floater@passengers'));

            if (data) {
                let passengers = data;
                passengers = passengers.filter(a => a.id !== id);

                localStorage.setItem('floater@passengers', JSON.stringify(passengers));

                return true;
            }
        } catch (error) {
            throw error;
        }
    }
}