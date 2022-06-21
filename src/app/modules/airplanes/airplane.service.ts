import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { HelperService } from "src/app/helpers/helper.service";
import { Airplane } from "./airplane";

@Injectable({
    providedIn: 'root'
})
export class AirPlaneService {

    constructor(
    ) {
    }

    get() {
        if (localStorage.getItem('floater@airplanes')) {
            return JSON.parse(localStorage.getItem('floater@airplanes'));
        } else {
            return [];
        }

    }

    find(id: number) {
        let airplanes = JSON.parse(localStorage.getItem('floater@airplanes'));

        return airplanes.find(a => a.id == id);
    }

    create(airplane: Airplane) {
        try {
            let data = JSON.parse(localStorage.getItem('floater@airplanes'))
            if (data) {
                let airplanes = data;
                let idOk = false;

                while(!idOk) {
                    let id = Math.floor(Math.random() *100);

                    if (!airplanes.find(a => a.id == id)) {
                        airplane.id = id;
                        idOk = true;
                    }
                }

                airplanes.push(airplane);
                localStorage.setItem('floater@airplanes', JSON.stringify(airplanes));
            } else {
                let airplanes = [];
                let idOk = false;
                while(!idOk) {
                    let id = Math.floor(Math.random() * 100);

                    if (!airplanes.find(a => a.id == id)) {
                        airplane.id = id;
                        idOk = true;
                    }
                }
                airplanes.push(airplane);
                localStorage.setItem('floater@airplanes', JSON.stringify(airplanes));
            }
            return airplane;
        } catch (error) {
            throw error;
        }
    }

    update(airplane: Airplane) {
        try {
            let airplanes = JSON.parse(localStorage.getItem('floater@airplanes'));

            let index = airplanes.indexOf(airplanes.find(a => a.id == airplane.id));

            airplane = new Airplane(airplane);

            airplanes[index] = airplane;

            localStorage.setItem('floater@airplanes', JSON.stringify(airplanes));

            return true;
        } catch (error) {
            throw error;
        }
    }

    delete (id: number) {
        try {
            let data = JSON.parse(localStorage.getItem('floater@airplanes'));

            if (data) {
                let airplanes = data;
                airplanes = airplanes.filter(a => a.id !== id);

                localStorage.setItem('floater@airplanes', JSON.stringify(airplanes));

                return true;
            }
        } catch (error) {
            throw error;
        }
    }
}