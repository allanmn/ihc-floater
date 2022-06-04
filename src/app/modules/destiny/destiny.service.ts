import { Injectable } from "@angular/core";
import { HelperService } from "src/app/helpers/helper.service";
import { Destiny } from "./destiny";

@Injectable({
    providedIn: 'root'
})
export class DestinyService {

    constructor(
        private helper_service: HelperService
    ) {

    }

    get() {
        return JSON.parse(localStorage.getItem('floater@destinations'));
    }

    find(id: number) {
        let destinations = JSON.parse(localStorage.getItem('floater@destinations'));

        return destinations.find(a => a.id == id);
    }

    create(destiny: Destiny) {
        try {
            let data = JSON.parse(localStorage.getItem('floater@destinations'))
            if (data) {
                let destinations = data;
                let idOk = false;

                while (!idOk) {
                    let id = Math.floor(Math.random() * 100);

                    if (!destinations.find(a => a.id == id)) {
                        destiny.id = id;
                        idOk = true;
                    }
                }
                if (this.verifyItens(destiny)) {
                    destinations.push(destiny);
                } else {
                    return false;
                }
                localStorage.setItem('floater@destinations', JSON.stringify(destinations));
            } else {
                let destinations = [];
                let idOk = false;
                while (!idOk) {
                    let id = Math.floor(Math.random() * 100);

                    if (!destinations.find(a => a.id == id)) {
                        destiny.id = id;
                        idOk = true;
                    }
                }
                destinations.push(destiny);
                localStorage.setItem('floater@destinations', JSON.stringify(destinations));
            }
            return destiny;
        } catch (error) {
            throw error;
        }
    }

    verifyItens(destiny: Destiny) {
        if (!destiny.name) this.helper_service.toast('warning', 'Nome do destino é obrigatório.')
        else if (!destiny.tax) this.helper_service.toast('warning', 'Taxa de embarque é obrigatório.')
        else return true;
    }

    update(destiny: Destiny) {
        try {
            let destinations = JSON.parse(localStorage.getItem('floater@destinations'));

            let index = destinations.indexOf(destinations.find(a => a.id == destiny.id));

            destiny = new Destiny(destiny);

            destinations[index] = destiny;

            localStorage.setItem('floater@destinations', JSON.stringify(destinations));

            return true;
        } catch (error) {
            throw error;
        }
    }

    delete(id: number) {
        try {
            let data = JSON.parse(localStorage.getItem('floater@destinations'));

            if (data) {
                let destinations = data;
                destinations = destinations.filter(a => a.id !== id);

                localStorage.setItem('floater@destinations', JSON.stringify(destinations));

                return true;
            }
        } catch (error) {
            throw error;
        }
    }
}